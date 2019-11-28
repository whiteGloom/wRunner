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

      setTimeout(() => {
        expect(view.path.parentNode === view.outer).toBeTruthy();
        expect(view.pathPassed.parentNode === view.path).toBeTruthy();
        expect(view.divisionsBlock.parentNode === view.outer).toBeTruthy();

        expect(view.handle.parentNode === view.path);
        expect(view.valueNote.parentNode === view.outer);
      }, 1);
    });
  });

  describe('When type is "range".', () => {
    it('Rebuild plugin structure.', () => {
      view.updateDOM({ value: 'range', typeConstants: { singleValue: 'single', rangeValue: 'range' } });

      setTimeout(() => {
        expect(view.path.parentNode === view.outer).toBeTruthy();
        expect(view.pathPassed.parentNode === view.path).toBeTruthy();
        expect(view.divisionsBlock.parentNode === view.outer).toBeTruthy();

        expect(view.handleMin.parentNode === view.path).toBeTruthy();
        expect(view.handleMax.parentNode === view.path).toBeTruthy();
        expect(view.valueNoteMin.parentNode === view.outer).toBeTruthy();
        expect(view.valueNoteMax.parentNode === view.outer).toBeTruthy();
        expect(view.valueNoteCommon.parentNode === view.outer).toBeTruthy();
      }, 1);
    });
  });
});

describe('append method.', () => {
  it('Applying sliders roots.', () => {
    view.append();

    setTimeout(() => {
      expect(view.mainNode.parentNode === view.roots).toBeTruthy();
    }, 1);
  });
});

