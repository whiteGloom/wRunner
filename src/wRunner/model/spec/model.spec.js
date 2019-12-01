// Requirements
import helper from '@helper';
import ModelModule from '../model';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { window } = (new JSDOM('<body><div id="root"></div></body>', { runScripts: 'outside-only' }));
global.window = window;
global.document = window.document;

const model = new ModelModule();

// Getters

describe('getLimits method.', () => {
  it('Returns { minLimit: *minimum limit*, maxLimit: *maximum limit*, valuesCount: *count of integer values* }', () => {
    const result = model.getLimits();

    // The result is an object.
    expect(helper.isObject(result)).toBeTruthy();

    // The 'minLimit' property is an number.
    expect(helper.isNumber(result.minLimit)).toBeTruthy();
    // The 'minLimit' property is equal to model.minLimit.
    expect(result.minLimit).toEqual(model.limits.minLimit);

    // The 'maxLimit' property is an number.
    expect(helper.isNumber(result.maxLimit)).toBeTruthy();
    // The 'maxLimit' property is equal to model.minLimit.
    expect(result.maxLimit).toEqual(model.limits.maxLimit);

    // The 'valuesCount' property is an number.
    expect(helper.isNumber(result.valuesCount)).toBeTruthy();
    // The 'valuesCount' property is equal to: maxLimit - minLimit
    expect(result.valuesCount).toEqual(result.maxLimit - result.minLimit);
    // The 'valuesCount' property is equal to model.valuesCount.
    expect(result.valuesCount).toEqual(model.limits.valuesCount);
  });
});

describe('getValues method.', () => {
  it('Returns { value: *sliders value*, }', () => {
    model.setLimits({ minLimit: 0, maxLimit: 100 });
    const result = model.getValues();

    expect(helper.isObject(result)).toBeTruthy();

    expect(helper.isNumber(result.singleValue)).toBeTruthy();
    expect(helper.isNumber(result.rangeValueMin)).toBeTruthy();
    expect(helper.isNumber(result.rangeValueMax)).toBeTruthy();

    expect(result.singleValue).toEqual(model.values.singleValue);
    expect(result.rangeValueMin).toEqual(model.values.rangeValueMin);
    expect(result.rangeValueMax).toEqual(model.values.rangeValueMax);
  });
});

describe('getStep method.', () => {
  it('Returns sliders step size.', () => {
    const result = model.getStep();

    expect(helper.isNumber(result)).toBeTruthy();
  });
});

describe('getType method.', () => {
  it('Returns { value: *sliders type*, constants: *object - list of reserved type names* }.', () => {
    const result = model.getType();

    // The result is an object.
    expect(helper.isObject(result)).toBeTruthy();

    // The 'value' property is an string.
    expect(typeof result.value === 'string').toBeTruthy();
    expect(result.value).toEqual(model.type.value);

    // The 'typeConstants' property is an object.
    expect(helper.isObject(result.constants)).toBeTruthy();
    expect(result.constants).toEqual(model.type.constants);
  });
});


// Setters

describe('setLimits method.', () => {
  describe('Normal values.', () => {
    beforeEach(() => {
      model.limits.minLimit = 0;
      model.limits.maxLimit = 100;
    });

    it('Set a sliders limits. Taking { [minLimit]: *new minimum limit*, [maxLimit]: *new maximum limit* }. Returns { minLimit: *minimum limit*, maxLimit: *maximum limit*, valuesCount: *count of integer values* }', () => {
      model.setLimits({ minLimit: 20, maxLimit: 80 });

      expect(model.limits.minLimit).toEqual(20);

      expect(model.limits.maxLimit).toEqual(80);

      expect(model.limits.valuesCount).toEqual(60);
    });
  });

  describe('If you try to set limits, where maximum limit is less than minimum limit, it will swap them.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minLimit: 80, maxLimit: 20 }, swap it to { minLimit: 20, maxLimit: 80 }', () => {
      const result = model.setLimits({ minLimit: 80, maxLimit: 20 });

      expect(model.limits.minLimit).toEqual(20);

      expect(model.limits.maxLimit).toEqual(80);

      expect(model.limits.valuesCount).toEqual(60);
    });
  });

  describe('If you try to set limits, where maximum limit equal to minimum limit, it will increase maximum limit by one.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minLimit: 100, maxLimit: 100 }, changes limits to { minLimit: 100, maxLimit: 101 }', () => {
      const result = model.setLimits({ minLimit: 100, maxLimit: 100 });

      expect(model.limits.minLimit).toEqual(100);

      expect(model.limits.maxLimit).toEqual(101);

      expect(model.limits.valuesCount).toEqual(1);
    });
  });

  describe('If you try to set limits, where some property is not a number, it will take current value of this propertys by default.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minLimit: 20 }, changes only minimum limit. Maximum will stay the same.', () => {
      const result = model.setLimits({ minLimit: 20 });

      expect(model.limits.minLimit).toEqual(20);

      expect(model.limits.maxLimit).toEqual(100);

      expect(model.limits.valuesCount).toEqual(80);
    });
  });
});

