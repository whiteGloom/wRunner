// Requirements
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const window = (new JSDOM('<body><div id="root"></div></body>', { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;

wRunner = require('../wrunner-native');

// PREPARATIONS
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

function isString(value) {
	if(typeof value === 'string') return true;
	return false;
}


// Plugin itself.
var slider = wRunner();

// SPECS
// getType method.
describe("getType method. Returns current slider's type. ", () => {
	it("Returns: {type: current slider's type, typeConstants: object with reserved values for types}", () => {
		var result = slider.getType();

		expect(isString(result.type)).toBeTruthy();
		expect(result.typeConstants).toBeDefined();
	});
});

describe("setType method. It changes slider's type. Returns new slider's type.", () => {
	describe("Normal value - reserved values, that listed in typeConstants (watch 'getType' method).", () => {
		var consts = slider.getType().typeConstants;

		for (var constant in consts) {
			it("Taking type" + consts[constant] + ", changes type to" + consts[constant] + ".", () => {
				expect(slider.setType(consts[constant])).toEqual(consts[constant]);
			});
		}
	});

	describe("If you try to set a not reserved values, returns undefined.", () => {
		it("Taking 'garabk', returns undefined.", () => {
			expect(slider.setType('garabk')).toBeUndefined()
		});

		it("Taking null, returns undefined.", () => {
			expect(slider.setType(null)).toBeUndefined()
		});

		it("Taking {}, returns undefined.", () => {
			expect(slider.setType({})).toBeUndefined()
		});
	});
});

describe("getStep method.", () => {
	it("Returns current slider's step. ", () => {
		expect(isNumber(slider.getStep())).toBeTruthy();
	});
});

describe("setStep method. It changes slider's step. Returns new slider's step.", () => {
	describe("Normal values for set: >0", () => {
		it("Taking 1, changes step to 1.", () => {
			expect(slider.setStep(1)).toEqual(1);
		});

		it("Taking 5, changes step to 5.", () => {
			expect(slider.setStep(5)).toEqual(5);
		});

		it("Taking 100, changes step to 100.", () => {
			expect(slider.setStep(100)).toEqual(100);
		});
	});

	describe("If you try to set value, that is less than 0, returns undefined.", () => {
		it("Taking 0, returns undefined. ", () => {
			expect(slider.setStep(0)).toBeUndefined();
		});

		it("Taking -5, returns undefined. ", () => {
			expect(slider.setStep(-5)).toBeUndefined();
		});
	});
});

describe("getLimits method. Returns current slider's limits.", () => {
	it("Returns: {minLimit: minimum limit, maxLimit: maximum limit, valuesCount: count of values}.", () => {
		var result = slider.getLimits();

		expect(isNumber(result.minLimit)).toBeTruthy();
		expect(isNumber(result.maxLimit)).toBeTruthy();
		expect(isNumber(result.valuesCount)).toBeTruthy();
	});
});

describe("setLimits method. It changes minimum and maximum limits for value of slider.", () => {
	describe("When minimum is less than maximum.", () => {
		it("Taking {minLimit: -100, maxLimit: 100}, changes minimum to -100, maximum to 100", () => {
			var result = slider.setLimits({minLimit: -100, maxLimit: 100});

			expect(result.minLimit).toEqual(-100);
			expect(result.maxLimit).toEqual(100);
			expect(result.valuesCount).toEqual(200);
		});

		it("Taking {minValue: 20, maxLimit: 80}, changes minimum to 20, maximum to 80", () => {
			var result = slider.setLimits({minLimit: 20, maxLimit: 80});

			expect(result.minLimit).toEqual(20);
			expect(result.maxLimit).toEqual(80);
			expect(result.valuesCount).toEqual(60);
		});
	});

	describe("If you try to set maximum limit, that is less than minimum, it will reverse them.", () => {
		it("Taking {minLimit: 100, maxLimit: 0}, changes minimum to 100, maximum to 0", () => {
			var result = slider.setLimits({minLimit: 100, maxLimit: 0}, true);

			expect(result.minLimit).toEqual(0);
			expect(result.maxLimit).toEqual(100);
			expect(result.valuesCount).toEqual(100);
		});
	});

	describe("If you try to set limit by a not numeric value, it will take a current limits.", () => {
		it('Having a minimum limit of 0 and taking {minLimit: NaN, maxLimit: 100}, changes maximum to 100. ', () => {
			slider.setLimits({minLimit: 0, maxLimit: 200}, true)
			var result = slider.setLimits({minLimit: NaN, maxLimit: 100})

			expect(result.maxLimit).toEqual(100);
			expect(result.minLimit).toEqual(0);
		});

		it('Having a maximum limit of 100 and taking {minLimit: 0, maxLimit: NaN}, changes minimum to 0. ', () => {
			slider.setLimits({minLimit: -100, maxLimit: 100}, true)
			var result = slider.setLimits({minLimit: 0, maxLimit: NaN})

			expect(result.minLimit).toEqual(0);
			expect(result.maxLimit).toEqual(100);
		});

		it('Having a minimum limit of 0, maximum limit of 100 and taking {minLimit: NaN, maxLimit: {}}, do nothing o_0', () => {
			slider.setLimits({minLimit: 0, maxLimit: 100}, true)
			var result = slider.setLimits({minLimit: NaN, maxLimit: {}})

			expect(result.minLimit).toEqual(0);
			expect(result.maxLimit).toEqual(100);
		});
	})
});

describe("getValue. Returns current slider's value.", () => {
	describe("If current slider's type is 'single'.", () => {
		it("Returns: {value: value, selected: count of selected values}.", () => {
			slider.setType('single');

			expect(isNumber(slider.getValue().value)).toBeTruthy();
			expect(isNumber(slider.getValue().selected)).toBeTruthy();
		});
	});

	describe("If current slider's type is 'range'.", () => {
		it("Returns: {minValue: minimum value, maxValue: maximum value, selected: count of selected values}", () => {
			slider.setType('range');

			expect(isNumber(slider.getValue().minValue)).toBeTruthy();
			expect(isNumber(slider.getValue().maxValue)).toBeTruthy();
			expect(isNumber(slider.getValue().selected)).toBeTruthy();
		});
	});
});

describe("setValue method. It changes slider's value.", () => {
	describe("If slider's type is 'single', returns: {value: value, selected: count of selected values}", () => {
		beforeEach(() => {
			slider.setLimits({minLimit: 0, maxLimit: 100}, true);
			slider.setStep(1);
			slider.setType('single');
		})

		it("Taking 50, changes value to 50.", () => {
			var result = slider.setValue(50);

			expect(result.value).toEqual(50);
			expect(result.selected).toEqual(50);
		});

		it("Taking 75, changes value to 75.", () => {
			var result = slider.setValue(75);
			
			expect(result.value).toEqual(75);
			expect(result.selected).toEqual(75);
		});
	});

	describe("If slider's type is 'range', returns: {minValue: current minimum value, maxValue: current maximum value, selected: count of selected values}", () => {
		beforeEach(() => {
			slider.setLimits({minLimit: 0, maxLimit: 100}, true);
			slider.setStep(1);
			slider.setType('range');
		})

		it("Taking {minValue: 20, maxValue: 80}, returns {minValue: 20, maxValue: 80, selected: 60}", () => {
			var result = slider.setValue({minValue: 20, maxValue: 80});

			expect(result.minValue).toEqual(20);
			expect(result.maxValue).toEqual(80);
			expect(result.selected).toEqual(60);
		});

		it("Taking {minValue: 0, maxValue: 100}, returns {minValue: 0, maxValue: 80, selected: 100}", () => {
			var result = slider.setValue({minValue: 0, maxValue: 100});

			expect(result.minValue).toEqual(0);
			expect(result.maxValue).toEqual(100);
			expect(result.selected).toEqual(100);
		});

		it("Taking number, changes nearest value to it. Having a minimum value of 20, a maximum of 80, and taking 30, it changes to a minimum of 30.", () => {
			slider.setValue({minValue:20, maxValue: 80})
			var result = slider.setValue(30);

			expect(result.minValue).toEqual(30);
			expect(result.maxValue).toEqual(80);
			expect(result.selected).toEqual(50);
		});

		it("Taking number, changes nearest value to it. Having a minimum value of 20, a maximum of 80, and taking 60, it changes to a maximum of 60.", () => {
			slider.setValue({minValue:20, maxValue: 80})
			var result = slider.setValue(60);

			expect(result.minValue).toEqual(20);
			expect(result.maxValue).toEqual(60);
			expect(result.selected).toEqual(40);
		});
	});

	describe("If you try to set a value and it will out of current limits, it will set value to nearest limit.", () => {
		beforeEach(() => {
			slider.setStep(1);
			slider.setLimits({minLimit: 0, maxLimit: 100}, true);
		})

		it("Having current type of 'range', a minimum limit of 0, a maximum of 100 and taking {minValue: -5, maxValue: 105}, changes minimum to 0, maximum to 100.", () => {
			slider.setType('range');

			var result = slider.setValue({minValue: -5, maxValue: 105}, true);

			expect(result.minValue).toEqual(0);
			expect(result.maxValue).toEqual(100);
			expect(result.selected).toEqual(100);
		});

		it("Having current type of 'single', a minimum limit of 0, a maximum of 100 and taking -20, changes value to 0", () => {
			slider.setType('single');

			var result = slider.setValue(-20, true);

			expect(result.value).toEqual(0);
			expect(result.selected).toEqual(0);
		});
	});

	describe("It you try to set slider's value by a not numeric value, it will take a current slider's value.", () => {
		it("Having current type of 'single', current value of 50 and taking NaN, it will take a current slider's value.", () => {
			slider.setStep(1);
			slider.setLimits({minLimit: 0, maxLimit: 100});
			slider.setType('single');
			slider.setValue(50);

			var result = slider.setValue(NaN);

			expect(result.value).toEqual(50);
			expect(result.selected).toEqual(50);
		});
	});
});

describe("getRoots method.", () => {
	it("Returns current slider's root element.", () => {
		expect(isDomEl(slider.getRoots())).toBeTruthy();
	});
})

describe("setRoots method. Changing root element of slider", () => {
	describe("Normal value - DOM element. Returns new root.", () => {
		it("Taking div element with class 'root', returns it.", () => {
			var newRoots = document.getElementById("root");

			expect(slider.setRoots(newRoots)).toEqual(newRoots);
		});
	})

	describe("If you try to set roots as not DOM element, it will returns undefined.", () => {
 		it("Taking NaN, returns undefined.", () => {
 			expect(slider.setRoots(NaN)).toBeUndefined();
 		})
	})
})

describe("getValueNoteDisplay method.", () => {
	it("Returns true/false - display of note with current value above slider's the handler.", () => {
		var result = slider.getValueNoteDisplay();

		expect(typeof result == 'boolean').toBeTruthy();
	});
});

describe("setValueNoteDisplay method. Changing displayof note with current value above slider's the handler.", () => {
	describe("Normal value - boolean. Returns new value.", () => {
		it("Taking true, returns true.", () => {
			expect(slider.setValueNoteDisplay(true)).toBeTruthy();
		});

		it("Taking false, returns false.", () => {
			expect(slider.setValueNoteDisplay(false)).toBeFalsy();
		});
	});

	describe("If you try to set a value as a not boolean, it returns undefined.", () => {
		it("Taking NaN, returns undefined.", () => {
			expect(slider.setValueNoteDisplay(NaN)).toBeUndefined();
		});
	});
});

describe("getDivisionsCount method.", () => {
	it("Returns count of slider's divisions.", () => {
		expect(isNumber(slider.getDivisionsCount())).toBeTruthy();
	});
})

describe("setDivisionsCount method. Changng count of slider's divisions.", () => {
	describe("Normal value - number, 0 or more than 1. Returns new count of divisions.", () => {
		it("Taking 5, returns 5.", () => {
			expect(slider.setDivisionsCount(5)).toEqual(5);
		});

		it("Taking 0, returns 0.", () => {
			expect(slider.setDivisionsCount(0)).toEqual(0);
		});
	});

	describe("If you try to set value as 1, it will increased by 1.", () => {
		it("Taking 1, returns 2.", () => {
			expect(slider.setDivisionsCount(1, true)).toEqual(2);
		});
	})

	describe("If you try to set value as not integer, it will be rounded.", () => {
		it("Taking 3.2, returns 3.", () => {
			expect(slider.setDivisionsCount(3.2, true)).toEqual(3);
		});

		it("Taking 3.6, returns 4.", () => {
			expect(slider.setDivisionsCount(3.6, true)).toEqual(4);
		});
	})

	describe("If you try to set count as a not numeric value or a value that is less than 0, it returns undefined.", () => {
		it("Taking -1, returns undefined.", () => {
			expect(slider.setDivisionsCount(-1, true)).toBeUndefined();
		})
		it("Taking NaN, returns undefined.", () => {
			expect(slider.setDivisionsCount(NaN, true)).toBeUndefined();
		})
	})
});

describe("getStyles method.", () => {
	it("Returns current slider's styles. Returns: {styles: list of current styles, styleConstants: object with reserved values for types}.", () => {
		var result = slider.getStyles();

		expect(result.styles).toBeDefined();
		expect(result.stylesConstants).toBeDefined();
	});
})

describe("setStyles method. Changing slider's styles.", () => {
	describe("Normal value - object. Returns: {styles: list of current styles, styleConstants: object with reserved values for types}.", () => {
		it("If the style's value is not listed in constants (watch getStyles method). Taking {theme: {value: 'dark', className: 'thm'}}, theme's value will changes to 'dark', class name will changes to 'thm'.", () => {
			var result = slider.setStyles({theme: {value: 'dark', className: 'thm'}});
			
			expect(result.theme.value).toEqual('dark');
			expect(result.theme.className).toEqual('thm');
		});

		it("If the style's value is not listed in constants (watch getStyles method). Taking {theme: {value: 'light'}}, theme's value will changes to 'dark'.", () => {
			var result = slider.setStyles({theme: {value: 'light'}});
			
			expect(result.theme.value).toEqual('light');
		});

		it("If the style's value is not listed in constants (watch getStyles method). Taking {theme: {className: 'styyyyles'}}, theme's className will changes to 'styyyyles'.", () => {
			var result = slider.setStyles({theme: {className: 'styyyyles'}});
			
			expect(result.theme.className).toEqual('styyyyles');
		});

		it("If the style's value is listed in constants (watch getStyles method). Taking {direction: {value: 'vertical', className: 'direct'}}, describe's value will changes to 'vertical', class name will changes to 'direct'.", () => {
			var result = slider.setStyles({direction: {value: 'vertical', className: 'direct'}});
			
			expect(result.direction.value).toEqual('vertical');
			expect(result.direction.className).toEqual('direct');
		});

		it("If the style's value is listed in constants (watch getStyles method). Taking {direction: {value: 'horizontal'}}, describe's value will changes to 'horizontal'.", () => {
			var result = slider.setStyles({direction: {value: 'horizontal'}});
			
			expect(result.direction.value).toEqual('horizontal');
		});

		it("If the style's value is listed in constants (watch getStyles method). Taking {direction: {className: 'dir'}}, describe's className will changes to 'dir'.", () => {
			var result = slider.setStyles({direction: {className: 'dir'}});

			expect(result.direction.className).toEqual('dir');
		});
	});

	describe("If you try to set styles as  not a object, returns undefined.", () => {
		it("Taking NaN, returns undefined.", () => {
			expect(slider.setStyles(NaN)).toBeUndefined();
		});
	});
});