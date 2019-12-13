import helper from '@helper';
import ScaleView from '../ScaleView';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};

const view = new ScaleView({parent: document.getElementById('root')});

describe('updateDivisions method.', () => {
  it('Generate divisions for sliders.', () => {
    view.updateDivisions(3);

    expect(view.scaleDivisionsList.length).toEqual(3);

    for (let i = 0; i < view.scaleDivisionsList.length; i += 1) {
      expect(helper.isDOMEl(view.scaleDivisionsList[i])).toBeTruthy();
      expect(view.scaleDivisionsList[i].parentNode).toEqual(view.scaleDivisionsBlock);
    }
  });
});

describe('getElements method.', () => {
  it('Returns array of elements.', () => {
    const result = view.getElements();

    expect(result).toEqual([view.scaleDivisionsBlock, ...view.scaleDivisionsList]);
  });
});