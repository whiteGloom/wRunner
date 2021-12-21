import ValueNoteView from '../ValueNoteView';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};

const view = new ValueNoteView(document.getElementById('root'), 'single');

describe('applyDisplay method.', () => {
  describe('When display is true.', () => {
    it('Shows element.', () => {
      view.applyDisplay(true);

      expect(view.valueNote).toHaveClass(`${view.valueNote.classList[0]}_display_visible`);
    });
  });
  describe('When display is false.', () => {
    it('Shows element.', () => {
      view.applyDisplay(false);

      expect(view.valueNote).toHaveClass(`${view.valueNote.classList[0]}_display_hidden`);
    });
  });
});

describe('destroy method.', () => {
  it('Removes dom el.', () => {
    view.destroy();
    expect(view.valueNote.parentNode !== document.getElementById('root')).toBe(true);
  });
});

describe('addTextNode method.', () => {
  it('Add div with text to valueNote.', () => {
    view.addTextNode('some');
    expect(view.valueNote.getElementsByTagName('DIV').length > 0).toBe(true);
    expect(view.valueNote.getElementsByTagName('DIV')[0].innerHTML === 'some').toBe(true);
  });
});

describe('clearTextNodes method.', () => {
  it('Removes content of valueNote domEl.', () => {
    view.clearTextNodes('some');
    expect(view.valueNote.innerHTML === '').toBe(true);
  });
});

describe('_init method.', () => {
  it('Removes content of valueNote domEl.', () => {
    view._init();
    expect(view.valueNote.classList.length > 0).toBe(true);
    expect(view.valueNote.parentNode === view.parent).toBe(true);
  });
});
