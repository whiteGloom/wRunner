// Requirements
const jsdom = require("jsdom");
wRunner = require('./wrunner');

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
function isNumber(value, exceps) {
	var exceps = exceps ? exceps : [];
	for (var i = 0; i < exceps.length; i++) {
		if (typeof value === exceps[i]) return true
	};

	if (typeof value === 'number' && !Number.isNaN(+value) || typeof value === 'string' && typeof +value === 'number' && !Number.isNaN(+value)) return true;

	return false
}

function isDomEl(el) {
	if (typeof el !== 'object' || Number.isNaN(el) || el === null) return false;
	return 'ownerDocument' in el ? true : false;
}

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
				it("If you try to set a ( <= 0 || not number || string that may not be turned into number) step, it returns undefined and the step remains the same.", () => {
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

		// Out of range
		test(-10);
		test(40);
		// In range
		test(20);
		// On limiters
		test(0);
		test(30);

		// Not standart
		for (var i = 0; i < zeros.length; i++) {
			test(zeros[i])
		}

		function test(val) {
			var res = md.setValue(val, true);
			if (val >= min && val <= max && isNumber(val)) {
				it("Changing current slider\'s value, returns a object with keys: value, progress.", () => {
					expect(res.value).toEqual(+val);
					expect(res.progress).toEqual((res.value - min) / valsCount * 100);
				});
			};

			if ((val < min || val > max) && isNumber(val)) {
				it("If you try to set value that out of range, it will set value to nearest limiter.", () => {
					expect(res.value).toEqual(+val < min ? min : max);
					expect(res.progress).toEqual((res.value - min) / valsCount * 100);
				});
			};

			if (!isNumber(val)) {
				it('If you try to set value that is not a number or a string that may be turned into number, it will take a current slider\'s value.', () => {
					expect(isNumber(res.value)).toBeTruthy();
				});
			}
		}
	});

	describe('getValue method.', () => {
		it('Returns a object with keys: value, progress.', () => {
			var res = md.getValue();

			expect(isNumber(res.value)).toBeTruthy();
			expect(isNumber(res.progress)).toBeTruthy();
		});	
	});
});

// View
describe('wRunner.view', () => {
	
	describe('setValueNoteDisplay method.', () => {
		// Normal values
		test(true);
		test(false);
		// Not standart
		for (var i = zeros.length - 1; i >= 0; i--) {
			test(zeros[i])
		}

		function test(val) {
			if (typeof val === 'boolean') {
				it('Changing display of value\'s note', () => {
					expect(vw.setValueNoteDisplay(val)).toBe(val);
				});
			} else {
				it('If you try to set value, that is not a boolean, it returns undefined.', () => {
					expect(vw.setValueNoteDisplay(val)).not.toBeDefined();	
				});
			}
		}
	});

	describe('getValueNoteDisplay method.', () => {
		it('Returns current value of display of values note.', () => {
			expect(typeof vw.getValueNoteDisplay() === 'boolean').toBeTruthy();
		});
	});
	
	describe('setRoots method.', () => {
		// Normal value
		test(document.body);
		// Not standart
		for (var i = zeros.length - 1; i >= 0; i--) {
			test(zeros[i])
		};

		function test(val) {
			if(isDomEl(val)) {
				it('Changing slider\'s roots, returns new roots.', () => {
					expect(vw.setRoots(val)).toEqual(val);
				});
			} else {
				it('If you try to set roots, that is not a DOMElement, it returns undefined.', () => {
					expect(vw.setRoots(val)).not.toBeDefined();
				});
			}
		}
	});

	describe('getRoots method.', () => { 
		it('Returns current roots of slider.', () => {
			expect(isDomEl(vw.getRoots())).toBeTruthy();
		});
	});

	describe('generateDivisions', () => {
		it('Returns list of generated devisions.', () => {
			expect(vw.generateDivisions()).toBeDefined()
		});
	});

	describe('drawValue method.', () => {
		it('Redraw value, returns progress.', () => {
			expect(vw.drawValue(50, 50)).toBeDefined();
		});
	});

	describe('setStyles method.', () => {
		it('Changing value of styles, returns list of styles.', () => {
			expect(vw.setStyles({theme: {value: 'default'}}).theme.value).toEqual('default')
			expect(vw.setStyles({theme: {value: 'default', sign: 'kurwa'}}).theme.value).toEqual('default')
			expect(vw.setStyles({theme: {value: 'default', sign: 'kurwa'}}).theme.sign).toEqual('kurwa')
		});

		it('If you try to transfer not a object, it will returns undefined.', () => {
			expect(vw.setStyles()).not.toBeDefined()
		});
	});

	describe('applyStyles method.', () => {
		it('Applying styles to slider, returns list of styles.', () => {
			expect(vw.applyStyles()).toBeDefined();
		});
	});

	describe('addStyles method.', () => {
		it('Adding new styles to slider\'s style list, returns list of all styles. If style has no key "value", it will skip this style. If style has no key "sign", it will name sign as style.', () => {
			expect(vw.addStyles({grayTheme: {value: 'confirmed'}}).grayTheme.sign).toEqual('grayTheme');
			expect(vw.addStyles({darkTheme: {value: 'confirmed', sign:'darktheme'}}).darkTheme).toBeDefined();
			expect(vw.addStyles({lightTheme: {sign:'darktheme'}}).lightTheme).not.toBeDefined();
		});

		// Not standart values
		for (var i = zeros.length - 1; i >= 0; i--) {
			test(zeros[i])
		};

		function test(val) {
			it('If you try to transfer not a object, it will returns undefined.', () => {
				expect(vw.addStyles(val)).not.toBeDefined();
			});
		}
	});

	describe('removeStyles method.', () => {
		vw.addStyles({klop: {value: 'klop', sign: 'klop'}})
		it('Remove styles, transfered in array, returns styles list.', () => {
			expect(vw.removeStyles(['klop']).klop).not.toBeDefined();
		});

		// Not standart values
		for (var i = zeros.length - 1; i >= 0; i--) {
			test(zeros[i])
		}
		function test(val) {
			it('If you try to transfer not a array, it will return undefined.', () => {
				expect(vw.removeStyles(val)).not.toBeDefined();		
			});
		}
	});

	describe('setDivisionsCount method.', () => {
		// Normal values
		test(0);
		test(3);
		test(5);
		// Value, that equal to one
		test(1);
		// Not standart values
		for (var i = zeros.length - 1; i >= 0; i--) {
			test(zeros[i]);
		}

		function test(val) {
			if (isNumber(val) && val != 1) {
				it('Changing count of divisions.', () => {
					expect(vw.setDivisionsCount(val, true)).toEqual(+val)
				});
			}
			if (isNumber(val) && val == 1) {
				it('If you try to set a count that equal to one, it will increased by one.', () => {
					expect(vw.setDivisionsCount(val, true)).toEqual(2);
				});
			}
			if (!isNumber(val)) {
				it('If you try to set count, that is not a number, it returns undefined.', () => {
					expect(vw.setDivisionsCount(val, true)).not.toBeDefined();
				});
			}
		}
	})
});



