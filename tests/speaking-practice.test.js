// Optional: node tests/speaking-practice.test.js (site itself needs no Node.js).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function element() {
  return {
    innerHTML: '', textContent: '', value: '', dataset: {},
    classList: { toggle() {}, add() {}, remove() {} },
    setAttribute() {}, addEventListener(type, fn) { this.handlers ??= {}; this.handlers[type] = fn; },
    querySelector() { return element(); },
    querySelectorAll(selector) {
      if (selector !== '[data-speaking-note]') return [];
      // Minimal textarea stand-ins for testing note binding, not a browser DOM.
      if (this.noteMarkup !== this.innerHTML) {
        this.noteMarkup = this.innerHTML;
        this.notes = [...this.innerHTML.matchAll(/data-speaking-note="([^"]+)"/g)].map(match => Object.assign(element(), { dataset: { speakingNote: match[1] } }));
      }
      return this.notes || [];
    },
    scrollIntoView() {}, closest() { return null; }
  };
}

function boot(saved) {
  const nodes = new Map();
  const tabs = ['hoeren', 'lesen', 'schreiben', 'sprechen'].map(section => Object.assign(element(), { dataset: { section } }));
  const storage = new Map(saved ? [['dtz-sprint', JSON.stringify(saved)]] : []);
  const document = {
    querySelector(selector) { if (!nodes.has(selector)) nodes.set(selector, element()); return nodes.get(selector); },
    querySelectorAll(selector) { return selector === '.tab' ? tabs : []; }
  };
  const context = vm.createContext({ document, window: {}, navigator: {}, confirm: () => true,
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    setTimeout: () => 0, setInterval: () => 0, clearInterval() {}, console });
  vm.runInContext(fs.readFileSync('exam-data.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('speaking-data.js', 'utf8'), context);
  vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
  return { context, document, tabs, storage };
}

const { context, document, tabs, storage } = boot();
assert.equal(vm.runInContext('state.section', context), 'hoeren');
assert.equal(vm.runInContext('paperResult(state.paper).sections[0].section', context), 'hoeren');
const sources = vm.runInContext('SOURCES', context);
assert.equal(Object.keys(sources).length, 13);
for (const id of ['prognose1', 'prognose2', 'prognose3']) {
  const paper = sources[id];
  assert.equal(paper.practice, true);
  assert.equal(paper.lesen.length, 0);
  assert.equal(paper.hoeren.length, 0);
  assert.equal(paper.schreiben.tasks.length, 2);
  for (const task of paper.schreiben.tasks) assert.equal(task.points.length, 4);
  assert.equal(paper.sprechen.teil2.fragen.length, 3);
  assert.equal(paper.sprechen.teil3.punkte.length, 5);
  assert.ok(paper.sprechen.teil2.bildA && paper.sprechen.teil2.bildB);
}
const tabsBy = Object.fromEntries(tabs.map(tab => [tab.dataset.section, tab]));
vm.runInContext("state.paper = 'prognose2'; state.section = 'sprechen'; renderAll()", context);
assert.equal(tabsBy.lesen.disabled, true);
assert.equal(tabsBy.hoeren.disabled, true);
assert.equal(tabsBy.schreiben.disabled, false);
assert.equal(tabsBy.sprechen.disabled, false);
assert.match(document.querySelector('#sectionContent').innerHTML, /Elternbeirat/);
assert.match(document.querySelector('#paperScore').innerHTML, /ohne automatische Bewertung/);
vm.runInContext("state.section = 'schreiben'; renderAll()", context);
assert.match(document.querySelector('#sectionContent').innerHTML, /Eigene Übung/);
const originalPages = {
  gast1: [[33], [34], [35], [36]],
  gast2: [[33], [34], [35], [36]],
  aufjeden: [[11], [12], [13], [14]],
  telc1: [[23], [24], [25], [26]],
  goetheModellsatz: [[31], [32], [33], [34]],
  hueberModul5: [[13], [13, 14], [15], [16]]
};
for (const [id, groups] of Object.entries(originalPages)) {
  const speaking = sources[id].sprechen;
  assert.equal(speaking.original, true);
  assert.equal(speaking.teil2, undefined); // Never supplement with invented tasks.
  assert.ok(fs.existsSync(speaking.sourceUrl));
  assert.deepEqual(JSON.parse(JSON.stringify(speaking.parts.map(part => part.pages.map(page => page.number)))), groups);
  for (const part of speaking.parts) for (const page of part.pages) {
    assert.ok(fs.existsSync(page.image), page.image);
    assert.ok(fs.readFileSync(page.image).subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])));
    assert.ok(page.text.length > 100);
  }
  vm.runInContext(`state.paper = '${id}'; state.section = 'sprechen'; renderAll()`, context);
  const html = document.querySelector('#sectionContent').innerHTML;
  assert.match(html, /Original-Sprechaufgaben aus diesem Test/);
  assert.match(html, /<img /);
  assert.match(html, new RegExp(`exam/speaking/${id}/`));
  assert.doesNotMatch(html, /Zusatzübung|Prognose|hypothetisch/);
}
for (const id of ['b1QuestionPaper', 'b1ExtraPractice', 'paper1', 'sprachhausHoeren']) {
  assert.equal(sources[id].sprechen, undefined);
  vm.runInContext(`state.paper = '${id}'; state.section = 'sprechen'; renderAll()`, context);
  assert.equal(tabsBy.sprechen.disabled, true);
  assert.equal(document.querySelector('#sprechenProgress').textContent, '—');
  assert.notEqual(vm.runInContext('state.section', context), 'sprechen');
  vm.runInContext('renderSpeaking()', context);
  assert.match(document.querySelector('#sectionContent').innerHTML, /keine Sprechaufgaben/);
  assert.doesNotMatch(document.querySelector('#sectionContent').innerHTML, /Gesundheit|Elternbeirat|Umzug/);
}
assert.equal(sources.sprachhausHoeren.schreiben.tasks.length, 0);
vm.runInContext("state.paper = 'sprachhausHoeren'; renderAll()", context);
assert.equal(tabsBy.schreiben.disabled, true);
vm.runInContext("state.paper = 'gast1'; state.section = 'sprechen'; renderAll()", context);
const note = document.querySelector('#sectionContent').querySelectorAll('[data-speaking-note]').find(node => node.dataset.speakingNote === 'bildA');
note.value = '<script>safe plain notes</script>';
note.handlers.input();
assert.equal(JSON.parse(storage.get('dtz-sprint')).text.gast1.sprechen.bildA, note.value);
vm.runInContext("state.text.gast1 = { sprechen: { bildA: 'Meine Stichpunkte' }, schreiben: { A: 'Mein Entwurf' } }; save(); resetSection('sprechen')", context);
assert.equal(JSON.parse(storage.get('dtz-sprint')).text.gast1.schreiben.A, 'Mein Entwurf');
assert.equal(JSON.parse(storage.get('dtz-sprint')).text.gast1.sprechen, undefined);

