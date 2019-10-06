// Requirements
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
const window = (new JSDOM("<body><div id='root'></div></body>", { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;


import helper from "@helper";
import modelModule from "../model.js";
var model = new modelModule();

// Getters

describe("getLimits method.", () => {
	it("Returns { minLimit: *minimum limit*, maxLimit: *maximum limit*, valuesCount: *count of integer values* }", () => {
		var result = model.getLimits();

		// The result is an object.
		expect(helper.isObject(result)).toBeTruthy();

		// The "minLimit" property is an number.
		expect(helper.isNumber(result.minLimit)).toBeTruthy();
		// The "minLimit" property is equal to model.minLimit.
		expect(result.minLimit).toEqual(model.minLimit);

		// The "maxLimit" property is an number.
		expect(helper.isNumber(result.maxLimit)).toBeTruthy();
		// The "maxLimit" property is equal to model.minLimit.
		expect(result.maxLimit).toEqual(model.maxLimit);

		// The "valuesCount" property is an number.
		expect(helper.isNumber(result.valuesCount)).toBeTruthy();
		// The "valuesCount" property is equal to: maxLimit - minLimit
		expect(result.valuesCount).toEqual(result.maxLimit - result.minLimit);
		// The "valuesCount" property is equal to model.valuesCount.
		expect(result.valuesCount).toEqual(model.valuesCount);
	});
});

describe("getValue method.", () => {
	describe("When slider's type is 'single'.", () => {
		beforeAll(() => {
			model.setType("single");
		});

		it("Returns { value: *slider's value*, selected: *count of selected values* }", () => {
			var result = model.getValue();

			// the result is an object.
			expect(helper.isObject(result)).toBeTruthy();

			// The "value" property is an number.
			expect(helper.isNumber(result.value)).toBeTruthy();
			// The "value" property is equal to model.singleValue.
			expect(result.value).toEqual(model.singleValue);

			// The "selected" property is equal to property "value".
			expect(result.selected).toEqual(result.value);
			// The "selected" property is equal to model.selected.
			expect(result.selected).toEqual(model.singleSelected);
		});
	});

	describe("When slider's type is 'range'.", () => {
		beforeAll(() => {
			model.setType("range");
		});

		it("Returns { minValue: *slider's minimum value*, maxValue: *slider's maximum value*, selected: *count of selected values* }", () => {
			var result = model.getValue();

			// the result is an object.
			expect(helper.isObject(result)).toBeTruthy();

			// The "minValue" property is an number.
			expect(helper.isNumber(result.minValue)).toBeTruthy();
			// The "minValue" property is equal to model.minValue.
			expect(result.minValue).toEqual(model.rangeMinValue);

			// The "maxValue" property is an number.
			expect(helper.isNumber(result.maxValue)).toBeTruthy();
			// The "maxValue" property is equal to model.maxValue.
			expect(result.maxValue).toEqual(model.rangeMaxValue);

			// The "selected" property is equal to: maxValue - minValue.
			expect(result.selected).toEqual(result.maxValue - result.minValue);
			// The "selected" property is equal to model.selected.
			expect(result.selected).toEqual(model.rangeSelected);
		});
	});
});

describe("getStep method.", () => {
	it("Returns slider's step size.", () => {
		var result = model.getStep();

		// The result is an number.
		expect(helper.isNumber(result)).toBeTruthy();
	});
});

describe("getType method.", () => {
	it("Returns { type: *slider's type*, typeConstants: *object - list of reserved type names* }.", () => {
		var result = model.getType();

		// The result is an object.
		expect(helper.isObject(result)).toBeTruthy();

		// The "type" property is an string.
		expect(typeof result.type === "string").toBeTruthy();

		// The "typeConstants" property is an object.
		expect(helper.isObject(result.typeConstants)).toBeTruthy();
	});
});


// Setters

describe("setLimits method.", () => {
	describe("Normal values.", () => {
		beforeEach(() => {
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Set a slider's limits. Taking { [minLimit]: *new minimum limit*, [maxLimit]: *new maximum limit* }. Returns { minLimit: *minimum limit*, maxLimit: *maximum limit*, valuesCount: *count of integer values* }", () => {
			var result = model.setLimits({minLimit: 20, maxLimit: 80});

			expect(result.minLimit).toEqual(20);
			// The "minLimit" property is equal to model.minLimit.
			expect(result.minLimit).toEqual(model.minLimit);

			expect(result.maxLimit).toBeTruthy(80);
			// The "maxLimit" property is equal to model.maxLimit.
			expect(result.maxLimit).toEqual(model.maxLimit);

			expect(result.valuesCount).toEqual(80 - 20);
			// The "valuesCount" property is equal to model.valuesCount.
			expect(result.valuesCount).toEqual(model.valuesCount);
		});
	});

	describe("If you try to set limits, where maximum limit is less than minimum limit, it will swap them.", () => {
		beforeEach(() => {
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking { minLimit: 80, maxLimit: 20 }, swap it to { minLimit: 20, maxLimit: 80 }", () => {
			var result = model.setLimits({minLimit: 80, maxLimit: 20}, true);

			// The limits was swapped.
			expect(result.minLimit).toEqual(20);
			expect(result.minLimit).toEqual(model.minLimit);

			expect(result.maxLimit).toEqual(80);
			expect(result.maxLimit).toEqual(model.maxLimit);

			expect(result.valuesCount).toEqual(80 - 20);
			expect(result.valuesCount).toEqual(model.valuesCount);
		});
	});

	describe("If you try to set limits, where maximum limit equal to minimum limit, it will increase maximum limit by one.", () => {
		beforeEach(() => {
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking { minLimit: 100, maxLimit: 100 }, changes limits to { minLimit: 100, maxLimit: 101 }", () => {
			var result = model.setLimits({minLimit: 100, maxLimit: 100}, true);

			// The limits was swapped.
			expect(result.minLimit).toEqual(100);
			expect(result.minLimit).toEqual(model.minLimit);

			expect(result.maxLimit).toEqual(101);
			expect(result.maxLimit).toEqual(model.maxLimit);

			expect(result.valuesCount).toEqual(101 - 100);
			expect(result.valuesCount).toEqual(model.valuesCount);
		});
	});

	describe("If you try to set limits, where some property is not a number, it will take current value of this property's by default.", () => {
		beforeEach(() => {
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking { minLimit: 20 }, changes only minimum limit. Maximum will stay the same.", () => {
			var result = model.setLimits({minLimit: 20}, true);

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

describe("setSingleValue method.", () => {
	describe("Normal value.", () => {
		beforeAll(() => {
			model.setStep(1);
			model.setType("single");
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking 50, changing single value to 50. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setSingleValue(50, true);

			expect(result.value).toEqual(50);
			expect(result.value).toEqual(model.singleValue);

			expect(result.selected).toEqual(50);
			expect(result.selected).toEqual(model.singleSelected);
		});

		it("Taking 50, changing single value to 75. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setSingleValue(75, true);

			expect(result.value).toEqual(75);
			expect(result.value).toEqual(model.singleValue);

			expect(result.selected).toEqual(75);
			expect(result.selected).toEqual(model.singleSelected);
		});
	});

	describe("If you try to set value out of limits range, value will equated to nearest limit.", () => {
		beforeAll(() => {
			model.setStep(1);
			model.setType("single");
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking 110, changing value to 100. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setSingleValue(110, true);

			// Value was equated to a highest limit.
			expect(result.value).toEqual(100);
			expect(result.value).toEqual(model.singleValue);

			expect(result.selected).toEqual(100);
			expect(result.selected).toEqual(model.singleSelected);
		});

		it("Taking -10, changing value to 0. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setSingleValue(-10, true);

			// Value was equated to a highest limit.
			expect(result.value).toEqual(0);
			expect(result.value).toEqual(model.singleValue);

			expect(result.selected).toEqual(0);
			expect(result.selected).toEqual(model.singleSelected);
		});
	});

	describe("If you try to set slider's value by a not numeric value, it will take a current slider's value.", () => {
		beforeAll(() => {
			model.setStep(1);
			model.setSingleValue(50);
			model.setType("single");
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking null, value will stay the same. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setSingleValue(null, true);

			// Value stays the same.
			expect(result.value).toEqual(50);
			expect(result.value).toEqual(model.singleValue);

			// Selected values stays the same.
			expect(result.selected).toEqual(50);
			expect(result.selected).toEqual(model.singleSelected);
		});

		it("Taking 'dadaya', value will stay the same. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setSingleValue("dadaya", true);

			// Value stays the same.
			expect(result.value).toEqual(50);
			expect(result.value).toEqual(model.singleValue);

			// Selected values stays the same.
			expect(result.selected).toEqual(50);
			expect(result.selected).toEqual(model.singleSelected);
		});
	});
});

describe("setRangeValue method.", () => {
	describe("Normal value.", () => {
		beforeAll(() => {
			model.setStep(1);
			model.setType("range");
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking {minValue: 10, maxValue: 90}, changing minimum value to 10, maximum value to 90. Returns { minValue: *minimum value*, maxValue: *maximum value*, *selected count of integer value* }", () => {
			var result = model.setRangeValue({minValue: 10, maxValue: 90}, true);

			expect(result.minValue).toEqual(10);
			expect(result.minValue).toEqual(model.rangeMinValue);

			expect(result.maxValue).toEqual(90);
			expect(result.maxValue).toEqual(model.rangeMaxValue);

			expect(result.selected).toEqual(result.maxValue - result.minValue);
			expect(result.selected).toEqual(model.rangeSelected);
		});
	});

	describe("If you try to set value out of limits range, it will set it to nearest limit.", () => {
		beforeAll(() => {
			model.setStep(1);
			model.setType("range");
			model.setLimits({minLimit: 0, maxLimit: 100});
		});

		it("Taking {minValue: -10, maxValue: 110}, changes minimum value to 0, maximum value to 100. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setRangeValue({minValue: -10, maxValue: 110}, true);

			expect(result.minValue).toEqual(0);
			expect(result.minValue).toEqual(model.rangeMinValue);

			expect(result.maxValue).toEqual(100);
			expect(result.maxValue).toEqual(model.rangeMaxValue);

			expect(result.selected).toEqual(100);
			expect(result.selected).toEqual(model.rangeSelected);
		});
	});

	describe("If you try to set slider's value by a not numeric value, it will take a current slider's value.", () => {
		beforeAll(() => {
			model.setStep(1);
			model.setType("range");
			model.setLimits({minLimit: 0, maxLimit: 100});
		});
		beforeEach(() => {
			model.setRangeValue({minValue: 20, maxValue: 80}, true);
		});

		it("Taking {maxValue: 60}, changes maximum value to 60, minimum value will stay the same. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setRangeValue({maxValue: 60}, true);

			// Minimum value stays the same.
			expect(result.minValue).toEqual(20);
			expect(result.minValue).toEqual(model.rangeMinValue);

			// Maximum value was changed.
			expect(result.maxValue).toEqual(60);
			expect(result.maxValue).toEqual(model.rangeMaxValue);

			expect(result.selected).toEqual(result.maxValue - result.minValue);
			expect(result.selected).toEqual(model.rangeSelected);
		});

		it("Taking {minValue: null, maxValue: null}, values will stay the same. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setRangeValue({minValue: null, maxValue: null}, true);

			// Values stays the same.
			expect(result.minValue).toEqual(20);
			expect(result.minValue).toEqual(model.rangeMinValue);

			expect(result.maxValue).toEqual(80);
			expect(result.maxValue).toEqual(model.rangeMaxValue);

			expect(result.selected).toEqual(result.maxValue - result.minValue);
			expect(result.selected).toEqual(model.rangeSelected);
		});

		it("Taking null, values will stay the same. Returns { value: *value*, *selected count of integer value* }", () => {
			var result = model.setRangeValue(null, true);

			// Values stays the same.
			expect(result.minValue).toEqual(20);
			expect(result.minValue).toEqual(model.rangeMinValue);

			expect(result.maxValue).toEqual(80);
			expect(result.maxValue).toEqual(model.rangeMaxValue);

			expect(result.selected).toEqual(result.maxValue - result.minValue);
			expect(result.selected).toEqual(model.rangeSelected);
		});
	});
});

describe("setNearestValueViaPercents", () => {
	describe("When slider's type is 'single'.", () => {
		beforeAll(() => {
			model.setType("single");
			model.setLimits({minLimit: 0, maxLimit: 100});
			model.setStep(1);
		});

		beforeEach(() => {
			model.setSingleValue(50);
		});

		it("Taking 75, changing value to 75%.", () => {
			spyOn(model, "setSingleValue").and.callThrough();

			model.setNearestValueViaPercents(75);

			expect(model.setSingleValue).toHaveBeenCalled();
			expect(model.singleValue).toEqual(model.valuesCount * 0.75);
			expect(model.singleSelected).toEqual(model.valuesCount * 0.75);
		});
	});

	describe("When slider's type is 'range'.", () => {
		beforeAll(() => {
			model.setType("range");
			model.setLimits({minLimit: 0, maxLimit: 100});
			model.setStep(1);
		});

		beforeEach(() => {
			model.setRangeValue({minValue: 20, maxValue: 80});
		});

		it("Taking 30, changing minimum value to 30%.", () => {
			spyOn(model, "setRangeValue").and.callThrough();

			model.setNearestValueViaPercents(30);

			expect(model.setRangeValue).toHaveBeenCalled();
			expect(model.rangeMinValue).toEqual(model.valuesCount * 0.3);
		});

		it("Taking 90, changing minimum value to 90%.", () => {
			spyOn(model, "setRangeValue").and.callThrough();

			model.setNearestValueViaPercents(90);

			expect(model.setRangeValue).toHaveBeenCalled();
			expect(model.rangeMaxValue).toEqual(model.valuesCount * 0.9);
		});
	});
});

describe("setStep method.", () => {
	describe("Normal values.", () => {
		it("Taking 5, changes slider's step to 5. Returns step.", () => {
			var result = model.setStep(5);

			expect(result).toEqual(5);
			expect(result).toEqual(model.step);
		});
	});

	describe("If you try to set step as a value, that is less than 1, it will return undefined.", () => {
		beforeEach(() => {
			model.setStep(1);
		});

		it("Taking 0, returns undefined.", () => {
			var result = model.setStep(0);
			expect(result).toBeUndefined();

			expect(model.step).toEqual(1);
		});

		it("Taking -100, returns undefined.", () => {
			var result = model.setStep(-100);
			expect(result).toBeUndefined();

			expect(model.step).toEqual(1);
		});
	});

	describe("If you try to set step as a not numeric value, it will return undefined.", () => {
		beforeEach(() => {
			model.setStep(1);
		});

		it("Taking NaN, returns undefined.", () => {
			var result = model.setStep(NaN);
			expect(result).toBeUndefined();

			expect(model.step).toEqual(1);
		});

		it("Taking 'dadaya', returns undefined.", () => {
			var result = model.setStep("dadaya");
			expect(result).toBeUndefined();

			expect(model.step).toEqual(1);
		});
	});
});

describe("setType method.", () => {
	describe("Normal values - if value is listed in typeConstants.", () => {
		for (var constant in model.getType().typeConstants) {
			it("Taking " + model.getType().typeConstants[constant] + ", changes type to " + model.getType().typeConstants[constant] + ". Returns type.", () => {
				var result = model.setType(model.getType().typeConstants[constant]);

				expect(result).toEqual(model.getType().typeConstants[constant]);
				expect(result).toEqual(model.type);
			});
		}
	});

	describe("If you try to set type by value, that is not listed in typeConstants, it will return undefined.", () => {
		beforeEach(() => {
			model.setType("single");
		});

		it("Taking 'royal', return undefined.", () => {
			var result = model.setType("royal");

			expect(result).toBeUndefined();

			// The type stays the same.
			expect(model.type).toEqual("single");
		});
	});
});