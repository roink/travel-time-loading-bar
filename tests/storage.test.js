const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const { JSDOM } = require('jsdom');

describe('bar persistence', () => {
  let dom, window, document, store;

  beforeEach(() => {
    store = {};
    const localStorageMock = {
      getItem: jest.fn(key => store[key] || null),
      setItem: jest.fn((key, value) => { store[key] = value; }),
      removeItem: jest.fn(key => { delete store[key]; }),
      clear: jest.fn(() => { store = {}; })
    };

    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      url: 'https://example.org/',
      beforeParse(window) {
        Object.defineProperty(window, 'localStorage', {
          configurable: true,
          value: localStorageMock
        });
      }
    });
    window = dom.window;
    document = dom.window.document;
  });

  afterEach(() => {
    dom.window.close();
  });

  test('loadBars recreates saved bars', () => {
    const { createBar, saveBars, loadBars } = window;
    const container = document.getElementById('bars-container');

    const now = new Date();
    createBar('First', new Date(now - 1000), new Date(now + 1000), false);
    createBar('Second', new Date(now - 2000), new Date(now + 2000), false);

    saveBars();
    expect(window.localStorage.setItem).toHaveBeenCalled();

    container.innerHTML = '';
    window.eval('bars.length = 0');

    loadBars();
    const bars = window.eval('bars');
    expect(bars.length).toBe(2);
    expect(container.children.length).toBe(2);
    expect(bars[0].name).toBe('First');
    expect(bars[1].name).toBe('Second');
  });
});