describe('setSingleValue method.', () => {
  describe('Normal value.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('single');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking 50, changing single value to 50. Returns { value: *value* }', () => {
      model.setSingleValue(50);

      expect(model.values.singleValue).toEqual(50);
    });

    it('Taking 75, changing single value to 75. Returns { value: *value* }', () => {
      model.setSingleValue(75);

      expect(model.values.singleValue).toEqual(75);
    });
  });

  describe('If you try to set value out of limits range, value will equated to nearest limit.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('single');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking 110, changing value to 100. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setSingleValue(110);

      expect(model.values.singleValue).toEqual(100);
    });

    it('Taking -10, changing value to 0. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setSingleValue(-10);

      expect(model.values.singleValue).toEqual(0);
    });
  });

  describe('If you try to set sliders value by a not numeric value, it will take a current sliders value.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setSingleValue(50);
      model.setType('single');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking null, value will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setSingleValue(null);

      expect(model.values.singleValue).toEqual(50);
    });

    it('Taking "dadaya", value will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setSingleValue('dadaya');

      expect(model.values.singleValue).toEqual(50);
    });
  });

  describe('The value is set according to sliders step.', () => {
    beforeEach(() => {
      model.setStep(3);
      model.setLimits({ minLimit: -100, maxLimit: 100 }, true);
      model.setSingleValue(50, true);
    });

    it('Taking 10, when step is equeal to 3, changes value to 9.', () => {
      model.setSingleValue(10);

      expect(model.values.singleValue).toEqual(9);
    });

    it('Taking -10, when step is equeal to 3, changes value to -9.', () => {
      model.setSingleValue(-10);

      expect(model.values.singleValue).toEqual(-9);
    });
  });
});

describe('setRangeValue method.', () => {
  describe('Normal value.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minValue: 10, maxValue: 90 }, changing minimum value to 10, maximum value to 90. Returns { minValue: *minimum value*, maxValue: *maximum value*, selected: *percent of selected values* }', () => {
      model.setRangeValues({ minValue: 10, maxValue: 90 });

      expect(model.values.rangeValueMin).toEqual(10);

      expect(model.values.rangeValueMax).toEqual(90);
    });
  });

  describe('If you try to set value out of limits range, it will set it to nearest limit.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minValue: -10, maxValue: 110 }, changes minimum value to 0, maximum value to 100. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setRangeValues({ minValue: -10, maxValue: 110 });

      expect(model.values.rangeValueMin).toEqual(0);

      expect(model.values.rangeValueMax).toEqual(100);
    });
  });

  describe('If you try to set sliders value by a not numeric value, it will take a current sliders value.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });
    beforeEach(() => {
      model.setRangeValues({ minValue: 20, maxValue: 80 });
    });

    it('Taking { maxValue: 60 }, changes maximum value to 60, minimum value will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setRangeValues({ maxValue: 60 });

      expect(model.values.rangeValueMax).toEqual(60);
    });

    it('Taking { minValue: null, maxValue: null }, values will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setRangeValues({ minValue: null, maxValue: null });

      expect(model.values.rangeValueMin).toEqual(20);

      expect(model.values.rangeValueMax).toEqual(80);
    });

    it('Taking null, values will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      model.setRangeValues(null);

      expect(model.values.rangeValueMin).toEqual(20);

      expect(model.values.rangeValueMax).toEqual(80);
    });
  });

  describe('The value is set according to sliders step.', () => {
    beforeEach(() => {
      model.setStep(3);
      model.setLimits({ minLimit: -100, maxLimit: 100 }, true);
      model.setRangeValues({ minValue: -50, maxValue: 50 }, true);
    });

    it('Taking { minValue: -10, maxValue: 10 }, when step is equeal to 3, changes minimum value to -9, maximum value to 9.', () => {
      model.setRangeValues({ minValue: -10, maxValue: 10 });

      expect(model.values.rangeValueMin).toEqual(-9);

      expect(model.values.rangeValueMax).toEqual(9);
    });
  });
});

