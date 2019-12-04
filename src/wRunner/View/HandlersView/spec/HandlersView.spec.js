import helper from '@helper';
import HandlersView from '../HandlersView';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};

const view = new HandlersView({parent: document.getElementById('root')});

describe('updateDOM method.', () => {
  describe('When type is "single".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'single', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.handlersList.length = 1;
      view.handlersList.forEach((el) => {
        expect(el.parentNode === view.parent).toBeTruthy();
      });
    });
  });

  describe('When type is "range".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'range', constants: { singleValue: 'single', rangeValue: 'range' } });

      view.handlersList.length = 2;
      view.handlersList.forEach((el) => {
        expect(el.parentNode === view.parent).toBeTruthy();
      });
    });
  });
});

describe('getElements method.', () => {
  it('Returns array of elements.', () => {
    const result = view.getElements();

    expect(result).toEqual([...view.handlersList]);
  });
});