const GAST1_URL = 'https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/PDF/gast_DTZ_UEbungssatz_1.pdf';
const GAST1_AUDIO_URL = 'https://www.gast.de/fileadmin/gast.de/GAST/5_DTZ/Audio/gast_Deutsch-Test_fuer_Zuwanderer_UEbungssatz_1.mp3';

function question(id, number, prompt, options, answer, type = 'a') {
  return { id, number, prompt, options, answer, type };
}

function mcOptions(...labels) {
  return labels.map(([value, label]) => ({ value, label }));
}

function mc(id, number, prompt, options, answer) {
  return question(id, number, prompt, options, answer, 'a');
}

function tf(id, number, prompt, answer) {
  return question(id, number, prompt, mcOptions(['richtig', 'Richtig'], ['falsch', 'Falsch']), answer, 'tf');
}

const MATCHING_OPTIONS = mcOptions(
  ['a', 'Anzeige a'],
  ['b', 'Anzeige b'],
  ['c', 'Anzeige c'],
  ['d', 'Anzeige d'],
  ['e', 'Anzeige e'],
  ['f', 'Anzeige f'],
  ['g', 'Anzeige g'],
  ['h', 'Anzeige h'],
  ['x', 'X – keine passende Anzeige']
);

const SUNDAY_OPTIONS = mcOptions(
  ['a', 'Es gibt schon viele Geschäfte, die sonntags offen haben.'],
  ['b', 'Im Ausland sind die Geschäfte sonntags geschlossen.'],
  ['c', 'In der Zukunft werden die Geschäfte länger offen sein.'],
  ['d', 'Man kann sonntags seine Freizeit nicht mehr zusammen verbringen.'],
  ['e', 'Schon jetzt haben die Leute zu viel Hektik.'],
  ['f', 'Sonntags sollten auch Banken offen haben.']
);

const TIMER_DURATIONS = {
  lesen: 45 * 60,
  hoeren: 25 * 60,
  schreiben: 30 * 60
};

const TIMER_LABELS = { lesen: 'Lesen', hoeren: 'Hören', schreiben: 'Schreiben' };
let timerTicker = null;

function durationFor(paperId, section) {
  return Number(SOURCES[paperId]?.timerDurations?.[section]) || TIMER_DURATIONS[section] || 0;
}

