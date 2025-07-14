const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function loadDOM() {
  const filePath = path.join(__dirname, 'index.html');
  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable',
    url: 'http://localhost/'
  });
  await new Promise(resolve => {
    const state = dom.window.document.readyState;
    if (state === 'interactive' || state === 'complete') {
      resolve();
    } else {
      dom.window.addEventListener('load', resolve);
    }
  });
  return dom;
}

describe('bar editing and removal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('editing a bar updates label and storage', async () => {
    const dom = await loadDOM();
    const { window } = dom;
    const { document } = window;

    window.localStorage.clear();
    window.createBar('Trip', new window.Date('2024-01-01T00:00'), new window.Date('2024-01-02T00:00'));

    const editBtn = document.querySelector('.edit-btn');
    editBtn.click();

    const nameInput = document.getElementById('bar-name');
    const startInput = document.getElementById('bar-start');
    const endInput = document.getElementById('bar-end');
    const addBtn = document.getElementById('add-btn');

    nameInput.value = 'Edited';
    startInput.value = '2024-02-01T00:00';
    endInput.value = '2024-02-02T00:00';

    nameInput.dispatchEvent(new window.Event('input', { bubbles: true }));
    startInput.dispatchEvent(new window.Event('input', { bubbles: true }));
    endInput.dispatchEvent(new window.Event('input', { bubbles: true }));

    addBtn.click();

    const label = document.querySelector('.bar-label').textContent;
    expect(label).toBe('Edited');

    const stored = JSON.parse(window.localStorage.getItem('bars'));
    expect(stored[0].name).toBe('Edited');
    expect(stored[0].start).toBe(new Date('2024-02-01T00:00').toISOString());
    expect(stored[0].end).toBe(new Date('2024-02-02T00:00').toISOString());
  });

  test('remove button deletes bar from DOM and storage', async () => {
    const dom = await loadDOM();
    const { window } = dom;
    const { document } = window;

    window.localStorage.clear();
    window.createBar('Trip', new window.Date('2024-01-01T00:00'), new window.Date('2024-01-02T00:00'));

    const removeBtn = document.querySelector('.remove-btn');
    removeBtn.click();

    const barsContainer = document.getElementById('bars-container');
    expect(barsContainer.children.length).toBe(0);

    const stored = JSON.parse(window.localStorage.getItem('bars'));
    expect(stored.length).toBe(0);
  });
});
