// Requirements
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
const window = (new JSDOM("<body><div id='root'></div></body>", { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;


import helper from "@helper";
import viewModule from "../view.js";
var view = new viewModule();

describe("generateBaseDOM method.", () => {
	it("Generate base elements for plugin.", () => {
		view.generateBaseDOM();

		expect(view.base).toHaveClass("wrunner");
		expect(view.outer).toHaveClass("wrunner__outer");
		expect(view.path).toHaveClass("wrunner__path");
		expect(view.pathPassed).toHaveClass("wrunner__pathPassed");
		expect(view.handle).toHaveClass("wrunner__handle");
		expect(view.handleMin).toHaveClass("wrunner__handle");
		expect(view.handleMax).toHaveClass("wrunner__handle");
		expect(view.valueNote).toHaveClass("wrunner__valueNote");
		expect(view.valueNoteMin).toHaveClass("wrunner__valueNote");
		expect(view.valueNoteMax).toHaveClass("wrunner__valueNote");
	});
});

describe("updateDOM method.", () => {
	describe("When type is 'single'.", () => {
		it("Rebuild plugin structure.", () => {
			view.updateDOM({type: "single", typeConstants: {singleValue: "single", rangeValue: "range"}});

			expect(view.path.parentNode == view.outer).toBeTruthy();
			expect(view.pathPassed.parentNode == view.path).toBeTruthy();
			expect(view.divisions.parentNode == view.outer).toBeTruthy();

			expect(view.handle.parentNode == view.path);
			expect(view.valueNote.parentNode == view.outer);
		});
	});

	describe("When type is 'range'.", () => {
		it("Rebuild plugin structure.", () => {
			view.updateDOM({type: "range", typeConstants: {singleValue: "single", rangeValue: "range"}});

			expect(view.path.parentNode == view.outer).toBeTruthy();
			expect(view.pathPassed.parentNode == view.path).toBeTruthy();
			expect(view.divisions.parentNode == view.outer).toBeTruthy();

			expect(view.handleMin.parentNode == view.path);
			expect(view.handleMax.parentNode == view.path);
			expect(view.valueNoteMin.parentNode == view.outer);
			expect(view.valueNoteMax.parentNode == view.outer);
		});
	});
});

// action

describe("append method.", () => {
	it("Applying slider's roots.", () => {
		view.append();

		expect(view.base.parentNode == view.roots).toBeTruthy();
	});
});

describe("setRoots method.", () => {
	describe("Normal value - DOM el.", () => {
		it("Chaning roots, returns roots.", () => {
			var result = view.setRoots(document.getElementById("root"));

			expect(result).toEqual(document.getElementById("root"));
			expect(result).toEqual(view.roots);
		});
	});

	describe("If you try to set roots as a not DOM el, it will returns undefined.", () => {
		beforeEach(() => {
			view.setRoots(document.body);
		});

		it("Taking NaN, returns undefined.", () => {
			var result = view.setRoots(NaN);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking {}, returns undefined.", () => {
			var result = view.setRoots({});

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking 123, returns undefined.", () => {
			var result = view.setRoots(123);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking null, returns undefined.", () => {
			var result = view.setRoots(null);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking undefined, returns undefined.", () => {
			var result = view.setRoots(undefined);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking false, returns undefined.", () => {
			var result = view.setRoots(false);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking true, returns undefined.", () => {
			var result = view.setRoots(true);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking [], returns undefined.", () => {
			var result = view.setRoots([]);

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});

		it("Taking 'dadaya', returns undefined.", () => {
			var result = view.setRoots("dadaya");

			expect(result).toBeUndefined();
			expect(view.roots).toEqual(document.body);
		});
	});
});

describe("getRoots method.", () => {
	it("Returns slider's roots.", () => {
		var result = view.getRoots();

		expect(helper.isDOMEl(result)).toBeTruthy();
	});
});

describe("setDivisionsCount method.", () => {
	describe("Changing divisions count, returns divisions count.", () => {
		it("Taking 3, returns 3.", () => {
			var result = view.setDivisionsCount(3);

			expect(result).toEqual(3);
			expect(result).toEqual(view.divisionsCount);
		});

		it("Taking 2, returns 2.", () => {
			var result = view.setDivisionsCount(2);

			expect(result).toEqual(2);
			expect(result).toEqual(view.divisionsCount);
		});

		it("Taking 0, returns 0.", () => {
			var result = view.setDivisionsCount(0);

			expect(result).toEqual(0);
			expect(result).toEqual(view.divisionsCount);
		});
	});

	describe("If you try to set divisions count as 1, it will set divisions count to 2.", () => {
		it("Taking 1, changing divisions count to 2.", () => {
			var result = view.setDivisionsCount(1, true);

			expect(result).toEqual(2);
			expect(result).toEqual(view.divisionsCount);
		});
	});

	describe("If you try to set divisions count as not a number or a number, that is less than 0, returns undefined.", () => {
		beforeEach(() => {
			view.setDivisionsCount(3);
		});

		it("Taking -1, returns undefined.", () => {
			var result = view.setDivisionsCount(-1);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking -100, returns undefined.", () => {
			var result = view.setDivisionsCount(-100);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking -100, returns undefined.", () => {
			var result = view.setDivisionsCount(-100);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking undefined, returns undefined.", () => {
			var result = view.setDivisionsCount(undefined);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking NaN, returns undefined.", () => {
			var result = view.setDivisionsCount(NaN);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking false, returns undefined.", () => {
			var result = view.setDivisionsCount(false);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking null, returns undefined.", () => {
			var result = view.setDivisionsCount(null);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking {}, returns undefined.", () => {
			var result = view.setDivisionsCount({});

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking [], returns undefined.", () => {
			var result = view.setDivisionsCount([]);

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
		
		it("Taking 'dadaya', returns undefined.", () => {
			var result = view.setDivisionsCount("dadaya");

			expect(result).toBeUndefined();
			expect(view.divisionsCount).toEqual(3);
		});
	});
});

describe("generateDivisions method.", () => {
	beforeAll(() => {
		view.setDivisionsCount(3);
	});

	it("Generate divisions for slider's.", () => {
		var result = view.generateDivisions();

		expect(helper.isArray(result)).toBeTruthy();
		expect(result.length).toEqual(3);

		for(var i = 0; i < result.length - 1; i++) {
			expect(helper.isDOMEl(result[i])).toBeTruthy();
			expect(result[i].parentNode).toEqual(view.divisions);
		}
	});
});

describe("getDivisionsCount method.", () => {
	it("Returns count of divisions.", () => {
		var result = view.getDivisionsCount();

		expect(result).toEqual(view.divisionsCount);
	});
});

// drawValue

describe("setStyles method.", () => {
	describe("Normal values - listed in stylesConstants. Changes slider's styles, returns new styles.", () => {
		beforeEach(() => {
			view.setStyles({direction: {value: "horizontal", className: "direction"}, theme: {value: "default", className: "theme"}});
		});

		for (var style in view.stylesConstants) {
			for (var constant in view.stylesConstants[style]) {
				it("Taking {" + style + ": {value: " + view.stylesConstants[style][constant] + ", className: 'dadaya'}}, changes direction to 'vertical', class name to 'dadaya'.", () => {
					var props = {};
					props[style] = {value: view.stylesConstants[style][constant], className: "dadaya"};
					var result = view.setStyles(props);

					expect(result[style].value).toEqual(view.stylesConstants[style][constant]);
					expect(result[style].value).toEqual(view.styles[style].value);

					expect(result[style].className).toEqual("dadaya");
					expect(result[style].className).toEqual(view.styles[style].className);
				});
			}
		}

		for (var style in view.stylesConstants) {
			for (var constant in view.stylesConstants[style]) {
				it("Taking {" + style + ": {value: " + view.stylesConstants[style][constant] + "}}, changes direction to 'vertical'.", () => {
					var props = {};
					props[style] = {value: view.stylesConstants[style][constant]};
					var result = view.setStyles(props);

					expect(result[style].value).toEqual(view.stylesConstants[style][constant]);
					expect(result[style].value).toEqual(view.styles[style].value);
				});
			}
		}

		for (var style in view.stylesConstants) {
			it("Taking {" + style + ": {className: 'dadaya'}}, chages class name to 'dadaya'.", () => {
				var props = {};
				props[style] = {className: "dadaya"};
				var result = view.setStyles(props);

				expect(result[style].className).toEqual("dadaya");
				expect(result[style].className).toEqual(view.styles[style].className);
			});
		}
	});

	describe("Normal values - not listed in stylesConstants. Changes slider's styles, returns new styles.", () => {
		beforeEach(() => {
			view.setStyles({direction: {value: "horizontal", className: "direction"}, theme: {value: "default", className: "theme"}});
		});

		it("Taking {theme: {value: 'ayadad', className: 'dadaya'}}, changes theme to 'ayadad', class name to 'dadaya'.", () => {
			var result = view.setStyles({theme: {value: "ayadad", className: "dadaya"}});

			expect(result.theme.value).toEqual("ayadad");
			expect(result.theme.value).toEqual(view.styles.theme.value);

			expect(result.theme.className).toEqual("dadaya");
			expect(result.theme.className).toEqual(view.styles.theme.className);
		});

		it("Taking {theme: {value: 'blue'}}, changes theme to 'blue'.", () => {
			var result = view.setStyles({theme: {value: "blue"}});

			expect(result.theme.value).toEqual("blue");
			expect(result.theme.value).toEqual(view.styles.theme.value);
		});

		it("Taking {theme: {className: 'themes'}}, changes class name to 'themes'.", () => {
			var result = view.setStyles({theme: {className: "themes"}});

			expect(result.theme.className).toEqual("themes");
			expect(result.theme.className).toEqual(view.styles.theme.className);
		});
	});

	describe("If you try to set style, that is listed in constants, as not reserved value, it will not changes it.", () => {
		beforeEach(() => {
			view.setStyles({direction: {value: "horizontal"}});
		});

		it("Taking {direction: {value: 'something'}}, value stays the same.", () => {
			var result = view.setStyles({direction: {value: "something", className: "???"}});
			
			expect(result.direction.value).toEqual("horizontal");
			expect(result.direction.value).toEqual(view.styles.direction.value);
		});
	});

	describe("If you try to set property as not a string, it will not changes it.", () => {
		beforeEach(() => {
			view.setStyles({theme: {value: "default", className: "theme"}, direction: {value: "horizontal", className: "direction"}})
		});

		it("Taking {theme: {value: 'newTheme', className: null}}, className stays the same.", () => {
			var result = view.setStyles({theme: {value: "newTheme", className: null}});

			expect(result.theme.className).toEqual("theme");
			expect(result.theme.className).toEqual(view.styles.theme.className);
		});

		it("Taking {theme: {value: null, className: 'some'}}, className stays the same.", () => {
			var result = view.setStyles({theme: {value: null, className: "some"}});

			expect(result.theme.value).toEqual("default");
			expect(result.theme.value).toEqual(view.styles.theme.value);
		});
	});

	describe("If no one property was changes, returns undefined.", () => {
		beforeEach(() => {
			view.setStyles({direction: {value: "horizontal", className: "direction"}, theme: {value: "default", className: "theme"}})
		});
		
		it("Taking {direction: {value: 'someAnother'}}, returns undefined.", () => {
			var result = view.setStyles({direction: {value: "someAnother"}});

			expect(result).toBeUndefined();
			expect(view.styles.direction.value).toEqual("horizontal");
		});	
	});
});

// applyStyles

describe("getStyles method.", () => {
	it("Returns {styles: *styles*, stylesConstants: *list of reserved styles*}.", () => {
		var result = view.getStyles();

		expect(helper.isObject(result)).toBeTruthy();
		expect(result.styles).toBeDefined();
		expect(helper.isObject(result.styles)).toBeTruthy();
		expect(helper.isObject(result.stylesConstants)).toBeTruthy();
	});
});

describe("setValueNoteDisplay method.", () => {
	describe("Changing display of value note, returns value of display.", () => {
		it("Taking true, returns true.", () => {
			var result = view.setValueNoteDisplay(true);

			expect(result).toBeTruthy();
		});

		it("Taking false, returns false.", () => {
			var result = view.setValueNoteDisplay(false);

			expect(result).toBeFalsy();
		});
	});

	describe("If you try to set display as a not boolean value, it returns undefined.", () => {
		beforeAll(() => {
			view.setValueNoteDisplay(true);
		});

		it("Taking '123', returns undefined.", () => {
			var result = view.setValueNoteDisplay("123");

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});

		it("Taking 123, returns undefined.", () => {
			var result = view.setValueNoteDisplay(123);

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});

		it("Taking {}, returns undefined.", () => {
			var result = view.setValueNoteDisplay({});

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});

		it("Taking [], returns undefined.", () => {
			var result = view.setValueNoteDisplay([]);

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});

		it("Taking undefined, returns undefined.", () => {
			var result = view.setValueNoteDisplay(undefined);

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});

		it("Taking null, returns undefined.", () => {
			var result = view.setValueNoteDisplay(null);

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});

		it("Taking NaN, returns undefined.", () => {
			var result = view.setValueNoteDisplay(NaN);

			expect(result).toBeUndefined();
			expect(view.valueNoteDisplay).toEqual(true);
		});
	});
});

describe("applyValueNoteDisplay method.", () => {
	describe("When display is true.", () => {
		beforeAll(() => {
			view.setValueNoteDisplay(true);
		});

		it("Applying display of value note, returns display.", () => {
			var result = view.applyValueNoteDisplay();

			expect(result).toBeTruthy();
			expect(view.valueNote).toHaveClass(view.valueNote.classList[0] + "_display_visible");
			expect(view.valueNoteMin).toHaveClass(view.valueNoteMin.classList[0] + "_display_visible");
			expect(view.valueNoteMax).toHaveClass(view.valueNoteMax.classList[0] + "_display_visible");
		});
	});

	describe("When display is false.", () => {
		beforeAll(() => {
			view.setValueNoteDisplay(false);
		});

		it("Applying display of value note, returns display.", () => {
			var result = view.applyValueNoteDisplay();

			expect(result).toBeFalsy();
			expect(view.valueNote).toHaveClass(view.valueNote.classList[0] + "_display_hidden");
			expect(view.valueNoteMin).toHaveClass(view.valueNoteMin.classList[0] + "_display_hidden");
			expect(view.valueNoteMax).toHaveClass(view.valueNoteMax.classList[0] + "_display_hidden");
		});
	});
});

describe("getValueNoteDisplay method.", () => {
	it("Returns display of value note.", () => {
		var result = view.getValueNoteDisplay();

		expect(result).toEqual(view.valueNoteDisplay);
	});
});