const reload = boot({ paper: 'prognose3', section: 'sprechen', checked: {}, text: { prognose3: { sprechen: { teil3: 'Umzug' } } }, checks: {}, timers: {} });
assert.equal(vm.runInContext('state.text.prognose3.sprechen.teil3', reload.context), 'Umzug');
assert.equal(vm.runInContext('state.section', reload.context), 'sprechen');
assert.equal(reload.document.querySelector('#sectionContent').querySelectorAll('[data-speaking-note]').find(node => node.dataset.speakingNote === 'teil3').value, 'Umzug');
const originalReload = boot({ paper: 'aufjeden', section: 'sprechen', text: { aufjeden: { sprechen: { bildA: 'Spielplatz' } } } });
assert.match(originalReload.document.querySelector('#sectionContent').innerHTML, /Original-Sprechaufgaben/);
assert.equal(originalReload.document.querySelector('#sectionContent').querySelectorAll('[data-speaking-note]').find(node => node.dataset.speakingNote === 'bildA').value, 'Spielplatz');
const missingReload = boot({ paper: 'sprachhausHoeren', section: 'sprechen' });
assert.equal(vm.runInContext('state.section', missingReload.context), 'hoeren');
console.log('OK: 6 original speaking sources + assets, 4 empty speaking sections, 3 original practice sets, note persistence/reset/reload');
