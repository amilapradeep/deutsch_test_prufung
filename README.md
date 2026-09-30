# DTZ Sprint · B1 Prüfungstrainer

Lokale Lernseite zum Üben des **Deutsch-Tests für Zuwanderer (DTZ)** auf A2–B1-Niveau. Die Seite enthält derzeit zehn Übungstests mit den Bereichen Lesen, Hören und Schreiben sowie einem lokalen Hörübungs-Test.

## Aktueller Stand

- 10 Übungstests:
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
- Lesen: Fragen, Antworten, automatische Auswertung und Lösungshinweise
- Hören: Fragen, Auswertung und Audio-Player
- Schreiben: zwei Aufgaben pro Test, Textfeld, Wortzählung und Selbstcheck
- Fortschritt wird lokal im Browser gespeichert (`localStorage`)
- Keine Datenbank, kein Backend, kein Build-Prozess

## Lokal starten

### Voraussetzungen

- Python 3
- Moderner Browser: Chrome, Edge, Firefox oder Safari
- Git nur erforderlich, wenn das Repository geklont werden soll
- Node.js, npm und weitere Pakete sind nicht erforderlich

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
exam-data.js     Zusätzliche Testdaten
serve.py         Lokaler HTTP-Server mit Audio-Range-Unterstützung
run-testsite.bat Windows-Startdatei
audio/           Lokale Audiodateien
exam/            Lokale Original-PDFs
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

## Geplante nächste Schritte

- Weitere echte DTZ-Übungstests ergänzen
- Zusätzliche Beispieltests im gleichen Datenformat erstellen
- Prüfungs-Timer und realistischere Prüfungssimulation ergänzen
- Bedienung, Barrierefreiheit und mobile Darstellung weiter verbessern
- Automatische Daten-/Browser-Tests ergänzen
- Später öffentliche Bereitstellung prüfen

## Hinweise zu Quellen

Die Testdaten und Originalmaterialien stammen aus den jeweils verlinkten offiziellen Quellen. Vor einer öffentlichen Veröffentlichung müssen Nutzungsrechte, Audio-Dateien und PDF-Inhalte geprüft werden. Remote-PDFs und Remote-Audios benötigen Internetzugang; lokale Dateien unter `exam/` und `audio/` bleiben lokal verfügbar.