const SOURCES = {
  gast1: {
    title: 'Übungssatz 1',
    provider: 'g.a.s.t. · Juni 2024',
    tag: 'offizielle Originalaufgaben',
    url: GAST1_URL,
    audio: {
      url: GAST1_AUDIO_URL,
      label: 'g.a.s.t. · Übungssatz 1 MP3'
    },
    lesen: [
      mc('l21', 21, 'Ihre Großmutter kann nicht mehr alleine kochen und putzen.', mcOptions(
        ['a', '2. OG'], ['b', '4. OG'], ['c', 'anderes Stockwerk']
      ), 'a'),
      mc('l22', 22, 'Sie suchen Informationen über Krankenhäuser in Ihrer Gegend.', mcOptions(
        ['a', '2. OG'], ['b', '3. OG'], ['c', 'anderes Stockwerk']
      ), 'c'),
      mc('l23', 23, 'Sie brauchen einen neuen Führerschein.', mcOptions(
        ['a', 'EG'], ['b', '1. OG'], ['c', 'anderes Stockwerk']
      ), 'b'),
      mc('l24', 24, 'Sie möchten ein wichtiges Dokument kopieren.', mcOptions(
        ['a', 'EG'], ['b', '2. OG'], ['c', 'anderes Stockwerk']
      ), 'a'),
      mc('l25', 25, 'Sie brauchen eine größere Tonne für Ihren Abfall.', mcOptions(
        ['a', 'EG'], ['b', '4. OG'], ['c', 'anderes Stockwerk']
      ), 'b'),
      mc('l26', 26, 'Sie möchten in Ihrer Freizeit Kinder betreuen.', MATCHING_OPTIONS, 'b'),
      mc('l27', 27, 'Sie möchten an einer Hochschule studieren, haben aber nur einen Realschulabschluss.', MATCHING_OPTIONS, 'h'),
      mc('l28', 28, 'Sie suchen einen Nebenjob am Wochenende.', MATCHING_OPTIONS, 'd'),
      mc('l29', 29, 'Sie möchten den Führerschein machen.', MATCHING_OPTIONS, 'x'),
      mc('l30', 30, 'Sie möchten eine Ausbildung von zu Hause aus machen.', MATCHING_OPTIONS, 'c'),
      tf('l31', 31, 'Am Sonntag fährt die Buslinie 306 öfter als sonst.', 'richtig'),
      mc('l32', 32, 'Besucherinnen und Besucher sollen', mcOptions(
        ['a', 'ihr Auto in der Innenstadt parken.'],
        ['b', 'mit öffentlichen Verkehrsmitteln kommen.'],
        ['c', 'nur die Sonderbusse benutzen.']
      ), 'b'),
      tf('l33', 33, 'Frau Kim bekommt einen neuen Internet-Anschluss.', 'richtig'),
      mc('l34', 34, 'Wie soll Frau Kim den Termin bestätigen? Sie soll', mcOptions(
        ['a', 'auf den Link klicken.'],
        ['b', 'den Online-Service nutzen.'],
        ['c', 'einen Brief schreiben.']
      ), 'a'),
      tf('l35', 35, 'Frau Trautmann ist die Lehrerin von Denis.', 'richtig'),
      mc('l36', 36, 'Familie Ivanov', mcOptions(
        ['a', 'darf zu einer Feier kommen.'],
        ['b', 'muss in der Schule anrufen.'],
        ['c', 'soll für Essen bezahlen.']
      ), 'a'),
      tf('l37', 37, 'Die Mittagsbetreuung ist am Wochenende geschlossen.', 'richtig'),
      tf('l38', 38, 'Bei zwei Kindern bezahlt man die Hälfte.', 'falsch'),
      tf('l39', 39, 'Die Kinder lernen Regeln für das Zusammenleben.', 'richtig'),
      mc('l40', 40, '___ Frau und ich haben am letzten Wochenende Urlaub in Ihrem Hotel gemacht, aber leider waren wir gar nicht zufrieden!', mcOptions(
        ['a', 'ihre'], ['b', 'meine'], ['c', 'seine']
      ), 'b'),
      mc('l41', 41, 'Wir haben Ihr Hotel ausgesucht, ___ die Beschreibung auf Ihrer Website sehr gut klingt.', mcOptions(
        ['a', 'dass'], ['b', 'denn'], ['c', 'weil']
      ), 'c'),
      mc('l42', 42, '___ die Zimmer waren klein und laut!', mcOptions(
        ['a', 'Aber'], ['b', 'Obwohl'], ['c', 'Trotzdem']
      ), 'a'),
      mc('l43', 43, 'Außerdem hatten wir während des ganzen Wochenendes ___ warmes Wasser im Badezimmer,', mcOptions(
        ['a', 'kein'], ['b', 'leider'], ['c', 'nicht']
      ), 'a'),
      mc('l44', 44, '___ wir uns natürlich sofort nach unserer Ankunft an der Rezeption beschwert haben.', mcOptions(
        ['a', 'nachdem'], ['b', 'obwohl'], ['c', 'weil']
      ), 'b'),
      mc('l45', 45, 'Wir haben uns sehr geärgert und möchten jetzt unser Geld ___.', mcOptions(
        ['a', 'haben'], ['b', 'wechseln'], ['c', 'zurück']
      ), 'c')
    ],
    hoeren: [
      mc('h1', 1, 'Sie wollen zum Rosengarten. Was müssen Sie tun?', mcOptions(
        ['a', 'An der Haltestelle „Friedrichring“ umsteigen.'],
        ['b', 'Mit der Straßenbahn 78 fahren.'],
        ['c', 'Mit der U-Bahn-Linie 1 oder 2 fahren.']
      ), 'a'),
      mc('h2', 2, 'Wer ruft an?', mcOptions(
        ['a', 'Eine Apotheke.'], ['b', 'Eine Arztpraxis.'], ['c', 'Eine Versicherung.']
      ), 'b'),
      mc('h3', 3, 'Was sollen die Fahrgäste tun?', mcOptions(
        ['a', 'Im Zug sitzen bleiben.'],
        ['b', 'Mit einem anderen Zug weiterfahren.'],
        ['c', 'Mit einem Bus weiterfahren.']
      ), 'c'),
      mc('h4', 4, 'Wo wohnt Henrik?', mcOptions(
        ['a', 'An einem Park.'], ['b', 'Bei einer Schule.'], ['c', 'Neben dem Busbahnhof.']
      ), 'b'),
      mc('h5', 5, 'Am Sonntag gibt es', mcOptions(
        ['a', 'ein Musikprogramm.'], ['b', 'ein Programm für Kinder.'], ['c', 'internationale Kurzfilme.']
      ), 'b'),
      mc('h6', 6, 'Wie sollen Erwachsene „Medinox“ einnehmen?', mcOptions(
        ['a', 'Dreimal am Tag.'],
        ['b', 'Mit Wasser.'],
        ['c', 'Nur wenn die Ärztin oder der Arzt zustimmt.']
      ), 'b'),
      mc('h7', 7, 'Was läuft in der „Lichtburg“?', mcOptions(
        ['a', 'Ein Kinderfilm.'], ['b', 'Ein Krimi.'], ['c', 'Eine Komödie.']
      ), 'a'),
      mc('h8', 8, 'Wo können Sie Musik hören?', mcOptions(
        ['a', 'Auf WDR 2.'], ['b', 'Auf WDR 3.'], ['c', 'Auf WDR 5.']
      ), 'b'),
      mc('h9', 9, 'Wann kann man nach Würzburg weiterfahren?', mcOptions(
        ['a', 'Um 09:36 Uhr.'], ['b', 'Um 09:58 Uhr.'], ['c', 'Um 10:00 Uhr.']
      ), 'b'),
      tf('h10', 10, 'Die Frau ist Ärztin.', 'falsch'),
      mc('h11', 11, 'Die Frau sagt dem Mann, dass', mcOptions(
        ['a', 'die Tabletten lange wirken.'],
        ['b', 'er mindestens drei Tabletten nehmen soll.'],
        ['c', 'er sofort zum Arzt gehen soll.']
      ), 'a'),
      tf('h12', 12, 'Maria ist unglücklich in ihrem neuen Job.', 'falsch'),
      mc('h13', 13, 'Maria sagt, dass ihre neue Chefin', mcOptions(
        ['a', 'jung ist.'], ['b', 'oft arrogant ist.'], ['c', 'selbst keine Krankenschwester war.']
      ), 'a'),
      tf('h14', 14, 'Günter kommt zum Sommerfest.', 'richtig'),
      mc('h15', 15, 'Günter möchte nicht grillen, sondern', mcOptions(
        ['a', 'den Gruppenraum streichen.'],
        ['b', 'einen Kuchen backen.'],
        ['c', 'nichts machen.']
      ), 'c'),
      tf('h16', 16, 'Die Frau möchte das Kleid kaufen.', 'richtig'),
      mc('h17', 17, 'Der Mann findet das Kleid', mcOptions(
        ['a', 'gut für die Gartenarbeit.'],
        ['b', 'nicht schön.'],
        ['c', 'ziemlich teuer.']
      ), 'c'),
      mc('h18', 18, '18 ...', SUNDAY_OPTIONS, 'c'),
      mc('h19', 19, '19 ...', SUNDAY_OPTIONS, 'd'),
      mc('h20', 20, '20 ...', SUNDAY_OPTIONS, 'e')
    ],
    schreiben: {
      tasks: [
        {
          id: 'A',
          title: 'Aufgabe A',
          prompt: 'Sie möchten einen Erste-Hilfe-Kurs machen. Sie haben noch Fragen. Schreiben Sie eine E-Mail an Herrn Schmidt vom Weiterbildungszentrum.',
          points: [
            'Warum Sie einen Erste-Hilfe-Kurs machen möchten',
            'Ihre Erfahrungen',
            'Dauer und Termine des Kurses',
            'Kosten'
          ],
          recipient: 'Herr Schmidt'
        },
        {
          id: 'B',
          title: 'Aufgabe B',
          prompt: 'Sie wohnen in einem Mietshaus. Alle Mieter müssen das Treppenhaus putzen, aber keiner von Ihren Nachbarn macht es. Schreiben Sie Ihrem Vermieter, Herrn Lehmann, einen Brief.',
          points: [
            'Grund für Ihr Schreiben',
            'Wie Sie versucht haben, das Problem selbst zu lösen',
            'Weitere Probleme im Haus',
            'Was der Vermieter tun soll'
          ],
          recipient: 'Herr Lehmann'
        }
      ]
    }
  }
};