describe('setNearestValue', () => {
  describe('When sliders type is "single".', () => {
    beforeAll(() => {
      model.setType('single');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
      model.setStep(1);
    });

    beforeEach(() => {
      model.setSingleValue(50);
    });

    it('Taking 75 and true (change via percents), changes value to 75%.', () => {
      spyOn(model, 'setSingleValue').and.callThrough();

      model.setNearestValue(75);

      expect(model.setSingleValue).toHaveBeenCalled();
      expect(model.values.singleValue).toEqual(model.limits.valuesCount * 0.75);
    });

    it('Taking 23, changes value to 23', () => {
      spyOn(model, 'setSingleValue').and.callThrough();

      model.setNearestValue(23);

      expect(model.setSingleValue).toHaveBeenCalled();
      expect(model.values.singleValue).toEqual(23);
    });
  });

  describe('When sliders type is "range".', () => {
    beforeAll(() => {
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
      model.setStep(1);
    });

    beforeEach(() => {
      model.setRangeValues({ minValue: 20, maxValue: 80 });
    });

    it('Taking 30 and true (change via percents), changes minimum value to 30%.', () => {
      spyOn(model, 'setRangeValues').and.callThrough();

      model.setNearestValue(30, true);

      expect(model.setRangeValues).toHaveBeenCalled();
      expect(model.values.rangeValueMin).toEqual(model.limits.valuesCount * 0.3);
    });

    it('Taking 90 and true (change via percents), changes minimum value to 90%.', () => {
      spyOn(model, 'setRangeValues').and.callThrough();

      model.setNearestValue(90, true);

      expect(model.setRangeValues).toHaveBeenCalled();
      expect(model.values.rangeValueMax).toEqual(model.limits.valuesCount * 0.9);
    });

    it('Taking 11 and true (change via percents), changes minimum value to 11.', () => {
      spyOn(model, 'setRangeValues').and.callThrough();

      model.setNearestValue(11);

      expect(model.setRangeValues).toHaveBeenCalled();
      expect(model.values.rangeValueMin).toEqual(11);
    });

    it('Taking 77 and true (change via percents), changes minimum value to 77.', () => {
      spyOn(model, 'setRangeValues').and.callThrough();

      model.setNearestValue(77);

      expect(model.setRangeValues).toHaveBeenCalled();
      expect(model.values.rangeValueMax).toEqual(77);
    });
  });
});

describe('setStep method.', () => {
  describe('Normal values.', () => {
    it('Taking 5, changes sliders step to 5. Returns step.', () => {
      model.setStep(5);

      expect(model.step).toEqual(5);
    });
  });

  describe('If you try to set step as a value, that is less than 1, it will return undefined.', () => {
    beforeEach(() => {
      model.setStep(1);
    });

    it('Taking 0, returns undefined.', () => {
      model.setStep(0);

      expect(model.step).toEqual(1);
    });

    it('Taking -100, returns undefined.', () => {
      model.setStep(-100);

      expect(model.step).toEqual(1);
    });
  });

  describe('If you try to set step as a not numeric value, it will return undefined.', () => {
    beforeEach(() => {
      model.setStep(1);
    });

    it('Taking NaN, returns undefined.', () => {
      model.setStep(NaN);

      expect(model.step).toEqual(1);
    });

    it('Taking "dadaya", returns undefined.', () => {
      const result = model.setStep('dadaya');
      expect(result).toBeUndefined();

      expect(model.step).toEqual(1);
    });
  });
});

describe('setType method.', () => {
  describe('Normal values - if value is listed in typeConstants. Changes sliders type, returns {type: **type**, constants: **list of reserved types**}.', () => {
    Object.keys(model.getType().constants).forEach((constant) => {
      it(`Taking ${model.getType().constants[constant]}, changes type to ${model.getType().constants[constant]}`, () => {
        model.setType(model.type.constants[constant]);

        expect(model.type.value).toEqual(model.type.constants[constant]);
      });
    });
  });

  describe('If you try to set type by value, that is not listed in typeConstants, it will return undefined.', () => {
    beforeEach(() => {
      model.setType('single');
    });

    it('Taking "royal", return undefined.', () => {
      model.setType('royal');

      // The type stays the same.
      expect(model.type.value).toEqual('single');
    });
  });
});
