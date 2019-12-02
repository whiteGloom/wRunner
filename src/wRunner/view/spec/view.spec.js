// Requirements
import helper from '@helper';
import ViewModule from '../view';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};


const view = new ViewModule();

describe('updateDOM method.', () => {
  describe('When type is "single".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'single', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.handlersList.length = 1;
      view.valueNotesList.length = 1;
      view.handlersList.forEach((el) => {
        expect(el.parentNode === view.path).toBeTruthy();
      });
      view.valueNotesList.forEach((el) => {
        expect(el.parentNode === view.outer).toBeTruthy();
      });
    });
  });

  describe('When type is "range".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'range', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.handlersList.length = 2;
      view.valueNotesList.length = 3;
      view.handlersList.forEach((el) => {
        expect(el.parentNode === view.path).toBeTruthy();
      });
      view.valueNotesList.forEach((el) => {
        expect(el.parentNode === view.outer).toBeTruthy();
      });
    });
  });
});

describe('append method.', () => {
  it('Applying sliders roots.', () => {
    var roots = document.getElementById('root');
    view.append(roots);

    expect(view.mainNode.parentNode === roots).toBeTruthy();
  });
});

describe('generateDivisions method.', () => {
  it('Generate divisionsBlock for sliders.', () => {
    view.generateDivisions(3);

    expect(view.divisionsList.length).toEqual(3);

    for (let i = 0; i < view.divisionsList.length; i += 1) {
      expect(helper.isDOMEl(view.divisionsList[i])).toBeTruthy();
      expect(view.divisionsList[i].parentNode).toEqual(view.divisionsBlock);
    }
  });
});

describe('applyStyles method.', () => {
  describe('Applying theme and direction to sliders elements.', () => {
    it('Set theme to "default", direction to "horizontal".', () => {
      view.applyStyles([
        {value: 'default', oldValue: null, className: 'theme'},
        {value: 'horizontal', oldValue: null, className: 'direction'},
      ]);
      const els = [
        view.mainNode, view.outer,
        view.path, view.pathPassed,
        view.divisionsBlock
      ].concat(view.divisionsList, view.valueNotesList, view.handlersList);

      for (let i = 0; i < els.length; i += 1) {
        const el = els[i];

        expect(el).toHaveClass(`${el.classList[0]}_theme_default`);
        expect(el).toHaveClass(`${el.classList[0]}_direction_horizontal`);
      }
    });
  });

  describe('Removes old themes.', () => {
    it('Removes old themes.', () => {
      view.applyStyles([
        {value: 'someAnother', oldValue: 'default', className: 'theme'},
        {value: 'someAnother', oldValue: 'horizontal', className: 'direction'},
      ]);
      const els = [
        view.mainNode, view.outer,
        view.path, view.pathPassed,
        view.divisionsBlock
      ].concat(view.divisionsList, view.valueNotesList, view.handlersList);

      for (let i = 0; i < els.length; i += 1) {
        const el = els[i];
        expect(el).not.toHaveClass(`${el.classList[0]}_theme_default`);
        expect(el).not.toHaveClass(`${el.classList[0]}_direction_horizontal`);
      }
    });
  });
});

describe('applyValueNotesDisplay method.', () => {
  describe('When display is true, type is single.', () => {
    it('Applying display of value note.', () => {
      view.updateDOM({value: 'single', constants: {singleValue: 'single', rangeValue: 'range'}})
      view.applyValueNotesDisplay(
        true,
        {
          value: 'separate',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          }
        }
      );

      view.valueNotesList.forEach((el) => {
        expect(el).toHaveClass(`${el.classList[0]}_display_visible`);
      });
    });
  });

  describe('When display is true, type is range.', () => {
    it('If valueNoteMode is "separate", shows first and last note.', () => {
      view.updateDOM({value: 'range', constants: {singleValue: 'single', rangeValue: 'range'}})
      view.applyValueNotesDisplay(
        true,
        {
          value: 'separate',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          }
        }
      );

      expect(view.valueNotesList[0]).toHaveClass(`${view.valueNotesList[0].classList[0]}_display_visible`);
      expect(view.valueNotesList[1]).toHaveClass(`${view.valueNotesList[1].classList[0]}_display_hidden`);
      expect(view.valueNotesList[2]).toHaveClass(`${view.valueNotesList[2].classList[0]}_display_visible`);
    });

    it('If valueNoteMode is "common", shows second note.', () => {
      view.updateDOM({value: 'range', constants: {singleValue: 'single', rangeValue: 'range'}})
      view.applyValueNotesDisplay(
        true,
        {
          value: 'common',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          }
        }
      );

      expect(view.valueNotesList[0]).toHaveClass(`${view.valueNotesList[0].classList[0]}_display_hidden`);
      expect(view.valueNotesList[1]).toHaveClass(`${view.valueNotesList[1].classList[0]}_display_visible`);
      expect(view.valueNotesList[2]).toHaveClass(`${view.valueNotesList[2].classList[0]}_display_hidden`);
    });
  });

  describe('When display is false.', () => {
    it('Hide notes.', () => {
      view.applyValueNotesDisplay(
        false,
        {
          value: 'separate',
          constants: {
            separateValue: 'separate',
            commonValue: 'common',
          }
        }
      );

      view.valueNotesList.forEach((el) => {
        expect(el).toHaveClass(`${el.classList[0]}_display_hidden`);
      });
    });
  });
});
