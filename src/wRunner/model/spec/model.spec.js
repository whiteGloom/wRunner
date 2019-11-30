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
    expect(result.minLimit).toEqual(model.minLimit);

    // The 'maxLimit' property is an number.
    expect(helper.isNumber(result.maxLimit)).toBeTruthy();
    // The 'maxLimit' property is equal to model.minLimit.
    expect(result.maxLimit).toEqual(model.maxLimit);

    // The 'valuesCount' property is an number.
    expect(helper.isNumber(result.valuesCount)).toBeTruthy();
    // The 'valuesCount' property is equal to: maxLimit - minLimit
    expect(result.valuesCount).toEqual(result.maxLimit - result.minLimit);
    // The 'valuesCount' property is equal to model.valuesCount.
    expect(result.valuesCount).toEqual(model.valuesCount);
  });
});

describe('getValue method.', () => {
  describe('When sliders type is "single".', () => {
    beforeAll(() => {
      model.setType('single');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Returns { value: *sliders value*, selected: *percent of selected values* }', () => {
      const result = model.getValue();

      // the result is an object.
      expect(helper.isObject(result)).toBeTruthy();

      // The 'value' property is an number.
      expect(helper.isNumber(result.value)).toBeTruthy();
      // The 'value' property is equal to model.singleValue.
      expect(result.value).toEqual(model.singleValue);

      // The 'selected' property is equal to property 'value'.
      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      // The 'selected' property is equal to model.selected.
      expect(result.selected).toEqual(model.singleSelected);
    });
  });

  describe('When sliders type is "range".', () => {
    beforeAll(() => {
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Returns { minValue: *sliders minimum value*, maxValue: *sliders maximum value*, selected: *percent of selected values* }', () => {
      const result = model.getValue();

      // the result is an object.
      expect(helper.isObject(result)).toBeTruthy();

      // The 'minValue' property is an number.
      expect(helper.isNumber(result.minValue)).toBeTruthy();
      // The 'minValue' property is equal to model.minValue.
      expect(result.minValue).toEqual(model.rangeValueMin);

      // The 'maxValue' property is an number.
      expect(helper.isNumber(result.maxValue)).toBeTruthy();
      // The 'maxValue' property is equal to model.maxValue.
      expect(result.maxValue).toEqual(model.rangeValueMax);

      // The 'selected' property is equal to: maxValue - minValue.
      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      // The 'selected' property is equal to model.selected.
      expect(result.selected).toEqual(model.rangeSelected);
    });
  });
});

describe('getStep method.', () => {
  it('Returns sliders step size.', () => {
    const result = model.getStep();

    // The result is an number.
    expect(helper.isNumber(result)).toBeTruthy();
  });
});

describe('getType method.', () => {
  it('Returns { value: *sliders type*, typeConstants: *object - list of reserved type names* }.', () => {
    const result = model.getType();

    // The result is an object.
    expect(helper.isObject(result)).toBeTruthy();

    // The 'value' property is an string.
    expect(typeof result.value === 'string').toBeTruthy();
    expect(result.value).toEqual(model.type);

    // The 'typeConstants' property is an object.
    expect(helper.isObject(result.constants)).toBeTruthy();
    expect(result.constants).toEqual(model.typeConstants);
  });
});


// Setters

