from __future__ import annotations

import argparse
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class LimitedReader:
    def __init__(self, file_obj, length):
        self.file_obj = file_obj
        self.remaining = length

    def read(self, size=-1):
        if self.remaining <= 0:
            return b""
        if size < 0 or size > self.remaining:
            size = self.remaining
        data = self.file_obj.read(size)
        self.remaining -= len(data)
        return data

    def close(self):
        self.file_obj.close()


class RangeRequestHandler(SimpleHTTPRequestHandler):
    range_pattern = re.compile(r"bytes=(\d*)-(\d*)$")

    def send_head(self):
        path = Path(self.translate_path(self.path))
        if path.is_dir():
            return super().send_head()

        try:
            size = path.stat().st_size
            file_obj = path.open("rb")
        except (FileNotFoundError, NotADirectoryError, PermissionError):
            self.send_error(404, "File not found")
            return None

        range_header = self.headers.get("Range")
        if not range_header:
            self.send_response(200)
            self.send_header("Content-type", self.guess_type(str(path)))
            self.send_header("Content-Length", str(size))
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Last-Modified", self.date_time_string(path.stat().st_mtime))
            self.end_headers()
            return file_obj

        match = self.range_pattern.fullmatch(range_header.strip())
        if not match:
            file_obj.close()
            self.send_error(416, "Invalid byte range")
            return None

        start_text, end_text = match.groups()
        if start_text:
            start = int(start_text)
            end = int(end_text) if end_text else size - 1
        else:
            suffix_length = int(end_text)
            start = max(0, size - suffix_length)
            end = size - 1

        if start >= size or start > end:
            file_obj.close()
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            return None

        end = min(end, size - 1)
        length = end - start + 1
        file_obj.seek(start)
        self.send_response(206)
        self.send_header("Content-type", self.guess_type(str(path)))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(length))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Last-Modified", self.date_time_string(path.stat().st_mtime))
        self.end_headers()
        return LimitedReader(file_obj, length)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Serve project files with HTTP byte-range support.")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    root = Path(__file__).resolve().parent
    server = ThreadingHTTPServer(("", args.port), RangeRequestHandler)
    print(f"Serving {root} on http://localhost:{args.port}/ (byte-range audio enabled)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")
    finally:
        server.server_close()
