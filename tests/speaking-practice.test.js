// Optional: node tests/speaking-practice.test.js (site itself needs no Node.js).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function element() {
  return {
    innerHTML: '', textContent: '', value: '', dataset: {},
    classList: { toggle() {}, add() {}, remove() {} },
    setAttribute() {}, addEventListener(type, fn) { this.handlers ??= {}; this.handlers[type] = fn; },
    querySelector() { return element(); }, querySelectorAll() { return []; },
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
vm.runInContext("state.paper = 'gast1'; state.section = 'sprechen'; renderAll()", context);
assert.match(document.querySelector('#sectionContent').innerHTML, /nicht aus diesem Originaltest/);
vm.runInContext("state.text.gast1 = { sprechen: { bildA: 'Meine Stichpunkte' }, schreiben: { A: 'Mein Entwurf' } }; save(); resetSection('sprechen')", context);
assert.equal(JSON.parse(storage.get('dtz-sprint')).text.gast1.schreiben.A, 'Mein Entwurf');
assert.equal(JSON.parse(storage.get('dtz-sprint')).text.gast1.sprechen, undefined);

const reload = boot({ paper: 'prognose3', section: 'sprechen', checked: {}, text: { prognose3: { sprechen: { teil3: 'Umzug' } } }, checks: {}, timers: {} });
assert.equal(vm.runInContext('state.text.prognose3.sprechen.teil3', reload.context), 'Umzug');
assert.equal(vm.runInContext('state.section', reload.context), 'sprechen');
console.log('Speaking/writing practice: 13 sources, 3 sets, disabled tabs, fallback, reset and reload OK');