calculateValue: function(newValue, auto) {
	var newValue = wRunner.helper.isNumber(newValue) ? +newValue : this.value;
	var steppedValue, mutable;

	if (this.type == 'single') {
		var val = wRunner.isNumber(newValue) ? newValue : this.value;
		calculateByLimits(calculateValueByStep(newValue), 'value');
	} else {
		if (wRunner.isObject(newValue)) {
			if (newValue.minValue) {
				var min = wRunner.isNumber(newValue.minValue) ? newValue.minValue : this.minValue;
				calculateByLimits(calculateValueByStep(min), 'minValue');
			}
			if (newValue.maxValue) {
				var max = wRunner.isNumber(newValue.maxValue) ? newValue.maxValue : this.maxValue;
				calculateByLimits(calculateValueByStep(max), 'maxValue');
			}
		}
	}

	function calculateByLimits(val, mutable) {
		if (val < this.minLimit) {
			this[mutable] = this.minLimit;
			if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
		} else if (val > this.maxLimit) {
			this[mutable] = this.maxLimit;
			if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
		} else {
			this[mutable] = +val;
		};
	}

	function calculateValueByStep(val, mutable) {
		if (val != this[mutable]) {
			return this[mutable] - Math.round((this[mutable] - val) / this.step) * this.step;
		} else {
			return Math.round(this[mutable] / this.step) * this.step;
		}
	}

	this.valueChangedEvent.trigger(this[mutable])
	return this[mutable]
},

calculateValue: function(newValue, auto) {
	var newValue = wRunner.helper.isNumber(newValue) ? +newValue : this.value;
	var steppedValue, mutable;

	if (newValue != this.value) {
		steppedValue = this.value - Math.round((this.value - newValue) / this.step) * this.step;
	} else {
		steppedValue = Math.round(this.value / this.step) * this.step;
	}

	if (this.type == 'single') {
		mutable = 'value';
	} else {
		mutable = steppedValue < (this.maxValue + this.minValue) / 2 ? 'minValue' : 'maxValue';
	}

	if (steppedValue < this.minLimit) {
		this[mutable] = this.minLimit;
		if (!auto) console.log('The value was equated to the minimum, because it is less than the minimum value.');
	} else if (steppedValue > this.maxLimit) {
		this[mutable] = this.maxLimit;
		if (!auto) console.log('The value was equated to the maximum, because it is more than the maximum value.');
	} else {
		this[mutable] = +steppedValue;
	};

	this.valueChangedEvent.trigger(this[mutable])
	return this[mutable]
},