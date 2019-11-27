// Requirements
import helper from '@helper';
import ViewModule from '../view';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;
window.requestAnimationFrame = function gag(callback) {
  setTimeout(callback, 0);
};


const view = new ViewModule();

describe('updateDOM method.', () => {
  describe('When type is "single".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'single', typeConstants: { singleValue: 'single', rangeValue: 'range' } });

      expect(view.path.parentNode === view.outer).toBeTruthy();
      expect(view.pathPassed.parentNode === view.path).toBeTruthy();
      expect(view.divisionsBlock.parentNode === view.outer).toBeTruthy();

      expect(view.handle.parentNode === view.path);
      expect(view.valueNote.parentNode === view.outer);
    });
  });

  describe('When type is "range".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'range', typeConstants: { singleValue: 'single', rangeValue: 'range' } });

      expect(view.path.parentNode === view.outer).toBeTruthy();
      expect(view.pathPassed.parentNode === view.path).toBeTruthy();
      expect(view.divisionsBlock.parentNode === view.outer).toBeTruthy();

      expect(view.handleMin.parentNode === view.path).toBeTruthy();
      expect(view.handleMax.parentNode === view.path).toBeTruthy();
      expect(view.valueNoteMin.parentNode === view.outer).toBeTruthy();
      expect(view.valueNoteMax.parentNode === view.outer).toBeTruthy();
      expect(view.valueNoteCommon.parentNode === view.outer).toBeTruthy();
    });
  });
});

describe('append method.', () => {
  it('Applying sliders roots.', () => {
    view.append();

    expect(view.mainNode.parentNode === view.roots).toBeTruthy();
  });
});

describe('setRoots method.', () => {
  describe('Normal value - DOM el.', () => {
    it('Chaning roots, returns roots.', () => {
      const result = view.setRoots(document.getElementById('root'));

      expect(result).toEqual(document.getElementById('root'));
      expect(result).toEqual(view.roots);
    });
  });

  describe('If you try to set roots as a not DOM el, it will returns undefined.', () => {
    beforeEach(() => {
      view.setRoots(document.body);
    });

    it('Taking NaN, returns undefined.', () => {
      const result = view.setRoots(NaN);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking {}, returns undefined.', () => {
      const result = view.setRoots({});

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking 123, returns undefined.', () => {
      const result = view.setRoots(123);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking null, returns undefined.', () => {
      const result = view.setRoots(null);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking undefined, returns undefined.', () => {
      const result = view.setRoots(undefined);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking false, returns undefined.', () => {
      const result = view.setRoots(false);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking true, returns undefined.', () => {
      const result = view.setRoots(true);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking [], returns undefined.', () => {
      const result = view.setRoots([]);

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });

    it('Taking "dadaya", returns undefined.', () => {
      const result = view.setRoots('dadaya');

      expect(result).toBeUndefined();
      expect(view.roots).toEqual(document.body);
    });
  });
});

describe('getRoots method.', () => {
  it('Returns sliders roots.', () => {
    const result = view.getRoots();

    expect(helper.isDOMEl(result)).toBeTruthy();
  });
});

describe('setDivisionsCount method.', () => {
  describe('Changing divisionsBlock count, returns divisionsBlock count.', () => {
    it('Taking 3, returns 3.', () => {
      view.setDivisionsCount(3);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking 2, returns 2.', () => {
      view.setDivisionsCount(2);

      expect(view.divisionsBlockCount).toEqual(2);
    });

    it('Taking 0, returns 0.', () => {
      view.setDivisionsCount(0);

      expect(view.divisionsBlockCount).toEqual(0);
    });
  });

  describe('If you try to set divisionsBlock count as 1, it will set divisionsBlock count to 2.', () => {
    it('Taking 1, changing divisionsBlock count to 2.', () => {
      view.setDivisionsCount(1);

      expect(view.divisionsBlockCount).toEqual(2);
    });
  });

  describe('If you try to set divisionsBlock count as not a number or a number, that is less than 0, returns undefined.', () => {
    beforeEach(() => {
      view.setDivisionsCount(3);
    });

    it('Taking -1, returns undefined.', () => {
      view.setDivisionsCount(-1);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking -100, returns undefined.', () => {
      view.setDivisionsCount(-100);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking -100, returns undefined.', () => {
      view.setDivisionsCount(-100);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking undefined, returns undefined.', () => {
      view.setDivisionsCount(undefined);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking NaN, returns undefined.', () => {
      view.setDivisionsCount(NaN);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking false, returns undefined.', () => {
      view.setDivisionsCount(false);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking null, returns undefined.', () => {
      view.setDivisionsCount(null);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking {}, returns undefined.', () => {
      view.setDivisionsCount({});

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking [], returns undefined.', () => {
      view.setDivisionsCount([]);

      expect(view.divisionsBlockCount).toEqual(3);
    });

    it('Taking "dadaya", returns undefined.', () => {
      view.setDivisionsCount('dadaya');

      expect(view.divisionsBlockCount).toEqual(3);
    });
  });
});

