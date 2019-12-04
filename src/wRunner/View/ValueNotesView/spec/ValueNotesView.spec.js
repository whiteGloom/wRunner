import helper from '@helper';
import ValueNotesView from '../ValueNotesView';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};

const view = new ValueNotesView({parent: document.getElementById('root')});

describe('updateDOM method.', () => {
  describe('When type is "single".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'single', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.valueNotesList.length = 1;
      view.valueNotesList.forEach((el) => {
        expect(el.parentNode === view.parent).toBeTruthy();
      });
    });
  });

  describe('When type is "range".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'range', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.valueNotesList.length = 3;
      view.valueNotesList.forEach((el) => {
        expect(el.parentNode === view.parent).toBeTruthy();
      });
    });
  });
});

describe('applyDisplay method.', () => {
  describe('When display is true, type is single.', () => {
    it('Applying display of value note.', () => {
      view.updateDOM({ value: 'single', constants: { singleValue: 'single', rangeValue: 'range' } });
      view.applyDisplay(
        true,
        {
          value: 'separate',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          },
        },
      );

      view.valueNotesList.forEach((el) => {
        expect(el).toHaveClass(`${el.classList[0]}_display_visible`);
      });
    });
  });

  describe('When display is true, type is range.', () => {
    it('If valueNoteMode is "separate", shows first and last note.', () => {
      view.updateDOM({ value: 'range', constants: { singleValue: 'single', rangeValue: 'range' } });
      view.applyDisplay(
        true,
        {
          value: 'separate',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          },
        },
      );

      expect(view.valueNotesList[0]).toHaveClass(`${view.valueNotesList[0].classList[0]}_display_visible`);
      expect(view.valueNotesList[1]).toHaveClass(`${view.valueNotesList[1].classList[0]}_display_hidden`);
      expect(view.valueNotesList[2]).toHaveClass(`${view.valueNotesList[2].classList[0]}_display_visible`);
    });

    it('If valueNoteMode is "common", shows second note.', () => {
      view.updateDOM({ value: 'range', constants: { singleValue: 'single', rangeValue: 'range' } });
      view.applyDisplay(
        true,
        {
          value: 'common',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          },
        },
      );

      expect(view.valueNotesList[0]).toHaveClass(`${view.valueNotesList[0].classList[0]}_display_hidden`);
      expect(view.valueNotesList[1]).toHaveClass(`${view.valueNotesList[1].classList[0]}_display_visible`);
      expect(view.valueNotesList[2]).toHaveClass(`${view.valueNotesList[2].classList[0]}_display_hidden`);
    });
  });

  describe('When display is false.', () => {
    it('Hide notes.', () => {
      view.applyDisplay(
        false,
        {
          value: 'separate',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          },
        },
      );

      view.valueNotesList.forEach((el) => {
        expect(el).toHaveClass(`${el.classList[0]}_display_hidden`);
      });
    });
  });
});

describe('getElements method.', () => {
  it('Returns array of elements.', () => {
    const result = view.getElements();

    expect(result).toEqual([...view.valueNotesList]);
  });
});