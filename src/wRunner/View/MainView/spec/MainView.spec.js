import MainView from '../MainView';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};

const view = new MainView();

describe('append method.', () => {
  it('Applying sliders roots.', () => {
    const roots = document.getElementById('root');
    view.append(roots);

    expect(view.mainNode.parentNode === roots).toBeTruthy();
  });
});

describe('updateDOM method.', () => {
  describe('When type is "single".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'single', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.valueNotesList.forEach((el) => {
        expect(el.valueNote.parentNode === view.outer).toBeTruthy();
      });
      view.handlersList.forEach((el) => {
        expect(el.handler.parentNode === view.track.track).toBeTruthy();
      });
    });
  });

  describe('When type is "range".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'range', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.valueNotesList.forEach((el) => {
        expect(el.valueNote.parentNode === view.outer).toBeTruthy();
      });
      view.handlersList.forEach((el) => {
        expect(el.handler.parentNode === view.track.track).toBeTruthy();
      });
    });
  });
});

describe('applyStyles method.', () => {
  describe('Applying theme and direction to sliders elements.', () => {
    it('Set theme to "default", direction to "horizontal".', () => {
      view.applyStyles([
        { value: 'default', oldValue: null, className: 'theme' },
        { value: 'horizontal', oldValue: null, className: 'direction' },
      ]);
      const els = [
        ...[view.mainNode, view.outer],
        ...[view.track.track, view.track.progress],
        ...view.handlersList.map((el) => el.handler),
        ...view.valueNotesList.map((el) => el.valueNote),
        ...view.scale.getElements(),
      ];

      els.forEach((el) => {
        expect(el).toHaveClass(`${el.classList[0]}_theme_default`);
        expect(el).toHaveClass(`${el.classList[0]}_direction_horizontal`);
      });
    });
  });

  describe('Removes old themes.', () => {
    it('Removes old themes.', () => {
      view.applyStyles([
        { value: 'someAnother', oldValue: 'default', className: 'theme' },
        { value: 'someAnother', oldValue: 'horizontal', className: 'direction' },
      ]);
      const els = [
        ...[view.mainNode, view.outer],
        ...[view.track.track, view.track.progress],
        ...view.handlersList.map((el) => el.handler),
        ...view.valueNotesList.map((el) => el.valueNote),
        ...view.scale.getElements(),
      ];

      els.forEach((el) => {
        expect(el).not.toHaveClass(`${el.classList[0]}_theme_default`);
        expect(el).not.toHaveClass(`${el.classList[0]}_direction_horizontal`);
      });
    });
  });
});