describe('generateDivisionsBlock method.', () => {
  beforeAll(() => {
    view.setDivisionsCount(3);
  });

  it('Generate divisionsBlock for sliders.', () => {
    view.generateDivisionsBlock();

    expect(view.divisionsBlockList.length).toEqual(3);

    for (let i = 0; i < view.divisionsBlockList.length; i += 1) {
      expect(helper.isDOMEl(view.divisionsBlockList[i])).toBeTruthy();
      expect(view.divisionsBlockList[i].parentNode).toEqual(view.divisionsBlock);
    }
  });
});

describe('getDivisionsCount method.', () => {
  it('Returns count of divisionsBlock.', () => {
    const result = view.getDivisionsCount();

    expect(result).toEqual(view.divisionsCount);
  });
});

describe('setTheme method.', () => {
  describe('Changes sliders theme, returns theme.', () => {
    it('Taking "someTheme", returns "someTheme"', () => {
      const result = view.setTheme('someTheme');

      expect(result).toEqual('someTheme');
      expect(result).toEqual(view.theme.value);
    });

    it('Taking "someAnotherTheme", returns "someAnotherTheme"', () => {
      const result = view.setTheme('someAnotherTheme');

      expect(result).toEqual('someAnotherTheme');
      expect(result).toEqual(view.theme.value);
    });
  });

  describe('If you try to set theme as a not string, returns undefined.', () => {
    beforeEach(() => {
      view.setTheme('default');
    });

    it('Taking NaN, returns undefined', () => {
      const result = view.setTheme(NaN);

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking true, returns undefined', () => {
      const result = view.setTheme(true);

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking false, returns undefined', () => {
      const result = view.setTheme(false);

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking 123, returns undefined', () => {
      const result = view.setTheme(123);

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking {}, returns undefined', () => {
      const result = view.setTheme({});

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking undefined, returns undefined', () => {
      const result = view.setTheme(undefined);

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking null, returns undefined', () => {
      const result = view.setTheme(null);

      expect(result).toBeUndefined();
      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });
  });
});

describe('getTheme method.', () => {
  beforeAll(() => {
    view.setTheme('default');
  });

  it('Returns theme.', () => {
    const result = view.getTheme();

    expect(result).toEqual('default');
    expect(result).toEqual(view.theme.value);
  });
});

describe('setDirection method.', () => {
  describe('Normal values - reserved in direction constants (watch getDirection method). Changes sliders direction, returns {value: *direction*, constants: *list of reserved values*}.', () => {
    Object.keys(view.directionConstants).forEach((constant) => {
      it(`Taking ${view.directionConstants[constant]}, changes direction to ${constant}`, () => {
        const result = view.setDirection(view.directionConstants[constant]);

        expect(result.value).toEqual(view.directionConstants[constant]);
        expect(result.value).toEqual(view.direction.value);
        expect(result.constants).toEqual(view.directionConstants);
      });
    });
  });

  describe('If you try to set direction as a not string, returns undefined.', () => {
    beforeEach(() => {
      view.setDirection('horizontal');
    });

    it('Taking "SomeNotListed", returns undefined', () => {
      const result = view.setDirection('SomeNotListed');

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking NaN, returns undefined', () => {
      const result = view.setDirection(NaN);

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking true, returns undefined', () => {
      const result = view.setDirection(true);

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking false, returns undefined', () => {
      const result = view.setDirection(false);

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking 123, returns undefined', () => {
      const result = view.setDirection(123);

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking {}, returns undefined', () => {
      const result = view.setDirection({});

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking undefined, returns undefined', () => {
      const result = view.setDirection(undefined);

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking null, returns undefined', () => {
      const result = view.setDirection(null);

      expect(result).toBeUndefined();
      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });
  });
});

