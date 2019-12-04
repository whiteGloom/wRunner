import helper from '@helper';
import PathPassedView from '../PathPassedView';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  callback();
};

const view = new PathPassedView({parent: document.getElementById('root')});

describe('getElements method.', () => {
  it('Returns array of elements.', () => {
    const result = view.getElements();

    expect(result).toEqual([view.pathPassed]);
  });
});