Object.assign(SOURCES, window.EXTRA_SOURCES || {});

const state = {
  paper: 'gast1',
  section: 'lesen',
  checked: {},
  text: {},
  checks: {},
  timers: {},
  writingTask: 'A'
};

function readSavedState() {
  try {
    return JSON.parse(localStorage.getItem('dtz-sprint') || 'null');
  } catch {
    localStorage.removeItem('dtz-sprint');
    return null;
  }
}

const saved = readSavedState();
if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
  Object.assign(state, saved);
  state.paper = SOURCES[state.paper] ? state.paper : 'gast1';
  state.section = ['lesen', 'hoeren', 'schreiben'].includes(state.section) ? state.section : 'lesen';
  state.checked = saved.checked && typeof saved.checked === 'object' && !Array.isArray(saved.checked) ? saved.checked : {};
  state.text = saved.text && typeof saved.text === 'object' && !Array.isArray(saved.text) ? saved.text : {};
  state.checks = saved.checks && typeof saved.checks === 'object' && !Array.isArray(saved.checks) ? saved.checks : {};
  state.timers = saved.timers && typeof saved.timers === 'object' && !Array.isArray(saved.timers) ? saved.timers : {};
  state.writingTask = saved.writingTask || 'A';
}

const $ = selector => document.querySelector(selector);
const paperGrid = $('#paperGrid');
const content = $('#sectionContent');

function save() {
  localStorage.setItem('dtz-sprint', JSON.stringify(state));
  $('#saveStatus').textContent = 'Gerade gespeichert · lokal';
  setTimeout(() => $('#saveStatus').textContent = 'Fortschritt lokal gespeichert', 1400);
}

function current() { return SOURCES[state.paper]; }
function answersFor(section) { return state.checked[state.paper]?.[section] || {}; }
function draftFor(taskId) { return state.text[state.paper]?.schreiben?.[taskId] || ''; }

function timerFor(paperId = state.paper, section) {
  return state.timers?.[paperId]?.[section] || null;
}

function sectionHasContent(paperId, section) {
  const paper = SOURCES[paperId];
  if (!paper) return false;
  return section === 'schreiben'
    ? Boolean(paper.schreiben?.tasks?.length)
    : Boolean(paper[section]?.length);
}

function sectionSubmitted(paperId = state.paper, section) {
  return section !== 'schreiben' && Boolean(state.checked[paperId]?.[`${section}_submitted`]);
}

function sectionLocked(paperId = state.paper, section) {
  return section !== 'schreiben' && Boolean(state.checked[paperId]?.[`${section}_locked`]);
}