describe('getDirection method.', () => {
  beforeAll(() => {
    view.setDirection('horizontal');
  });

  it('Returns {value: *direction*, constants: *list of reserved values*}', () => {
    const result = view.getDirection();

    expect(result.value).toEqual('horizontal');
    expect(result.constants).toEqual(view.directionConstants);
  });
});

describe('applyStyles method.', () => {

  describe('Applying theme and direction to sliders elements.', function() {
    beforeEach(() => {
      view.setDirection('horizontal');
      view.setTheme('default');

      view.applyStyles();
    });
    
    it('Set theme to "default", direction to "horizontal".', () => {
      const els = [
        view.mainNode, view.outer,
        view.path, view.pathPassed,
        view.divisionsBlock, view.handle,
        view.handleMin, view.handleMax,
        view.valueNote, view.valueNoteMin,
        view.valueNoteMax,
      ].concat(view.divisionsBlockList);

      for (let i = 0; i < els.length; i += 1) {
        const el = els[i];

        expect(el).toHaveClass(`${el.classList[0]}_theme_default`);
        expect(el).toHaveClass(`${el.classList[0]}_direction_horizontal`);
      }
    });
  });

  describe('Removes old themes.', function() {
    beforeEach(() => {
      view.setDirection('vertical');
      view.setTheme('some');

      view.applyStyles();
    });

    it('Removes old themes.', () => {
      const els = [
        view.mainNode, view.outer,
        view.path, view.pathPassed,
        view.divisionsBlock, view.handle,
        view.handleMin, view.handleMax,
        view.valueNote, view.valueNoteMin,
        view.valueNoteMax,
      ].concat(view.divisionsBlockList);

      for (let i = 0; i < els.length; i += 1) {
        const el = els[i];
        expect(el).not.toHaveClass(`${el.classList[0]}_theme_default`);
        expect(el).not.toHaveClass(`${el.classList[0]}_direction_horizontal`);
      }
    });
  });
});

describe('setValueNoteDisplay method.', () => {
  describe('Changing display of value note, returns value of display.', () => {
    it('Taking true, returns true.', () => {
      view.setValueNoteDisplay(true);

      expect(view.valueNoteDisplay).toBeTruthy();
    });

    it('Taking false, returns false.', () => {
      view.setValueNoteDisplay(false);

      expect(view.valueNoteDisplay).toBeFalsy();
    });
  });

  describe('If you try to set display as a not boolean value, it returns undefined.', () => {
    beforeAll(() => {
      view.setValueNoteDisplay(true);
    });

    it('Taking "123", returns undefined.', () => {
      view.setValueNoteDisplay('123');

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking 123, returns undefined.', () => {
      view.setValueNoteDisplay(123);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking {}, returns undefined.', () => {
      view.setValueNoteDisplay({});

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking [], returns undefined.', () => {
      view.setValueNoteDisplay([]);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking undefined, returns undefined.', () => {
      view.setValueNoteDisplay(undefined);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking null, returns undefined.', () => {
      view.setValueNoteDisplay(null);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking NaN, returns undefined.', () => {
      view.setValueNoteDisplay(NaN);

      expect(view.valueNoteDisplay).toEqual(true);
    });
  });
});

describe('applyValueNoteDisplay method.', () => {
  describe('When display is true.', () => {
    beforeEach(() => {
      view.setValueNoteDisplay(true);
      view.applyValueNoteDisplay();
    });

    it('Applying display of value note, returns display.', () => {
      expect(view.valueNote).toHaveClass(`${view.valueNote.classList[0]}_display_visible`);
      expect(view.valueNoteMin).toHaveClass(`${view.valueNoteMin.classList[0]}_display_visible`);
      expect(view.valueNoteMax).toHaveClass(`${view.valueNoteMax.classList[0]}_display_visible`);
    });
  });

  describe('When display is false.', () => {
    beforeEach(() => {
      view.setValueNoteDisplay(false);
      view.applyValueNoteDisplay();
    });

    it('Applying display of value note, returns display.', () => {
      expect(view.valueNote).toHaveClass(`${view.valueNote.classList[0]}_display_hidden`);
      expect(view.valueNoteMin).toHaveClass(`${view.valueNoteMin.classList[0]}_display_hidden`);
      expect(view.valueNoteMax).toHaveClass(`${view.valueNoteMax.classList[0]}_display_hidden`);
    });
  });
});

describe('getValueNoteDisplay method.', () => {
  it('Returns display of value note.', () => {
    const result = view.getValueNoteDisplay();

    expect(result).toEqual(view.valueNoteDisplay);
  });
});