describe('setLimits method.', () => {
  describe('Normal values.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Set a sliders limits. Taking { [minLimit]: *new minimum limit*, [maxLimit]: *new maximum limit* }. Returns { minLimit: *minimum limit*, maxLimit: *maximum limit*, valuesCount: *count of integer values* }', () => {
      const result = model.setLimits({ minLimit: 20, maxLimit: 80 });

      expect(result.minLimit).toEqual(20);
      // The 'minLimit' property is equal to model.minLimit.
      expect(result.minLimit).toEqual(model.minLimit);

      expect(result.maxLimit).toBeTruthy(80);
      // The 'maxLimit' property is equal to model.maxLimit.
      expect(result.maxLimit).toEqual(model.maxLimit);

      expect(result.valuesCount).toEqual(80 - 20);
      // The 'valuesCount' property is equal to model.valuesCount.
      expect(result.valuesCount).toEqual(model.valuesCount);
    });
  });

  describe('If you try to set limits, where maximum limit is less than minimum limit, it will swap them.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minLimit: 80, maxLimit: 20 }, swap it to { minLimit: 20, maxLimit: 80 }', () => {
      const result = model.setLimits({ minLimit: 80, maxLimit: 20 }, true);

      // The limits was swapped.
      expect(result.minLimit).toEqual(20);
      expect(result.minLimit).toEqual(model.minLimit);

      expect(result.maxLimit).toEqual(80);
      expect(result.maxLimit).toEqual(model.maxLimit);

      expect(result.valuesCount).toEqual(80 - 20);
      expect(result.valuesCount).toEqual(model.valuesCount);
    });
  });

  describe('If you try to set limits, where maximum limit equal to minimum limit, it will increase maximum limit by one.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minLimit: 100, maxLimit: 100 }, changes limits to { minLimit: 100, maxLimit: 101 }', () => {
      const result = model.setLimits({ minLimit: 100, maxLimit: 100 }, true);

      // The limits was swapped.
      expect(result.minLimit).toEqual(100);
      expect(result.minLimit).toEqual(model.minLimit);

      expect(result.maxLimit).toEqual(101);
      expect(result.maxLimit).toEqual(model.maxLimit);

      expect(result.valuesCount).toEqual(101 - 100);
      expect(result.valuesCount).toEqual(model.valuesCount);
    });
  });

  describe('If you try to set limits, where some property is not a number, it will take current value of this propertys by default.', () => {
    beforeEach(() => {
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minLimit: 20 }, changes only minimum limit. Maximum will stay the same.', () => {
      const result = model.setLimits({ minLimit: 20 }, true);

      // Minimum limit was changed.
      expect(result.minLimit).toEqual(20);
      expect(result.minLimit).toEqual(model.minLimit);

      // Maximum limit was not changed.
      expect(result.maxLimit).toEqual(100);
      expect(result.maxLimit).toEqual(model.maxLimit);

      // Values count was not changed.
      expect(result.valuesCount).toEqual(100 - 20);
      expect(result.valuesCount).toEqual(model.valuesCount);
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

    it('Taking 50, changing single value to 50. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setSingleValue(50, true);

      expect(result.value).toEqual(50);
      expect(result.value).toEqual(model.singleValue);

      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
    });

    it('Taking 50, changing single value to 75. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setSingleValue(75, true);

      expect(result.value).toEqual(75);
      expect(result.value).toEqual(model.singleValue);

      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
    });
  });

  describe('If you try to set value out of limits range, value will equated to nearest limit.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('single');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking 110, changing value to 100. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setSingleValue(110, true);

      // Value was equated to a highest limit.
      expect(result.value).toEqual(100);
      expect(result.value).toEqual(model.singleValue);

      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
    });

    it('Taking -10, changing value to 0. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setSingleValue(-10, true);

      // Value was equated to a highest limit.
      expect(result.value).toEqual(0);
      expect(result.value).toEqual(model.singleValue);

      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
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
      const result = model.setSingleValue(null, true);

      // Value stays the same.
      expect(result.value).toEqual(50);
      expect(result.value).toEqual(model.singleValue);

      // Selected values stays the same.
      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
    });

    it('Taking "dadaya", value will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setSingleValue('dadaya', true);

      // Value stays the same.
      expect(result.value).toEqual(50);
      expect(result.value).toEqual(model.singleValue);

      // Selected values stays the same.
      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
    });
  });

  describe('The value is set according to sliders step.', () => {
    beforeEach(() => {
      model.setStep(3);
      model.setLimits({ minLimit: -100, maxLimit: 100 }, true);
      model.setSingleValue(50, true);
    });

    it('Taking 10, when step is equeal to 3, changes value to 9.', () => {
      const result = model.setSingleValue(10);

      expect(result.value).toEqual(9);
      expect(result.value).toEqual(model.singleValue);

      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
    });

    it('Taking -10, when step is equeal to 3, changes value to -9.', () => {
      const result = model.setSingleValue(-10);

      expect(result.value).toEqual(-9);
      expect(result.value).toEqual(model.singleValue);

      expect(result.selected)
        .toEqual(((model.singleValue - model.minLimit) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.singleSelected);
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
      const result = model.setRangeValue({ minValue: 10, maxValue: 90 }, true);

      expect(result.minValue).toEqual(10);
      expect(result.minValue).toEqual(model.rangeValueMin);

      expect(result.maxValue).toEqual(90);
      expect(result.maxValue).toEqual(model.rangeValueMax);

      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.rangeSelected);
    });
  });

  describe('If you try to set value out of limits range, it will set it to nearest limit.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });

    it('Taking { minValue: -10, maxValue: 110 }, changes minimum value to 0, maximum value to 100. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setRangeValue({ minValue: -10, maxValue: 110 }, true);

      expect(result.minValue).toEqual(0);
      expect(result.minValue).toEqual(model.rangeValueMin);

      expect(result.maxValue).toEqual(100);
      expect(result.maxValue).toEqual(model.rangeValueMax);

      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.rangeSelected);
    });
  });

  describe('If you try to set sliders value by a not numeric value, it will take a current sliders value.', () => {
    beforeAll(() => {
      model.setStep(1);
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
    });
    beforeEach(() => {
      model.setRangeValue({ minValue: 20, maxValue: 80 }, true);
    });

    it('Taking { maxValue: 60 }, changes maximum value to 60, minimum value will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setRangeValue({ maxValue: 60 }, true);

      // Minimum value stays the same.
      expect(result.minValue).toEqual(20);
      expect(result.minValue).toEqual(model.rangeValueMin);

      // Maximum value was changed.
      expect(result.maxValue).toEqual(60);
      expect(result.maxValue).toEqual(model.rangeValueMax);

      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.rangeSelected);
    });

    it('Taking { minValue: null, maxValue: null }, values will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setRangeValue({ minValue: null, maxValue: null }, true);

      // Values stays the same.
      expect(result.minValue).toEqual(20);
      expect(result.minValue).toEqual(model.rangeValueMin);

      expect(result.maxValue).toEqual(80);
      expect(result.maxValue).toEqual(model.rangeValueMax);

      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.rangeSelected);
    });

    it('Taking null, values will stay the same. Returns { value: *value*, selected: *percent of selected values* }', () => {
      const result = model.setRangeValue(null, true);

      // Values stays the same.
      expect(result.minValue).toEqual(20);
      expect(result.minValue).toEqual(model.rangeValueMin);

      expect(result.maxValue).toEqual(80);
      expect(result.maxValue).toEqual(model.rangeValueMax);

      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.rangeSelected);
    });
  });

  describe('The value is set according to sliders step.', () => {
    beforeEach(() => {
      model.setStep(3);
      model.setLimits({ minLimit: -100, maxLimit: 100 }, true);
      model.setRangeValue({ minValue: -50, maxValue: 50 }, true);
    });

    it('Taking { minValue: -10, maxValue: 10 }, when step is equeal to 3, changes minimum value to -9, maximum value to 9.', () => {
      const result = model.setRangeValue({ minValue: -10, maxValue: 10 });

      expect(result.minValue).toEqual(-9);
      expect(result.minValue).toEqual(model.rangeValueMin);

      expect(result.maxValue).toEqual(9);
      expect(result.maxValue).toEqual(model.rangeValueMax);

      expect(result.selected)
        .toEqual(((model.rangeValueMax - model.rangeValueMin) / model.valuesCount) * 100);
      expect(result.selected).toEqual(model.rangeSelected);
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

      model.setNearestValue(75, true, true);

      expect(model.setSingleValue).toHaveBeenCalled();
      expect(model.singleValue).toEqual(model.valuesCount * 0.75);
    });

    it('Taking 23, changes value to 23', () => {
      spyOn(model, 'setSingleValue').and.callThrough();

      model.setNearestValue(23, null, true);

      expect(model.setSingleValue).toHaveBeenCalled();
      expect(model.singleValue).toEqual(23);
    });
  });

  describe('When sliders type is "range".', () => {
    beforeAll(() => {
      model.setType('range');
      model.setLimits({ minLimit: 0, maxLimit: 100 });
      model.setStep(1);
    });

    beforeEach(() => {
      model.setRangeValue({ minValue: 20, maxValue: 80 });
    });

    it('Taking 30 and true (change via percents), changes minimum value to 30%.', () => {
      spyOn(model, 'setRangeValue').and.callThrough();

      model.setNearestValue(30, true, true);

      expect(model.setRangeValue).toHaveBeenCalled();
      expect(model.rangeValueMin).toEqual(model.valuesCount * 0.3);
    });

    it('Taking 90 and true (change via percents), changes minimum value to 90%.', () => {
      spyOn(model, 'setRangeValue').and.callThrough();

      model.setNearestValue(90, true, true);

      expect(model.setRangeValue).toHaveBeenCalled();
      expect(model.rangeValueMax).toEqual(model.valuesCount * 0.9);
    });

    it('Taking 11 and true (change via percents), changes minimum value to 11.', () => {
      spyOn(model, 'setRangeValue').and.callThrough();

      model.setNearestValue(11, null, true);

      expect(model.setRangeValue).toHaveBeenCalled();
      expect(model.rangeValueMin).toEqual(11);
    });

    it('Taking 77 and true (change via percents), changes minimum value to 77.', () => {
      spyOn(model, 'setRangeValue').and.callThrough();

      model.setNearestValue(77, null, true);

      expect(model.setRangeValue).toHaveBeenCalled();
      expect(model.rangeValueMax).toEqual(77);
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
        model.setType(model.typeConstants[constant]);

        expect(model.type).toEqual(model.typeConstants[constant]);
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
      expect(model.type).toEqual('single');
    });
  });
});