function formatTimer(seconds) {
  const total = Math.max(0, Math.ceil(Number(seconds) || 0));
  const minutes = Math.floor(total / 60);
  const remainder = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function timerRemaining(paperId, section) {
  const timer = timerFor(paperId, section);
  if (!timer?.startedAt) return durationFor(paperId, section);
  if (timer.expired) return 0;
  return Math.max(0, Math.ceil((Number(timer.endsAt) - Date.now()) / 1000));
}

function timerRunning(timer) {
  return Boolean(timer?.startedAt && !timer.stopped && !timer.expired && Number(timer.endsAt) > Date.now());
}

function hasRunningTimers() {
  return Object.entries(state.timers || {}).some(([paperId, paperTimers]) => Object.entries(paperTimers || {}).some(([section, timer]) => durationFor(paperId, section) && timerRunning(timer)));
}

function ensureTimerTicker() {
  if (timerTicker || !hasRunningTimers()) return;
  timerTicker = setInterval(() => {
    const expired = processExpiredTimers();
    if (expired.current) renderAll();
    else updateTimerDisplay();
    if (!hasRunningTimers()) {
      clearInterval(timerTicker);
      timerTicker = null;
    }
  }, 1000);
}

function expireTimer(paperId, section) {
  const timer = timerFor(paperId, section);
  if (!timer || timer.expired) return false;
  timer.expired = true;
  timer.stopped = true;
  timer.endsAt = Date.now();
  if (section !== 'schreiben') {
    if (!state.checked[paperId]) state.checked[paperId] = {};
    state.checked[paperId][`${section}_submitted`] = true;
    state.checked[paperId][`${section}_locked`] = true;
  }
  if (paperId === state.paper) {
    if (section === 'hoeren') $('#hearingAudio')?.pause();
    showToast(section === 'schreiben'
      ? 'Schreiben: Zeit abgelaufen · du kannst weiter schreiben'
      : `${TIMER_LABELS[section]}: Zeit abgelaufen · Antworten abgegeben`);
  }
  return true;
}

function processExpiredTimers() {
  const now = Date.now();
  let changed = false;
  let currentChanged = false;
  Object.entries(state.timers || {}).forEach(([paperId, paperTimers]) => {
    Object.entries(paperTimers || {}).forEach(([section, timer]) => {
      if (!durationFor(paperId, section) || !timer?.startedAt || timer.stopped || timer.expired) return;
      if (Number(timer.endsAt) <= now && expireTimer(paperId, section)) {
        changed = true;
        currentChanged = currentChanged || (paperId === state.paper && section === state.section);
      }
    });
  });
  if (changed) save();
  return { changed, current: currentChanged };
}

function startSectionTimer(section) {
  const duration = durationFor(state.paper, section);
  if (!duration || !sectionHasContent(state.paper, section)) return;
  processExpiredTimers();
  if (sectionSubmitted() || sectionLocked()) {
    renderAll();
    return;
  }
  const existing = timerFor(state.paper, section);
  if (timerRunning(existing) || existing?.stopped || existing?.expired) return;
  const now = Date.now();
  if (!state.timers[state.paper]) state.timers[state.paper] = {};
  state.timers[state.paper][section] = {
    startedAt: now,
    endsAt: now + duration * 1000
  };
  save();
  ensureTimerTicker();
  renderAll();
}

function stopSectionTimer(section) {
  const timer = timerFor(state.paper, section);
  if (timer && timerRunning(timer)) {
    timer.stopped = true;
    timer.stoppedAt = Date.now();
  }
}

function timerInfo(section, paperId = state.paper) {
  const timer = timerFor(paperId, section);
  const submitted = sectionSubmitted(paperId, section);
  const locked = sectionLocked(paperId, section);
  const running = timerRunning(timer);
  const startsWithAudio = section === 'hoeren' && Boolean(SOURCES[paperId]?.audio);
  let status = 'Bereit';
  let className = 'ready';
  if (locked || timer?.expired) {
    status = section === 'schreiben' ? 'Zeit abgelaufen · weiter schreiben' : 'Gesperrt · Zeit abgelaufen';
    className = 'expired';
  } else if (running) {
    status = 'Läuft';
    className = 'running';
  } else if (submitted) {
    status = 'Abgegeben';
    className = 'done';
  } else if (timer?.stopped) {
    status = 'Beendet · zurücksetzen';
    className = 'done';
  } else if (startsWithAudio) {
    status = 'Start mit Audio';
  }
  return {
    timer,
    submitted,
    locked,
    running,
    status,
    className,
    seconds: timerRemaining(paperId, section),
    canStart: !startsWithAudio && !submitted && !locked && !running && !timer?.stopped && !timer?.expired
  };
}

function timerHTML(section) {
  const info = timerInfo(section);
  const startButton = info.canStart
    ? `<button type="button" class="timer-start" data-start-timer="${section}">Timer starten</button>`
    : '';
  const restartButton = section === 'schreiben' && (info.timer?.expired || info.timer?.stopped)
    ? '<button type="button" class="timer-start" data-restart-writing-timer>Timer neu starten</button>'
    : '';
  return `<div class="section-timer ${info.className}" data-section-timer="${section}"><span class="timer-label">${TIMER_LABELS[section]}</span><strong data-timer-value>${formatTimer(info.seconds)}</strong><span class="timer-status" data-timer-status>${info.status}</span>${startButton}${restartButton}</div>`;
}

function sectionActionsHTML(section, extra = '') {
  const resetLabel = section === 'schreiben' ? 'Alle Schreibtexte löschen & zurücksetzen' : 'Abschnitt zurücksetzen';
  return `<div class="section-actions">${timerHTML(section)}${extra}<button type="button" class="secondary-button section-reset" data-reset-section="${section}">${resetLabel}</button></div>`;
}

function bindSectionControls(section) {
  content.querySelector(`[data-start-timer="${section}"]`)?.addEventListener('click', () => startSectionTimer(section));
  content.querySelector('[data-restart-writing-timer]')?.addEventListener('click', restartWritingTimer);
  content.querySelector(`[data-reset-section="${section}"]`)?.addEventListener('click', () => resetSection(section));
}

function updateTimerDisplay() {
  const value = content.querySelector('[data-timer-value]');
  if (!value) return;
  const info = timerInfo(state.section);
  value.textContent = formatTimer(info.seconds);
  const status = content.querySelector('[data-timer-status]');
  if (status) status.textContent = info.status;
  const timer = content.querySelector('[data-section-timer]');
  if (timer) timer.className = `section-timer ${info.className}`;
}

function restartWritingTimer() {
  const timer = timerFor(state.paper, 'schreiben');
  if (!timer || timerRunning(timer) || !sectionHasContent(state.paper, 'schreiben')) return;
  delete state.timers[state.paper].schreiben;
  if (!Object.keys(state.timers[state.paper]).length) delete state.timers[state.paper];
  // Clear flags saved by older versions; drafts and self-checks remain untouched.
  delete state.checked[state.paper]?.schreiben_submitted;
  delete state.checked[state.paper]?.schreiben_locked;
  startSectionTimer('schreiben');
}

function resetSection(section) {
  if (!sectionHasContent(state.paper, section)) return;
  const warning = section === 'schreiben'
    ? 'Alle Schreibtexte und Selbstchecks dieses Tests sowie die Schreibzeit endgültig löschen?'
    : `${TIMER_LABELS[section]}-Abschnitt wirklich zurücksetzen? Antworten und Zeit werden gelöscht.`;
  if (!confirm(warning)) return;
  if (section === 'hoeren') $('#hearingAudio')?.pause();
  const paperAnswers = state.checked[state.paper];
  if (paperAnswers) {
    delete paperAnswers[section];
    delete paperAnswers[`${section}_submitted`];
    delete paperAnswers[`${section}_locked`];
    if (!Object.keys(paperAnswers).length) delete state.checked[state.paper];
  }
  if (section === 'schreiben') {
    if (state.text[state.paper]) {
      delete state.text[state.paper].schreiben;
      if (!Object.keys(state.text[state.paper]).length) delete state.text[state.paper];
    }
    delete state.checks[state.paper];
    state.writingTask = 'A';
  }
  if (state.timers[state.paper]) {
    delete state.timers[state.paper][section];
    if (!Object.keys(state.timers[state.paper]).length) delete state.timers[state.paper];
  }
  save();
  renderAll();
  showToast(`${TIMER_LABELS[section]} zurückgesetzt`);
}

function renderPaperCards() {
  const papers = Object.entries(SOURCES);
  paperGrid.innerHTML = papers.map(([id, paper], index) => `<button class="paper-card ${id === state.paper ? 'selected' : ''}" data-paper="${id}"><span class="paper-no">${String(index + 1).padStart(2, '0')}</span><strong>${esc(paper.title)}</strong><small>${esc(paper.provider)}</small><span class="paper-card-score">${esc(paperScoreLabel(id))}</span></button>`).join('');
  $('#sourceCount').textContent = `${papers.length} Tests`;
  paperGrid.querySelectorAll('[data-paper]').forEach(button => button.addEventListener('click', () => {
    state.paper = button.dataset.paper;
    const selectedPaper = SOURCES[state.paper];
    state.section = selectedPaper.lesen.length ? 'lesen' : selectedPaper.hoeren.length ? 'hoeren' : 'schreiben';
    renderAll();
    save();
    $('#workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function renderAll() {
  processExpiredTimers();
  const p = current();
  renderPaperCards();
  $('#paperTitle').textContent = p.title;
  $('#paperMeta').textContent = `${p.provider} · ${p.tag} · Fragen und Antwortschlüssel aus der Quelle`;
  $('#paperScore').innerHTML = paperScoreHTML(state.paper);
  $('#sourceLink').href = p.url;
  $('#sourceLink').textContent = 'Quelle öffnen ↗';
  document.querySelectorAll('.tab').forEach(tab => {
    const active = tab.dataset.section === state.section;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
  });
  ['lesen', 'hoeren', 'schreiben'].forEach(section => {
    $(`#${section}Progress`).textContent = progress(section);
  });
  renderSection();
}

function progress(section) {
  if (sectionLocked(state.paper, section)) return 'gesperrt';
  if (section === 'schreiben') {
    const task = writingTask();
    return task ? (draftFor(task.id).trim() ? '1/1' : '0/1') : '—';
  }
  const items = current()[section] || [];
  return items.length ? `${Object.keys(answersFor(section)).length}/${items.length}` : '—';
}

const OBJECTIVE_SECTIONS = ['lesen', 'hoeren'];
const SECTION_LABELS = { lesen: 'Lesen', hoeren: 'Hören' };

function paperResult(paperId) {
  const paper = SOURCES[paperId];
  const savedPaper = state.checked[paperId] || {};
  const sections = OBJECTIVE_SECTIONS.filter(section => Array.isArray(paper[section]) && paper[section].length).map(section => {
    const items = paper[section];
    const answers = savedPaper[section] || {};
    const submitted = Boolean(savedPaper[`${section}_submitted`]);
    return {
      section,
      submitted,
      score: submitted ? scoreSection(items, answers) : 0,
      total: items.length,
      answered: Object.keys(answers).length
    };
  });
  const submittedSections = sections.filter(section => section.submitted);
  return {
    sections,
    submittedSections,
    complete: submittedSections.length === sections.length,
    score: submittedSections.reduce((sum, section) => sum + section.score, 0),
    total: sections.reduce((sum, section) => sum + section.total, 0)
  };
}

function benchmarkLabel(score) {
  if (score >= 33) return 'B1';
  if (score >= 20) return 'A2';
  return 'unter A2';
}

function paperScoreLabel(paperId) {
  const result = paperResult(paperId);
  if (!result.submittedSections.length) return 'Noch kein Ergebnis';
  if (result.complete) {
    const hasListening = result.sections.some(section => section.section === 'hoeren');
    const hasReading = result.sections.some(section => section.section === 'lesen');
    const label = hasListening && hasReading ? benchmarkLabel(result.score) : hasListening ? 'nur Hören' : 'nur Lesen';
    return `${result.score}/${result.total} Punkte · ${label}`;
  }
  return result.submittedSections.map(section => `${SECTION_LABELS[section.section]} ${section.score}/${section.total}`).join(' · ');
}

function paperScoreHTML(paperId) {
  const result = paperResult(paperId);
  if (!result.submittedSections.length) {
    return 'Noch kein Ergebnis. Abschnitt abgeben, um Punkte zu sehen.';
  }
  const details = result.submittedSections.map(section => `${SECTION_LABELS[section.section]}: ${section.score}/${section.total}`).join(' · ');
  if (!result.complete) {
    return `<strong>${esc(details)}</strong> · Zweiter Abschnitt noch offen.`;
  }
  const hasListening = result.sections.some(section => section.section === 'hoeren');
  const hasReading = result.sections.some(section => section.section === 'lesen');
  const benchmark = hasListening && hasReading ? ` · ${benchmarkLabel(result.score)}` : '';
  const objectiveLabel = hasListening && hasReading ? 'Hören + Lesen' : hasListening ? 'nur Hören' : 'nur Lesen';
  return `<strong>${result.score} / ${result.total} Punkte${benchmark}</strong> <span>${objectiveLabel} · Schreiben separat bewertet</span><br><small>${esc(details)}</small>`;
}

function renderSection() {
  if (state.section === 'schreiben') renderWriting();
  else renderQuestions(state.section);
}

function audioPlayerHTML() {
  const audio = current().audio;
  if (!audio) {
    return '<div class="audio-player audio-missing"><strong>Kein Audio hinterlegt.</strong><span>Öffne das Original-PDF für diesen Hörtest.</span></div>';
  }
  const sourceUrl = audio.downloadUrl || audio.url;
  const sourceLabel = audio.downloadUrl ? 'Original-Audio-ZIP öffnen ↗' : 'MP3 öffnen ↗';
  const preload = audio.url.startsWith('audio/') ? 'auto' : 'metadata';
  return `<div class="audio-player">
    <div class="audio-player-head"><div><span class="audio-kicker">Hörtext</span><strong>${esc(audio.label || 'Audio')}</strong></div><span class="audio-badge">Hören</span></div>
    <audio id="hearingAudio" controls preload="${preload}" src="${esc(audio.url)}"></audio>
    <div class="audio-player-actions"><button type="button" class="audio-toggle" id="toggleAudio" aria-controls="hearingAudio" aria-pressed="false">▶ Audio starten</button><button type="button" class="audio-toggle" data-audio-seek="-10" aria-label="10 Sekunden zurück">↶ 10 s</button><button type="button" class="audio-toggle" data-audio-seek="10" aria-label="10 Sekunden vor">10 s ↷</button><a class="audio-source-link" href="${esc(sourceUrl)}" target="_blank" rel="noreferrer">${sourceLabel}</a></div>
    <p class="audio-help">Gesamter Hörtest in einem Stück. Pausiere oder springe mit den Audiosteuerungen.</p>
  </div>`;
}

function sourceNotice(section, includeAudio = true) {
  const paper = current();
  const text = section === 'lesen'
    ? 'Lesetexte und Anzeigen bleiben in der Quelle. Diese Seite enthält nur die Fragen, Antwortmöglichkeiten und den Lösungsschlüssel.'
    : paper.audio
      ? 'Die Fragen und Antwortmöglichkeiten sind original. Starte den Hörtext, bevor du deine Lösungen markierst.'
      : 'Für diesen Test ist keine Audiodatei hinterlegt.';
  const audio = section === 'hoeren'
    ? includeAudio ? audioPlayerHTML() : paper.audio ? '<div class="audio-player-placeholder"></div>' : ''
    : '';
  return `${audio}<div class="reading-bank source-note"><div class="reading-bank-head"><span>Quelle</span><small>${esc(paper.provider)} · ${esc(paper.title)}</small></div><p class="muted">${text}</p><a class="source-link" href="${esc(paper.url)}" target="_blank" rel="noreferrer">Quelle öffnen ↗</a></div>`;
}

function bindAudioPlayer() {
  const audio = $('#hearingAudio');
  const button = $('#toggleAudio');
  if (!audio || !button) return;
  const syncButton = () => {
    const playing = !audio.paused && !audio.ended;
    button.textContent = playing ? 'Ⅱ Audio pausieren' : '▶ Audio starten';
    button.setAttribute('aria-pressed', String(playing));
  };
  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => showToast('Audio konnte nicht gestartet werden'));
    } else {
      audio.pause();
    }
  });
  audio.addEventListener('play', () => {
    if (sectionLocked(state.paper, 'hoeren')) {
      audio.pause();
      syncButton();
      return;
    }
    startSectionTimer('hoeren');
    syncButton();
  });
  ['pause', 'ended'].forEach(event => audio.addEventListener(event, syncButton));
  document.querySelectorAll('[data-audio-seek]').forEach(seekButton => seekButton.addEventListener('click', () => {
    const seconds = Number(seekButton.dataset.audioSeek);
    const duration = Number.isFinite(audio.duration) ? audio.duration : Infinity;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  }));
  syncButton();
}

function renderQuestions(section) {
  const items = current()[section] || [];
  const label = section === 'hoeren' ? 'Hören' : 'Lesen';
  if (!items.length) {
    content.innerHTML = `<div class="section-intro"><div><h3>${label}</h3><p>Für diesen Test sind keine ${label}-Fragen hinterlegt.</p></div></div>${sourceNotice(section, false)}`;
    return;
  }
  const answers = answersFor(section);
  const submitted = sectionSubmitted(state.paper, section);
  const locked = sectionLocked(state.paper, section);
  const intro = locked
    ? 'Zeit abgelaufen. Antworten sind gesperrt.'
    : section === 'hoeren'
      ? 'Lies zuerst die Antwortmöglichkeiten. Danach markiere deine Lösung.'
      : 'Wähle für jede Aufgabe genau eine Lösung.';
  const score = submitted ? scoreSection(items, answers) : null;
  const previousAudio = section === 'hoeren' ? $('#hearingAudio') : null;
  const previousAudioPlayer = previousAudio?.closest('.audio-player');
  const preserveAudio = Boolean(previousAudioPlayer && current().audio?.url === previousAudio.getAttribute('src'));
  const submitButton = locked ? '' : `<button class="submit-button" id="submitSection">${submitted ? 'Nochmal prüfen' : 'Abschnitt abgeben'} →</button>`;

  const questionGroups = current().questionGroups?.[section] || [];
  let activeQuestionGroup = null;
  const questionMarkup = items.map((item, index) => {
    const group = questionGroups.find(candidate => candidate.start === index);
    if (group) activeQuestionGroup = group;
    const groupHeading = group ? `<h4 class="question-group-heading">${esc(group.label)}</h4>` : '';
    const number = activeQuestionGroup ? index - activeQuestionGroup.start + 1 : item.number;
    return `${groupHeading}${questionHTML(item, answers, submitted, section, locked, number)}`;
  }).join('');
  content.innerHTML = `<div class="section-intro"><div><h3>${label}</h3><p>${intro}</p></div>${sectionActionsHTML(section, submitButton)}</div>${sourceNotice(section, !preserveAudio)}${score === null ? '' : resultBanner(score, items.length)}<div class="question-list">${questionMarkup}</div>`;

  bindSectionControls(section);
  if (section === 'hoeren') {
    if (preserveAudio) {
      content.querySelector('.audio-player-placeholder')?.replaceWith(previousAudioPlayer);
    } else {
      bindAudioPlayer();
    }
  }

  content.querySelectorAll('input[type="radio"]').forEach(input => input.addEventListener('change', () => {
    if (sectionLocked(state.paper, section)) return;
    if (!state.checked[state.paper]) state.checked[state.paper] = {};
    if (!state.checked[state.paper][section]) state.checked[state.paper][section] = {};
    state.checked[state.paper][section][input.name] = input.value;
    delete state.checked[state.paper][`${section}_submitted`];
    save();
    renderAll();
  }));

  $('#submitSection')?.addEventListener('click', () => {
    if (sectionLocked(state.paper, section)) return;
    if (!state.checked[state.paper]) state.checked[state.paper] = {};
    state.checked[state.paper][`${section}_submitted`] = true;
    stopSectionTimer(section);
    save();
    renderAll();
  });
}

function questionHTML(item, answers, submitted, section, locked = false, number = item.number) {
  const selected = answers[item.id] || '';
  const isWrong = submitted && selected && selected !== item.answer;
  const isCorrect = submitted && selected === item.answer;
  const correctLabel = item.options.find(option => option.value === item.answer)?.label || item.answer;
  return `<article class="question-card ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${locked ? 'locked' : ''}">
    <div class="q-head"><span class="q-number">${number} / ${section === 'hoeren' ? 'HÖREN' : 'LESEN'}</span>${submitted && selected ? `<span class="q-mark">${isCorrect ? '✓' : '×'}</span>` : ''}</div>
    <p class="q-prompt">${esc(item.prompt)}</p>
    <div class="options">${item.options.map(option => `<label class="option ${selected === option.value ? 'selected' : ''}"><input type="radio" name="${item.id}" value="${esc(option.value)}" ${selected === option.value ? 'checked' : ''} ${locked ? 'disabled' : ''}><span>${esc(option.label)}</span></label>`).join('')}</div>
    ${submitted && isWrong ? `<p class="feedback">Falsch. Richtig: <strong>${esc(correctLabel)}</strong></p>` : submitted && isCorrect ? '<p class="feedback"><strong>Richtig.</strong></p>' : ''}
  </article>`;
}

function resultBanner(score, total) {
  return `<div class="result-banner ${score === total ? '' : 'warn'}">Ergebnis: ${score} / ${total} richtig · ${Math.round(score / total * 100)}%</div>`;
}

function scoreSection(items, answers) {
  return items.reduce((score, item) => score + (answers[item.id] === item.answer ? 1 : 0), 0);
}

function writingTask() {
  const tasks = current().schreiben.tasks;
  return tasks.find(task => task.id === state.writingTask) || tasks[0];
}

function renderWriting() {
  const tasks = current().schreiben.tasks;
  if (!tasks.length) {
    content.innerHTML = '<div class="section-intro"><div><h3>Schreiben</h3><p>Für diesen Test sind keine Schreiben-Aufgaben hinterlegt.</p></div></div>';
    return;
  }
  const task = writingTask();
  const draft = draftFor(task.id);
  const checks = state.checks[state.paper]?.[task.id] || {};
  const writingIntro = 'Wähle eine Schreibaufgabe. Der Timer erinnert dich an die Zeit, sperrt aber keine Texte.';
  const copyButton = '<button type="button" class="secondary-button" id="copyWriting">Text kopieren</button>';
  content.innerHTML = `<div class="section-intro"><div><h3>Schreiben</h3><p>${writingIntro}</p></div>${sectionActionsHTML('schreiben', copyButton)}</div>
    <div class="paper-grid writing-task-grid">${tasks.map(option => `<button class="paper-card ${option.id === task.id ? 'selected' : ''}" data-writing-task="${option.id}"><span class="paper-no">${option.id}</span><strong>${esc(option.title)}</strong><small>Originalaufgabe</small></button>`).join('')}</div>
    <div class="write-box"><div class="writing-situation"><h4>${esc(task.title)}</h4><p>${esc(task.prompt)}</p><ul class="points">${task.points.map(point => `<li>${esc(point)}</li>`).join('')}</ul></div>
    <textarea id="writingText" placeholder="${esc(task.recipient)},\n\n... deine Nachricht ...\n\nMit freundlichen Grüßen\n..."></textarea>
    <div class="write-tools"><span class="word-count" id="wordCount">0 Wörter</span><span class="muted">Tipp: Anrede + 4 Leitpunkte + Gruß</span></div>
    <div class="rubric"><h4>Selbstcheck vor dem Abgeben</h4>${[
      'Habe ich alle vier Leitpunkte beantwortet?',
      'Habe ich Anrede und Gruß geschrieben?',
      'Habe ich weil / aber / deshalb sinnvoll benutzt?',
      'Ist mein Text klar und ungefähr 40–80 Wörter lang?'
    ].map((text, index) => `<label class="check-row"><input type="checkbox" data-check="${index}" ${checks[index] ? 'checked' : ''}> ${text}</label>`).join('')}</div></div>`;

  bindSectionControls('schreiben');
  content.querySelectorAll('[data-writing-task]').forEach(button => button.addEventListener('click', () => {
    state.writingTask = button.dataset.writingTask;
    save();
    renderAll();
  }));

  const textarea = $('#writingText');
  textarea.value = draft;
  updateWordCount();
  textarea.addEventListener('input', () => {
    if (!state.text[state.paper]) state.text[state.paper] = {};
    if (!state.text[state.paper].schreiben) state.text[state.paper].schreiben = {};
    state.text[state.paper].schreiben[task.id] = textarea.value;
    save();
    updateWordCount();
  });

  content.querySelectorAll('[data-check]').forEach(check => check.addEventListener('change', () => {
    if (!state.checks[state.paper]) state.checks[state.paper] = {};
    if (!state.checks[state.paper][task.id]) state.checks[state.paper][task.id] = {};
    state.checks[state.paper][task.id][check.dataset.check] = check.checked;
    save();
  }));
  $('#copyWriting').addEventListener('click', () => copyText(textarea.value, 'Schreibtext kopiert'));
}

function updateWordCount() {
  const textarea = $('#writingText');
  if (textarea) $('#wordCount').textContent = `${textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0} Wörter`;
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#039;');
}

function copyText(text, message) {
  if (!text) { showToast('Noch kein Text vorhanden'); return; }
  navigator.clipboard?.writeText(text).then(() => showToast(message)).catch(() => showToast('Text markieren und kopieren'));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  state.section = tab.dataset.section;
  renderAll();
  save();
}));

document.querySelectorAll('[data-info-action]').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.infoAction;
  state.section = action === 'writing' ? 'schreiben' : action === 'benchmark' ? 'lesen' : state.section;
  renderAll();
  save();
  $('#workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (action === 'practice') showToast('Antworten wählen → Abschnitt abgeben');
}));

$('#resetProgress').addEventListener('click', () => {
  if (!confirm('Gesamten lokalen Fortschritt löschen?')) return;
  localStorage.removeItem('dtz-sprint');
  state.checked = {};
  state.text = {};
  state.checks = {};
  state.timers = {};
  state.writingTask = 'A';
  renderAll();
  showToast('Antworten, Zeiten und Ergebnisse gelöscht');
});

ensureTimerTicker();
renderAll();
