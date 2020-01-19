// Requirements
import makeEvent from '@event';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"><div class="cls">text node</div></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;


describe('makeEvent method.', () => {
  it('Returns observer object.', () => {
    expect(typeof makeEvent() === 'object').toBeTruthy();
  });
});

describe('addHandler method.', () => {
  it('Adds func to observers list object.', () => {
    const e = makeEvent();
    const func = () => {};
    expect(e.addHandler(func)).not.toBe(false);
  });

  it('If the fuc is already added, returns false', () => {
    const e = makeEvent();
    const func = () => {};
    e.addHandler(func);
    expect(e.addHandler(func)).toBe(false);
  });

  it('If the arg is is not a func, returns false', () => {
    const e = makeEvent();
    const notFunc = 123;
    expect(e.addHandler(notFunc)).toBe(false);
  });
});

describe('removeHandler method.', () => {
  it('Removes func from observers list object.', () => {
    const e = makeEvent();
    const func = () => {};
    expect(e.addHandler(func)).not.toBe(false);
    expect(e.removeHandler(func)).not.toBe(false);
  });

  it('If the list does not containt func, returns false.', () => {
    const e = makeEvent();
    const func = () => {};
    expect(e.removeHandler(func)).toBe(false);
  });
});

describe('trigger method.', () => {
  it('Triggering observers.', () => {
    const e = makeEvent();
    const func = () => {};
    expect(e.addHandler(func)).not.toBe(false);
    expect(e.trigger()).not.toBe(false);
  });

  it('If the list of observers is empty, returns false.', () => {
    const e = makeEvent();
    expect(e.trigger()).toBe(false);
  });
});
