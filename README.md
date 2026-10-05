# DTZ Sprint · B1 Prüfungstrainer

Lokale Lernseite zum Üben des **Deutsch-Tests für Zuwanderer (DTZ)** auf A2–B1-Niveau. Die Seite enthält zehn vorhandene Tests sowie drei eigene Fokusübungen für Sprechen und Schreiben. Die Fokusübungen sind keine vollständigen DTZ-Prüfungen.

## Aktueller Stand

- 13 Einträge (10 vorhandene Tests + 3 eigene Fokusübungen):
  - g.a.s.t. Übungssatz 1
  - g.a.s.t. Übungssatz 2
  - telc „Auf jeden Fall! B1.2“
  - telc Deutsch-Test für Zuwanderer Übungstest 1
  - Goethe-Institut/telc DTZ-Modellsatz · Erwachsene (2009)
  - DTZ B1 · Modelltest Fragen
  - DTZ B1 · Zusätzliche Übungen
  - Paper 1 · Hören, Lesen & Schreiben
  - Modul 5: Simulation · Hueber
  - DTZ B1 · Hörübungen Teil 1–4 (lokal)
  - Prognose 1: Gesundheit & Termine (eigene Übung)
  - Prognose 2: Schule & Familie (eigene Übung)
  - Prognose 3: Mobilität & Alltag (eigene Übung)
- Sprechen: Original-PDF-Seiten mit Originalfotos und Aufgaben (Teil 1–3) für g.a.s.t. 1/2, Auf jeden Fall!, telc 1, Goethe 2009 und Hueber Modul 5. Die übrigen vier vorhandenen Quellen enthalten keine Sprechaufgaben: Der Tab bleibt deaktiviert, ohne erfundene Ersatzaufgaben. Nur die drei neuen Prognoseübungen nutzen hypothetische Bildbeschreibungen und eigene Aufgaben. Sprechnotizen bleiben lokal.
- Quellenanalyse: [`exam/sprechen-schreiben-analyse.md`](exam/sprechen-schreiben-analyse.md)
- Lesen: Fragen, Antworten, automatische Auswertung und Lösungshinweise
- Hören: Fragen, Auswertung und Audio-Player
- Schreiben: bis zu zwei Aufgaben pro Test, Textfeld, Wortzählung und Selbstcheck; keine automatische Bewertung
- Fortschritt wird lokal im Browser gespeichert (`localStorage`)
- Keine Datenbank, kein Backend, kein Build-Prozess

## Lokal starten

### Voraussetzungen

- Python 3
- Moderner Browser: Chrome, Edge, Firefox oder Safari
- Git nur erforderlich, wenn das Repository geklont werden soll
- Node.js, npm und weitere Pakete sind für die Website nicht erforderlich (optional für Syntax- und Smoke-Tests)

### Windows

Empfohlen: im Projektordner in PowerShell ausführen:

```powershell
.\run-testsite.bat
```

Das Skript öffnet `http://localhost:8000/` und startet den speziellen Python-Server. Dieser Server ist wichtig für korrektes Audio-Abspielen und Springen in lokalen MP3-Dateien.

Alternativ manuell starten:

```powershell
python serve.py --port 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000/
```

### macOS / Linux

```bash
python3 serve.py --port 8000
```

Dann `http://localhost:8000/` öffnen. Server mit `Ctrl+C` stoppen.

Der eigene Python-Server liefert HTTP-Byte-Ranges, damit der lokale MP3-Player korrekt springen kann. Die Seite nicht nur per `file://` öffnen.

## Projektstruktur

```text
index.html       Seitenstruktur
styles.css       Layout und Styling
app.js           App-Logik, Rendering, Speicherung, Auswertung
exam-data.js     Zusätzliche Testdaten und eigene Prognoseübungen
speaking-data.js Original-Sprechseiten, PDF-Verweise und extrahierter Originaltext
serve.py         Lokaler HTTP-Server mit Audio-Range-Unterstützung
run-testsite.bat Windows-Startdatei
audio/           Lokale Audiodateien
exam/            Lokale Original-PDFs
exam/speaking/   Unveränderte Originalseiten als PNG (mit Originalfotos)
```

## Neue Tests hinzufügen

Zusätzliche Tests werden normalerweise in `exam-data.js` unter `window.EXTRA_SOURCES` ergänzt. `index.html` lädt `exam-data.js` vor `app.js`; dadurch werden die zusätzlichen Tests automatisch registriert.

Ein Test benötigt mindestens:

```js
{
  title: 'Testtitel',
  provider: 'Quelle / Verlag',
  tag: 'offizielle Originalaufgaben',
  url: 'https://.../original.pdf',
  audio: { url: 'audio/test.mp3', label: 'Audio' }, // optional
  lesen: [...],
  hoeren: [...],
  schreiben: {
    tasks: [
      { id: 'A', title: 'Aufgabe A', prompt: '...', points: ['...'], recipient: '...' },
      { id: 'B', title: 'Aufgabe B', prompt: '...', points: ['...'], recipient: '...' }
    ]
  }
}
```

Fragen verwenden die Felder `id`, `number`, `prompt`, `options`, `answer` und optional `type`. Antwortoptionen haben `value` und `label`. Für Richtig/Falsch `type: 'tf'` verwenden.

Fehlende Abschnitte bleiben leer; keine Ersatzaufgaben aus anderen Tests übernehmen. Original-Sprechseiten werden über `window.ORIGINAL_SPEAKING` in `speaking-data.js` dem passenden Quelltest zugeordnet. `index.html` lädt beide Datendateien vor `app.js`.

Optional lassen sich die Originalseiten mit `python scripts/extract-speaking-pages.py` neu exportieren. Nur dieses Wartungsskript benötigt PyMuPDF; die Website nutzt fertige PNG-Dateien und braucht weiterhin keine Zusatzpakete.

## Optionaler Smoke-Test

```bash
node tests/speaking-practice.test.js
node --check app.js
node --check exam-data.js
node --check speaking-data.js
```

Für die Website selbst ist Node.js nicht erforderlich.

## Geplante nächste Schritte

- Weitere echte DTZ-Übungstests ergänzen
- Nutzungsrechte der Original-Sprechseiten vor öffentlicher Veröffentlichung prüfen
- Prüfungs-Timer und realistischere Prüfungssimulation ergänzen
- Bedienung, Barrierefreiheit und mobile Darstellung weiter verbessern
- Automatische Daten-/Browser-Tests ergänzen
- Später öffentliche Bereitstellung prüfen

## Hinweise zu Quellen

Die vorhandenen Testdaten und Originalmaterialien stammen aus den jeweils verlinkten offiziellen Quellen; nur die drei Prognoseübungen sind eigene, nicht-offizielle Aufgaben. Verlinkte PDFs dienen dort nur als Formatvorlage. Vor einer öffentlichen Veröffentlichung müssen Nutzungsrechte, Audio-Dateien und PDF-Inhalte geprüft werden. Remote-PDFs und Remote-Audios benötigen Internetzugang; lokale Dateien unter `exam/` und `audio/` bleiben lokal verfügbar.
