// Requirements
import Helper from '@Helper';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"><div class="cls">text node</div></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;


describe('inNumber method.', () => {
  describe('If the value is a finite number or a string, that may be turned into a number, returns true.', () => {
    it('Taking 50, returns true', () => {
      expect(Helper.isNumber(50)).toBeTruthy();
    });

    it('Taking -100, returns true', () => {
      expect(Helper.isNumber(50)).toBeTruthy();
    });

    it('Taking 0, returns true', () => {
      expect(Helper.isNumber(0)).toBeTruthy();
    });

    it('Taking "100", returns true', () => {
      expect(Helper.isNumber('100')).toBeTruthy();
    });

    it('Taking "0", returns true', () => {
      expect(Helper.isNumber('0')).toBeTruthy();
    });
  });

  describe('If the value is not a finite number or a string, that may be turned into a number, returns false.', () => {
    it('Taking NaN, returns false.', () => {
      expect(Helper.isNumber(NaN)).toBeFalsy();
    });

    it('Taking {}, returns false.', () => {
      expect(Helper.isNumber({})).toBeFalsy();
    });

    it('Taking [], returns false.', () => {
      expect(Helper.isNumber([])).toBeFalsy();
    });

    it('Taking true, returns false.', () => {
      expect(Helper.isNumber(true)).toBeFalsy();
    });

    it('Taking false, returns false.', () => {
      expect(Helper.isNumber(false)).toBeFalsy();
    });

    it('Taking "dadaya", returns false.', () => {
      expect(Helper.isNumber('dadaya')).toBeFalsy();
    });

    it('Taking "da123", returns false.', () => {
      expect(Helper.isNumber('da123')).toBeFalsy();
    });

    it('Taking undefined, returns false.', () => {
      expect(Helper.isNumber(undefined)).toBeFalsy();
    });

    it('Taking Infinity, returns false.', () => {
      expect(Helper.isNumber(Infinity)).toBeFalsy();
    });

    it('Taking null, returns true.', () => {
      expect(Helper.isDOMEl(null)).toBeFalsy();
    });
  });
});

describe('toNumber method.', () => {
  describe('If the value is a finite number or a string, that may be turned into a number, returns value turned into a number.', () => {
    it('Taking 50, returns true', () => {
      expect(Helper.toNumber(50)).toEqual(50);
    });

    it('Taking -100, returns true', () => {
      expect(Helper.toNumber(50)).toEqual(50);
    });

    it('Taking 0, returns true', () => {
      expect(Helper.toNumber(0)).toEqual(0);
    });

    it('Taking "100", returns true', () => {
      expect(Helper.toNumber('100')).toEqual(100);
    });

    it('Taking "0", returns true', () => {
      expect(Helper.toNumber('0')).toEqual(0);
    });
  });

  describe('If the value is not a finite number or a string, that may be turned into a number, returns false.', () => {
    it('Taking NaN, returns false.', () => {
      expect(Helper.toNumber(NaN)).toBeFalsy();
    });

    it('Taking {}, returns false.', () => {
      expect(Helper.toNumber({})).toBeFalsy();
    });

    it('Taking [], returns false.', () => {
      expect(Helper.toNumber([])).toBeFalsy();
    });

    it('Taking true, returns false.', () => {
      expect(Helper.toNumber(true)).toBeFalsy();
    });

    it('Taking false, returns false.', () => {
      expect(Helper.toNumber(false)).toBeFalsy();
    });

    it('Taking "dadaya", returns false.', () => {
      expect(Helper.toNumber('dadaya')).toBeFalsy();
    });

    it('Taking "da123", returns false.', () => {
      expect(Helper.toNumber('da123')).toBeFalsy();
    });

    it('Taking undefined, returns false.', () => {
      expect(Helper.toNumber(undefined)).toBeFalsy();
    });

    it('Taking Infinity, returns false.', () => {
      expect(Helper.toNumber(Infinity)).toBeFalsy();
    });

    it('Taking null, returns true.', () => {
      expect(Helper.isDOMEl(null)).toBeFalsy();
    });
  });
});

describe('isObject method.', () => {
  describe('If type of value is a object and it is not a null, returns true.', () => {
    it('Taking {}, returns true.', () => {
      expect(Helper.isObject({})).toBeTruthy();
    });

    it('Taking [], returns true.', () => {
      expect(Helper.isObject([])).toBeTruthy();
    });
  });

  describe('If type of value is not a object and it is a null, returns false.', () => {
    it('Taking null, returns false.', () => {
      expect(Helper.isObject(null)).toBeFalsy();
    });

    it('Taking "dadaya", returns false.', () => {
      expect(Helper.isObject('dadaya')).toBeFalsy();
    });

    it('Taking "123", returns false.', () => {
      expect(Helper.isObject('123')).toBeFalsy();
    });

    it('Taking 123, returns false.', () => {
      expect(Helper.isObject(123)).toBeFalsy();
    });

    it('Taking undefined, returns false.', () => {
      expect(Helper.isObject(undefined)).toBeFalsy();
    });

    it('Taking NaN, returns false.', () => {
      expect(Helper.isObject(NaN)).toBeFalsy();
    });

    it('Taking false, returns false.', () => {
      expect(Helper.isObject(false)).toBeFalsy();
    });

    it('Taking true, returns false.', () => {
      expect(Helper.isObject(true)).toBeFalsy();
    });

    it('Taking null, returns true.', () => {
      expect(Helper.isDOMEl(null)).toBeFalsy();
    });
  });
});

describe('isDOMEl method.', () => {
  describe('If element is a dom element, returns true.', () => {
    it('Taking document.body, returns true.', () => {
      expect(Helper.isDOMEl(document.body)).toBeTruthy();
    });

    it('Taking document.getElementById("root"), returns true.', () => {
      expect(Helper.isDOMEl(document.getElementById('root'))).toBeTruthy();
    });
  });

  describe('If element is not a dom element, returns false.', () => {
    it('Taking {}, returns true.', () => {
      expect(Helper.isDOMEl({})).toBeFalsy();
    });

    it('Taking { nodeType: 1 }, returns true.', () => {
      expect(Helper.isDOMEl({ nodeType: 1 })).toBeFalsy();
    });

    it('Taking [], returns true.', () => {
      expect(Helper.isDOMEl([])).toBeFalsy();
    });

    it('Taking "dadaya", returns true.', () => {
      expect(Helper.isDOMEl('dadaya')).toBeFalsy();
    });

    it('Taking "123", returns true.', () => {
      expect(Helper.isDOMEl('123')).toBeFalsy();
    });

    it('Taking 123, returns true.', () => {
      expect(Helper.isDOMEl(123)).toBeFalsy();
    });

    it('Taking false, returns true.', () => {
      expect(Helper.isDOMEl(false)).toBeFalsy();
    });

    it('Taking true, returns true.', () => {
      expect(Helper.isDOMEl(true)).toBeFalsy();
    });

    it('Taking undefined, returns true.', () => {
      expect(Helper.isDOMEl(undefined)).toBeFalsy();
    });

    it('Taking NaN, returns true.', () => {
      expect(Helper.isDOMEl(NaN)).toBeFalsy();
    });

    it('Taking null, returns true.', () => {
      expect(Helper.isDOMEl(null)).toBeFalsy();
    });
  });
});
