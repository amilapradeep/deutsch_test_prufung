"""Optional maintenance tool: export original speaking pages from existing local PDFs.

Requires PyMuPDF only when regenerating assets; the website needs no extra package.
Run from any directory: python scripts/extract-speaking-pages.py
No photographs or questions are generated: pages and text come directly from PDFs.
"""
from pathlib import Path
import json
import pymupdf

ROOT = Path(__file__).resolve().parent.parent
SOURCES = {
    'gast1': ('gast_DTZ_UEbungssatz_1.pdf', [33], [34], [35], [36]),
    'gast2': ('gast_DTZ_UEbungssatz_2.pdf', [33], [34], [35], [36]),
    'aufjeden': ('Auf_jeden_Fall_B1.2_UEbungstest_DTZ.pdf', [11], [12], [13], [14]),
    'telc1': ('telc_Deutsch_A2-B1_Uebungstest_1.pdf', [23], [24], [25], [26]),
    'goetheModellsatz': ('dtz_goethe_modellsatz_2009.pdf', [31], [32], [33], [34]),
    'hueberModul5': ('DTZ_Modul5_Simulation_Hueber.pdf', [13], [13, 14], [15], [16]),
}
PARTS = [
    ('teil1', 'Teil 1 · Über sich sprechen'),
    ('bildA', 'Teil 2 · Teilnehmer/in A'),
    ('bildB', 'Teil 2 · Teilnehmer/in B'),
    ('teil3', 'Teil 3 · Gemeinsam etwas planen'),
]


def main():
    output = {}
    count = 0
    for source_id, (filename, *page_groups) in SOURCES.items():
        parts = []
        asset_dir = ROOT / 'exam' / 'speaking' / source_id
        asset_dir.mkdir(parents=True, exist_ok=True)
        with pymupdf.open(ROOT / 'exam' / filename) as pdf:
            exported = {}
            for (part_id, title), page_numbers in zip(PARTS, page_groups):
                pages = []
                for number in page_numbers:
                    if number not in exported:
                        page = pdf[number - 1]
                        name = f'page-{number}.png'
                        page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), alpha=False).save(asset_dir / name)
                        exported[number] = {
                            'number': number,
                            'image': f'exam/speaking/{source_id}/{name}',
                            'text': page.get_text().replace('\x07', '').strip(),
                        }
                        count += 1
                    pages.append(exported[number])
                parts.append({'id': part_id, 'title': title, 'pages': pages})
        output[source_id] = {'original': True, 'sourceUrl': f'exam/{filename}', 'parts': parts}
    data = json.dumps(output, ensure_ascii=False, indent=2)
    (ROOT / 'speaking-data.js').write_text(
        '// Original PDF pages, not generated exercises. Regenerate with scripts/extract-speaking-pages.py.\n'
        '// Local practice only; check source rights before public redistribution.\n'
        f'window.ORIGINAL_SPEAKING = {data};\n', encoding='utf-8'
    )
    print(f'Exported {count} original pages for {len(output)} sources to exam/speaking/ and speaking-data.js')


if __name__ == '__main__':
    main()
