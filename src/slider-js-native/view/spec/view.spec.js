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
			var result = view.setValueNoteDisplay('123');

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

describe("getValueNoteDisplay method.", () => {
	it("Returns display of value note.", () => {
		var result = view.getValueNoteDisplay();

		expect(result).toEqual(view.valueNoteDisplay);
	});
});