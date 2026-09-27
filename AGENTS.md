# AGENTS.md

## Project purpose

DTZ Sprint is a local browser-based practice site for the German **Deutsch-Test für Zuwanderer (DTZ)** at A2–B1 level. It is currently a personal practice tool. Future public hosting is possible, but source/material rights must be checked first.

## Current architecture

- Static frontend; no backend and no database.
- `index.html` loads `exam-data.js` first, then `app.js`.
- `app.js` contains the base `gast1` test, UI rendering, answer checking, writing editor, audio controls, and local persistence.
- `exam-data.js` adds the other tests through `window.EXTRA_SOURCES`.
- `styles.css` contains all layout and responsive styling.
- `serve.py` runs a Python HTTP server with byte-range support for MP3 seeking.
- `run-testsite.bat` starts the Windows server on port 8000 and opens the browser.
- `exam/` contains local source PDFs.
- `audio/` contains local audio files.

## Run commands

Requirements: Python 3 and modern browser. No Node.js, npm, package installation, or build step.

Windows — recommended:

```powershell
.\run-testsite.bat
```

This opens `http://localhost:8000/` and starts the custom server. Use this launcher for reliable local audio playback and seeking. It is also possible to double-click the batch file.

Manual alternative:

```powershell
python serve.py --port 8000
```

macOS/Linux:

```bash
python3 serve.py --port 8000
```

Open `http://localhost:8000/`. Stop with `Ctrl+C`.

Use HTTP instead of opening `index.html` directly with `file://`; the custom server provides audio byte ranges and matches intended browser behavior.

## Test data conventions

Add new exam sources to `exam-data.js` inside `window.EXTRA_SOURCES`. Do not move existing source data casually: `app.js` expects `window.EXTRA_SOURCES` to exist before it calls `Object.assign(SOURCES, window.EXTRA_SOURCES || {})`.

Each source should provide:

```js
{
  title,
  provider,
  tag,
  url,
  audio,       // optional: { url, label, downloadUrl? }
  lesen,       // array of question objects
  hoeren,      // array of question objects
  schreiben: { tasks: [...] }
}
```

Question shape:

```js
{
  id: 'l21',
  number: 21,
  prompt: '...',
  options: [
    { value: 'a', label: '...' },
    { value: 'b', label: '...' }
  ],
  answer: 'a',
  type: 'a' // use 'tf' for Richtig/Falsch questions
}
```

Writing task shape:

```js
{
  id: 'A',
  title: 'Aufgabe A',
  prompt: '...',
  points: ['Leitpunkt 1', 'Leitpunkt 2'],
  recipient: '...'
}
```

Keep question IDs unique within each section of a source. IDs may repeat across different sources because state is scoped by paper. Keep answer values identical to the corresponding option values.

## Important behavior

- `localStorage` key: `dtz-sprint`.
- Saved state includes selected paper/section, objective answers, submitted flags, writing drafts, self-checks, and selected writing task.
- Reading and listening are auto-scored after pressing `Abschnitt abgeben`.
- Writing is not auto-scored; it has a word count and self-check only.
- DTZ benchmark shown by the UI: 33–45 combined reading/listening points = B1; 20–32 = A2.
- Reset button deletes all local progress after confirmation.
- `app.js` escapes displayed data with `esc()`. Keep using it for user/source text inserted into HTML.
- Audio can be local (`audio/...`) or remote. `downloadUrl` is optional for a source download link.

## Editing workflow

1. Inspect existing data patterns before adding a test.
2. Add or update source data in `exam-data.js`.
3. Put new local audio in `audio/` and PDFs in `exam/` when appropriate.
4. Update visible counts/copy in `index.html` if the number or description of tests changes. The test-card count itself is generated dynamically by `app.js`.
5. Run the local server and manually test paper selection, every section, answer submission, reset, writing persistence, and audio seeking.
6. Check browser console for JavaScript errors.
7. Keep source URLs and attribution accurate.

## Validation commands

Python syntax check:

```bash
python -m py_compile serve.py
```

If Node.js is available, optional JavaScript syntax checks:

```bash
node --check app.js
node --check exam-data.js
```

There is currently no automated test suite or package manager configuration.

## Content/source cautions

- Existing materials are from g.a.s.t. and telc sources; they are not automatically free to redistribute.
- Before hosting publicly, verify copyright/licensing for PDFs, audio, question text, images, and external links.
- Remote source/audio links need internet access. Local files work without those remote downloads.
- Do not add secrets, API keys, private learner data, or tracking without an explicit product decision.

## Planned direction

Priorities: add more source/sample exams, improve exam timing/simulation, strengthen accessibility/mobile behavior, add automated validation, and evaluate public deployment after rights review.
