// Requirements
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
const window = (new JSDOM("<body><div id='root'></div></body>", { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;


import helper from "@helper";
import viewModule from "../view.js";

var view = new viewModule();

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
		view.generateDivisions();

		expect(view.divisionsList.length).toEqual(3);

		for(var i = 0; i < view.divisionsList.length; i++) {
			expect(helper.isDOMEl(view.divisionsList[i])).toBeTruthy();
			expect(view.divisionsList[i].parentNode).toEqual(view.divisions);
		}
	});
});

describe("getDivisionsCount method.", () => {
	it("Returns count of divisions.", () => {
		var result = view.getDivisionsCount();

		expect(result).toEqual(view.divisionsCount);
	});
});

describe("setTheme method.", () => {
	describe("Changes slider's theme, returns theme.", () => {
		it("Taking 'someTheme', returns 'someTheme'", () => {
			var result = view.setTheme("someTheme");

			expect(result).toEqual("someTheme");
			expect(result).toEqual(view.theme.value);
		});

		it("Taking 'someAnotherTheme', returns 'someAnotherTheme'", () => {
			var result = view.setTheme("someAnotherTheme");

			expect(result).toEqual("someAnotherTheme");
			expect(result).toEqual(view.theme.value);
		});
	});

	describe("If you try to set theme as a not string, returns undefined.", () => {
		beforeEach(() => {
			view.setTheme("default");
		});

		it("Taking NaN, returns undefined", () => {
			var result = view.setTheme(NaN);

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});

		it("Taking true, returns undefined", () => {
			var result = view.setTheme(true);

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});

		it("Taking false, returns undefined", () => {
			var result = view.setTheme(false);

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});

		it("Taking 123, returns undefined", () => {
			var result = view.setTheme(123);

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});

		it("Taking {}, returns undefined", () => {
			var result = view.setTheme({});

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});

		it("Taking undefined, returns undefined", () => {
			var result = view.setTheme(undefined);

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});

		it("Taking null, returns undefined", () => {
			var result = view.setTheme(null);

			expect(result).toBeUndefined();
			// Theme stays the same.
			expect(view.theme.value).toEqual("default");
		});
	});
});

describe("getTheme method.", () => {
	beforeAll(() => {
		view.setTheme("default");
	});

	it("Returns theme.", () => {
		var result = view.getTheme();

		expect(result).toEqual("default");
		expect(result).toEqual(view.theme.value);
	});
});

describe("setDirection method.", () => {
	describe("Normal values - reserved in direction constants (watch getDirection method). Changes slider's direction, returns {value: *direction*, constants: *list of reserved values*}.", () => {
		for (var constant in view.directionConstants) {
			it("Taking " + view.directionConstants[constant] + ", changes direction to " + constant, () => {
				var result = view.setDirection(view.directionConstants[constant]);

				expect(result.value).toEqual(view.directionConstants[constant]);
				expect(result.value).toEqual(view.direction.value);
				expect(result.constants).toEqual(view.directionConstants);
			});
		}
	});

	describe("If you try to set direction as a not string, returns undefined.", () => {
		beforeEach(() => {
			view.setDirection("horizontal");
		});

		it("Taking 'SomeNotListed', returns undefined", () => {
			var result = view.setDirection("SomeNotListed");

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking NaN, returns undefined", () => {
			var result = view.setDirection(NaN);

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking true, returns undefined", () => {
			var result = view.setDirection(true);

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking false, returns undefined", () => {
			var result = view.setDirection(false);

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking 123, returns undefined", () => {
			var result = view.setDirection(123);

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking {}, returns undefined", () => {
			var result = view.setDirection({});

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking undefined, returns undefined", () => {
			var result = view.setDirection(undefined);

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});

		it("Taking null, returns undefined", () => {
			var result = view.setDirection(null);

			expect(result).toBeUndefined();
			// Direction stays the same.
			expect(view.direction.value).toEqual("horizontal");
		});
	});
});

describe("getDirection method.", () => {
	beforeAll(() => {
		view.setDirection("horizontal");
	});

	it("Returns {value: *direction*, constants: *list of reserved values*}", () => {
		var result = view.getDirection();

		expect(result.value).toEqual("horizontal");
		expect(result.constants).toEqual(view.directionConstants);
	});
});

describe("applyStyles method.", () => {
	beforeEach(() => {
		view.setDirection("horizontal");
		view.setTheme("default");
	});

	it("Applying theme and direction to slider's elements.", () => {
		view.applyStyles();

		var els = [
			view.base, view.outer,
			view.path, view.pathPassed,
			view.divisions,	view.handle,
			view.handleMin, view.handleMax,
			view.valueNote, view.valueNoteMin,
			view.valueNoteMax
		].concat(view.divisionsList);

		for (var i = 0; i < els.length; i++) {
			var el = els[i];

			expect(el).toHaveClass(el.classList[0] + "_theme_default");
			expect(el).toHaveClass(el.classList[0] + "_direction_horizontal");
		}
	});

	it("Removes old themes.", () => {
		view.applyStyles();

		view.setDirection("vertical");
		view.setTheme("some");

		view.applyStyles();

		var els = [
			view.base, view.outer,
			view.path, view.pathPassed,
			view.divisions,	view.handle,
			view.handleMin, view.handleMax,
			view.valueNote, view.valueNoteMin,
			view.valueNoteMax
		].concat(view.divisionsList);

		for (var i = 0; i < els.length; i++) {
			var el = els[i];
			expect(el).not.toHaveClass(el.classList[0] + "_theme_default");
			expect(el).not.toHaveClass(el.classList[0] + "_direction_horizontal");
		}
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