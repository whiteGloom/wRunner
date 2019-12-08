import helper from '@helper';
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