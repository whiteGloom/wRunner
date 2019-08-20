// Requirements
const jsdom = require("jsdom");
wRunner = require('../wrunner');

const {JSDOM} = jsdom;
const window = (new JSDOM('<body></body>', { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;

// PREPARATIONS
// Plugin itself.
var md = new wRunner.Model();
var vw = new wRunner.View();
var pr = new wRunner.Presenter({model: md, view: vw});

// Not standart variables, that may be used.
var zeros = [null, undefined, true, false, 'test', '50', NaN]

// Helper functions.
var isNumber = wRunner.helper.isNumber;
var isDomEl = wRunner.helper.isDomEl;

// SPECS
// Model
describe("wRunner.model", () => {

	// setStep method.
	describe('setStep method.', () => {

		// Normal step
		test(10)
		// Unreal step
		test(-10)
		test(0)
		// Not standart
		for (var i = 0; i < zeros.length; i++) {
			test(zeros[i])
		}

		function test(val) {
			if (val > 0 && isNumber(val)) {
				it("Changing the slider\'s step size, returns a new step.", () => {
					expect(md.setStep(+val)).toEqual(+val);
				});
			};

			if (!isNumber(val) || val <= 0) {
				it("If you try to set a (<= 0 || not number || string that may not be turned into number) step, it returns undefined and the step remains the same.", () => {
					expect(md.setStep(val)).not.toBeDefined();
				});
			}
		}
	});

	// getStep method.
	describe('getStep method.', () => {
		it('Returns current step\'s value.', () => {
			expect(isNumber(md.getStep())).toBeTruthy();
		});
	});

	// setRange method.
	describe('setRange method.', () => {

		// Normal range
		test(-30, 30);
		// Reversed range
		test(30, -30);
		// Min = max
		test(0, 0);
		// Not standart
		for (var i = zeros.length - 1; i >= 0; i--) {
			test(zeros[i], zeros[zeros.length - i])
		}

		function test(min, max) {
			if (min <= max && isNumber(min) && isNumber(max)) {
				it('Changing slider\'s range of values, returns a object with keys that keeps new values: minValue, maxValue, valuesCount.', () => {
					var res = md.setRange(min, max, true);

					expect(res.minLimit).toEqual(+min);
					expect(res.maxLimit).toEqual(+max);
					expect(res.valuesCount).toEqual(+max - +min);
				});
			}

			if (min > max && isNumber(min) && isNumber(max)) {
				it('If you try to set range with min value more that max value, it will reverse them.', () => {
					var res = md.setRange(min, max, true);

					expect(res.minLimit).toEqual(+max);
					expect(res.maxLimit).toEqual(+min);
					expect(res.valuesCount).toEqual(+min - +max);
				});
			}

			if (!isNumber(min) || !isNumber(max)) {
				it('If argument is undefined or not a number or a string that may be turned into number, it will take a current value of argument.', () => {
					var res = md.setRange(min, max, true);

					expect(isNumber(res.minLimit)).toBeTruthy();
					expect(isNumber(res.maxLimit)).toBeTruthy();
					expect(isNumber(res.valuesCount)).toBeTruthy();
				});
			};
		};
	});

	// getRange method.
	describe('getRange method.', () => {
		it('Returns object with keys: minValue, maxValue, valuesCount.', () => {
			var res = md.getRange()

			expect(isNumber(res.minLimit)).toBeTruthy();
			expect(isNumber(res.maxLimit)).toBeTruthy();
			expect(isNumber(res.valuesCount)).toBeTruthy();
		});
	});

	describe('setValue method.', () => {
		// Let's set a min-max range.
		var min = 0, max = 30, valsCount = 30;
		md.setRange(0, 30);

		md.setType('single');
		// Single tests
		// Out of range
		testSingle(-10);
		testSingle(40);
		// In range
		testSingle(20);
		// On limiters
		testSingle(0);
		testSingle(30);

		md.setType('range');
		// Range tests
		// Out of range
		testRange({minValue: -10, maxValue: 40});
		// In range
		testRange({minValue: 10, maxValue: 20});
		// On limiters
		testRange({minValue: 0, maxValue: 30});
		// If 'minValue' > 'maxValue'
		testRange({minValue: 20, maxValue: 10});

		// If type is 'signle'
		function testSingle(val) {
			var res = md.setValue(val, true);

			if (val >= min && val <= max) {
				it("Changing current slider\'s value, returns a object with keys: value, selected. If you try to set value that is not a number or a string that may be turned into number, it will take a current slider\'s value.", () => {
					expect(res.value).toEqual(+val);
					expect(res.selected).toEqual((val - min) / valsCount * 100);
				});
			};

			if (val < min || val > max) {
				it("If you try to set value that out of range, it will set value to nearest limiter.", () => {
					expect(res.value).toEqual(+val < min ? min : max);
					expect(res.selected).toEqual((res.value - min) / valsCount * 100);
				});
			};
		}

		// If type is 'range'
		function testRange(val) {
			var res = md.setValue({minValue: val.minValue, maxValue: val.maxValue}, true);

			if (val.minValue >= min && val.maxValue <= max && val.minValue < val.maxValue) {
				it("Changing current slider\'s value, returns a object with keys: minValue, maxValue, selected. If you try to set value that is not a number or a string that may be turned into number, it will take a current slider\'s value.", () => {
					expect(res.minValue).toEqual(+val.minValue);
					expect(res.maxValue).toEqual(+val.maxValue);
					expect(res.selected).toEqual((val.maxValue - val.minValue) / valsCount * 100);
				});
			};

			if (val.minValue < min || val.maxValue > max && val.minValue < val.maxValue) {
				it("If you try to set value that out of range, it will set value to nearest limiter.", () => {
					expect(res.minValue).toEqual(+val.minValue < min ? min : +val.minValue);
					expect(res.maxValue).toEqual(+val.maxValue > max ? max : +val.maxValue);
				});
			};

			if (val.minValue > val.maxValue) {
				it("If you try to set minValue that is more than maxValue, it will set reverse them.", () => {
					expect(res.minValue).toEqual(+val.maxValue);
					expect(res.maxValue).toEqual(+val.minValue);
				});
			}
		}
	});

	describe('getValue method.', () => {
		var type = md.getType();

		// If type is 'single'
		if (type.type == type.typeConsts.singleValue) {
			it('Returns a object with keys: value, selected.', () => {
				var res = md.getValue();

				expect(isNumber(res.value)).toBeTruthy();
				expect(isNumber(res.selected)).toBeTruthy();
			});	
		}

		// If type is 'range'
		if (type.type == type.typeConsts.rangeValue) {
			it('Returns a object with keys: minValue, maxValue, selected.', () => {
				var res = md.getValue();

				expect(isNumber(res.minValue)).toBeTruthy();
				expect(isNumber(res.maxValue)).toBeTruthy();
				expect(isNumber(res.selected)).toBeTruthy();
			});	
		}
	});
});