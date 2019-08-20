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
			expect(vw.drawValue({value: 50, selected: 50}, {minLimit: 0, maxLimit: 100, valuesCount: 100}, {type: 'single', typeConsts: {singleValue: 'single'}})).toBeDefined();
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