describe('setRoots method.', () => {
  describe('Normal value - DOM el.', () => {
    it('Chaning roots, returns roots.', () => {
      view.setRoots(document.getElementById('root'));

      expect(view.roots).toEqual(document.getElementById('root'));
    });
  });

  describe('If you try to set roots as a not DOM el, returns.', () => {
    beforeEach(() => {
      view.setRoots(document.body);
    });

    it('Taking NaN.', () => {
      view.setRoots(NaN);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking {}.', () => {
      view.setRoots({});

      expect(view.roots).toEqual(document.body);
    });

    it('Taking 123.', () => {
      view.setRoots(123);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking null.', () => {
      view.setRoots(null);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking undefined.', () => {
      view.setRoots(undefined);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking false.', () => {
      view.setRoots(false);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking true.', () => {
      view.setRoots(true);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking [].', () => {
      view.setRoots([]);

      expect(view.roots).toEqual(document.body);
    });

    it('Taking "dadaya".', () => {
      view.setRoots('dadaya');

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
  describe('Changing divisionsBlock count.', () => {
    it('Taking 3, returns 3.', () => {
      view.setDivisionsCount(3);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking 2, returns 2.', () => {
      view.setDivisionsCount(2);

      expect(view.divisionsCount).toEqual(2);
    });

    it('Taking 0, returns 0.', () => {
      view.setDivisionsCount(0);

      expect(view.divisionsCount).toEqual(0);
    });
  });

  describe('If you try to set divisionsBlock count as 1, it will set divisionsBlock count to 2.', () => {
    it('Taking 1, changing divisionsBlock count to 2.', () => {
      view.setDivisionsCount(1);

      expect(view.divisionsCount).toEqual(2);
    });
  });

  describe('If you try to set divisionsBlock count as not a number or a number, that is less than 0, returns.', () => {
    beforeEach(() => {
      view.setDivisionsCount(3);
    });

    it('Taking -1.', () => {
      view.setDivisionsCount(-1);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking -100.', () => {
      view.setDivisionsCount(-100);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking -100.', () => {
      view.setDivisionsCount(-100);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking undefined.', () => {
      view.setDivisionsCount(undefined);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking NaN.', () => {
      view.setDivisionsCount(NaN);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking false.', () => {
      view.setDivisionsCount(false);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking null.', () => {
      view.setDivisionsCount(null);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking {}.', () => {
      view.setDivisionsCount({});

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking [].', () => {
      view.setDivisionsCount([]);

      expect(view.divisionsCount).toEqual(3);
    });

    it('Taking "dadaya".', () => {
      view.setDivisionsCount('dadaya');

      expect(view.divisionsCount).toEqual(3);
    });
  });
});

describe('generateDivisions method.', () => {
  beforeAll(() => {
    view.setDivisionsCount(3);
  });

  it('Generate divisionsBlock for sliders.', () => {
    view.generateDivisions();

    expect(view.divisionsList.length).toEqual(3);

    for (let i = 0; i < view.divisionsList.length; i += 1) {
      expect(helper.isDOMEl(view.divisionsList[i])).toBeTruthy();
      expect(view.divisionsList[i].parentNode).toEqual(view.divisionsBlock);
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
  describe('Changes sliders theme.', () => {
    it('Taking "someTheme".', () => {
      view.setTheme('someTheme');

      expect(view.theme.value).toEqual('someTheme');
    });

    it('Taking "someAnotherTheme".', () => {
      view.setTheme('someAnotherTheme');

      expect(view.theme.value).toEqual('someAnotherTheme');
    });
  });

  describe('If you try to set theme as a not string, returns.', () => {
    beforeEach(() => {
      view.setTheme('default');
    });

    it('Taking NaN.', () => {
      view.setTheme(NaN);

      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking true.', () => {
      view.setTheme(true);

      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking false.', () => {
      view.setTheme(false);

      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking 123.', () => {
      view.setTheme(123);

      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking {}.', () => {
      view.setTheme({});

      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking undefined.', () => {
      view.setTheme(undefined);

      // Theme stays the same.
      expect(view.theme.value).toEqual('default');
    });

    it('Taking null.', () => {
      view.setTheme(null);

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
  describe('Normal values - reserved in direction constants (watch getDirection method). Changes sliders direction.', () => {
    Object.keys(view.directionConstants).forEach((constant) => {
      it(`Taking ${view.directionConstants[constant]}, changes direction to ${constant}`, () => {
        view.setDirection(view.directionConstants[constant]);

        expect(view.direction.value).toEqual(view.directionConstants[constant]);
      });
    });
  });

  describe('If you try to set direction as a not string, returns.', () => {
    beforeEach(() => {
      view.setDirection('horizontal');
    });

    it('Taking "SomeNotListed".', () => {
      view.setDirection('SomeNotListed');

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking NaN.', () => {
      view.setDirection(NaN);

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking true.', () => {
      view.setDirection(true);

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking false.', () => {
      view.setDirection(false);

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking 123.', () => {
      view.setDirection(123);

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking {}.', () => {
      view.setDirection({});

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking undefined.', () => {
      view.setDirection(undefined);

      // Direction stays the same.
      expect(view.direction.value).toEqual('horizontal');
    });

    it('Taking null.', () => {
      view.setDirection(null);

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
  describe('Applying theme and direction to sliders elements.', () => {
    it('Set theme to "default", direction to "horizontal".', () => {
      view.setDirection('horizontal');
      view.setTheme('default');

      view.applyStyles();
      const els = [
        view.mainNode, view.outer,
        view.path, view.pathPassed,
        view.divisionsBlock, view.handle,
        view.handleMin, view.handleMax,
        view.valueNote, view.valueNoteMin,
        view.valueNoteMax,
      ].concat(view.divisionsList);

      setTimeout(() => {
        for (let i = 0; i < els.length; i += 1) {
          const el = els[i];

          expect(el).toHaveClass(`${el.classList[0]}_theme_default`);
          expect(el).toHaveClass(`${el.classList[0]}_direction_horizontal`);
        }
      }, 1);
    });
  });

  describe('Removes old themes.', () => {
    it('Removes old themes.', () => {
      view.setDirection('vertical');
      view.setTheme('some');

      view.applyStyles();
      const els = [
        view.mainNode, view.outer,
        view.path, view.pathPassed,
        view.divisionsBlock, view.handle,
        view.handleMin, view.handleMax,
        view.valueNote, view.valueNoteMin,
        view.valueNoteMax,
      ].concat(view.divisionsList);

      setTimeout(() => {
        for (let i = 0; i < els.length; i += 1) {
          const el = els[i];
          expect(el).not.toHaveClass(`${el.classList[0]}_theme_default`);
          expect(el).not.toHaveClass(`${el.classList[0]}_direction_horizontal`);
        }
      }, 1);
    });
  });
});

describe('setValueNoteDisplay method.', () => {
  describe('Changing display of value note.', () => {
    it('Taking true.', () => {
      view.setValueNoteDisplay(true);

      expect(view.valueNoteDisplay).toBeTruthy();
    });

    it('Taking false.', () => {
      view.setValueNoteDisplay(false);

      expect(view.valueNoteDisplay).toBeFalsy();
    });
  });

  describe('If you try to set display as a not boolean value, returns.', () => {
    beforeAll(() => {
      view.setValueNoteDisplay(true);
    });

    it('Taking "123".', () => {
      view.setValueNoteDisplay('123');

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking 123.', () => {
      view.setValueNoteDisplay(123);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking {}.', () => {
      view.setValueNoteDisplay({});

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking [].', () => {
      view.setValueNoteDisplay([]);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking undefined.', () => {
      view.setValueNoteDisplay(undefined);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking null.', () => {
      view.setValueNoteDisplay(null);

      expect(view.valueNoteDisplay).toEqual(true);
    });

    it('Taking NaN.', () => {
      view.setValueNoteDisplay(NaN);

      expect(view.valueNoteDisplay).toEqual(true);
    });
  });
});

describe('applyValueNoteDisplay method.', () => {
  describe('When display is true.', () => {
    it('Applying display of value note.', () => {
      view.setValueNoteDisplay(true);
      view.applyValueNoteDisplay();
      setTimeout(() => {
        expect(view.valueNote).toHaveClass(`${view.valueNote.classList[0]}_display_visible`);
        expect(view.valueNoteMin).toHaveClass(`${view.valueNoteMin.classList[0]}_display_visible`);
        expect(view.valueNoteMax).toHaveClass(`${view.valueNoteMax.classList[0]}_display_visible`);
      }, 25);
    });
  });

  describe('When display is false.', () => {
    it('Applying display of value note.', () => {
      view.setValueNoteDisplay(false);
      view.applyValueNoteDisplay();
      setTimeout(() => {
        expect(view.valueNote).toHaveClass(`${view.valueNote.classList[0]}_display_hidden`);
        expect(view.valueNoteMin).toHaveClass(`${view.valueNoteMin.classList[0]}_display_hidden`);
        expect(view.valueNoteMax).toHaveClass(`${view.valueNoteMax.classList[0]}_display_hidden`);
      }, 25);
    });
  });
});

describe('getValueNoteDisplay method.', () => {
  it('Returns display of value note.', () => {
    const result = view.getValueNoteDisplay();

    expect(result).toEqual(view.valueNoteDisplay);
  });
});
