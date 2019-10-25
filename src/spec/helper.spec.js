// Requirements
const jsdom = require("jsdom");

const {JSDOM} = jsdom;
const window = (new JSDOM("<body><div id='root'><div class='cls'>text node</div></div></body>", { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;


import helper from "@helper";

describe("inNumber method.", () => {
	describe("If the value is a finite number or a string, that may be turned into a number, returns true.", () => {
		it("Taking 50, returns true", () => {
			expect(helper.isNumber(50)).toBeTruthy();
		});
		
		it("Taking -100, returns true", () => {
			expect(helper.isNumber(50)).toBeTruthy();
		});

		it("Taking 0, returns true", () => {
			expect(helper.isNumber(0)).toBeTruthy();
		});
		
		it("Taking '100', returns true", () => {
			expect(helper.isNumber("100")).toBeTruthy();
		});
		
		it("Taking '0', returns true", () => {
			expect(helper.isNumber("0")).toBeTruthy();
		});
	});

	describe("If the value is not a finite number or a string, that may be turned into a number, returns false.", () => {
		it("Taking NaN, returns false.", () => {
			expect(helper.isNumber(NaN)).toBeFalsy();
		});

		it("Taking {}, returns false.", () => {
			expect(helper.isNumber({})).toBeFalsy();
		});

		it("Taking [], returns false.", () => {
			expect(helper.isNumber([])).toBeFalsy();
		});

		it("Taking true, returns false.", () => {
			expect(helper.isNumber(true)).toBeFalsy();
		});

		it("Taking false, returns false.", () => {
			expect(helper.isNumber(false)).toBeFalsy();
		});

		it("Taking 'dadaya', returns false.", () => {
			expect(helper.isNumber("dadaya")).toBeFalsy();
		});

		it("Taking 'da123', returns false.", () => {
			expect(helper.isNumber("da123")).toBeFalsy();
		});

		it("Taking undefined, returns false.", () => {
			expect(helper.isNumber(undefined)).toBeFalsy();
		});

		it("Taking Infinity, returns false.", () => {
			expect(helper.isNumber(Infinity)).toBeFalsy();
		});

		it("Taking null, returns true.", () => {
			expect(helper.isDOMEl(null)).toBeFalsy();
		});
	});
});

describe("toNumber method.", () => {
	describe("If the value is a finite number or a string, that may be turned into a number, returns value turned into a number.", () => {
		it("Taking 50, returns true", () => {
			expect(helper.toNumber(50)).toEqual(50);
		});
		
		it("Taking -100, returns true", () => {
			expect(helper.toNumber(50)).toEqual(50);
		});

		it("Taking 0, returns true", () => {
			expect(helper.toNumber(0)).toEqual(0);
		});
		
		it("Taking '100', returns true", () => {
			expect(helper.toNumber("100")).toEqual(100);
		});
		
		it("Taking '0', returns true", () => {
			expect(helper.toNumber("0")).toEqual(0);
		});
	});

	describe("If the value is not a finite number or a string, that may be turned into a number, returns false.", () => {
		it("Taking NaN, returns false.", () => {
			expect(helper.toNumber(NaN)).toBeFalsy();
		});

		it("Taking {}, returns false.", () => {
			expect(helper.toNumber({})).toBeFalsy();
		});

		it("Taking [], returns false.", () => {
			expect(helper.toNumber([])).toBeFalsy();
		});

		it("Taking true, returns false.", () => {
			expect(helper.toNumber(true)).toBeFalsy();
		});

		it("Taking false, returns false.", () => {
			expect(helper.toNumber(false)).toBeFalsy();
		});

		it("Taking 'dadaya', returns false.", () => {
			expect(helper.toNumber("dadaya")).toBeFalsy();
		});

		it("Taking 'da123', returns false.", () => {
			expect(helper.toNumber("da123")).toBeFalsy();
		});

		it("Taking undefined, returns false.", () => {
			expect(helper.toNumber(undefined)).toBeFalsy();
		});

		it("Taking Infinity, returns false.", () => {
			expect(helper.toNumber(Infinity)).toBeFalsy();
		});

		it("Taking null, returns true.", () => {
			expect(helper.isDOMEl(null)).toBeFalsy();
		});
	});
});

describe("isObject method.", () => {
	describe("If type of value is a object and it is not a null, returns true.", () => {
		it("Taking {}, returns true.", () => {
			expect(helper.isObject({})).toBeTruthy();
		});

		it("Taking [], returns true.", () => {
			expect(helper.isObject([])).toBeTruthy();
		});
	});

	describe("If type of value is not a object and it is a null, returns false.", () => {
		it("Taking null, returns false.", () => {
			expect(helper.isObject(null)).toBeFalsy();
		});

		it("Taking 'dadaya', returns false.", () => {
			expect(helper.isObject("dadaya")).toBeFalsy();
		});

		it("Taking '123', returns false.", () => {
			expect(helper.isObject("123")).toBeFalsy();
		});

		it("Taking 123, returns false.", () => {
			expect(helper.isObject(123)).toBeFalsy();
		});

		it("Taking undefined, returns false.", () => {
			expect(helper.isObject(undefined)).toBeFalsy();
		});

		it("Taking NaN, returns false.", () => {
			expect(helper.isObject(NaN)).toBeFalsy();
		});

		it("Taking false, returns false.", () => {
			expect(helper.isObject(false)).toBeFalsy();
		});

		it("Taking true, returns false.", () => {
			expect(helper.isObject(true)).toBeFalsy();
		});

		it("Taking null, returns true.", () => {
			expect(helper.isDOMEl(null)).toBeFalsy();
		});
	});
});

describe("isDOMEl method.", () => {
	describe("If element is a dom element, returns true.", () => {
		it("Taking document.body, returns true.", () => {
			expect(helper.isDOMEl(document.body)).toBeTruthy();
		});

		it("Taking document.getElementById('root'), returns true.", () => {
			expect(helper.isDOMEl(document.getElementById("root"))).toBeTruthy();
		});

		it("Taking document.getElementsByClassName('cls')[0], returns true.", () => {
			expect(helper.isDOMEl(document.getElementsByClassName("cls")[0])).toBeTruthy();
		});
	});

	describe("If element is not a dom element, returns false.", () => {
		it("Taking {}, returns true.", () => {
			expect(helper.isDOMEl({})).toBeFalsy();
		});

		it("Taking { nodeType: 1 }, returns true.", () => {
			expect(helper.isDOMEl({ nodeType: 1 })).toBeFalsy();
		});

		it("Taking [], returns true.", () => {
			expect(helper.isDOMEl([])).toBeFalsy();
		});

		it("Taking 'dadaya', returns true.", () => {
			expect(helper.isDOMEl("dadaya")).toBeFalsy();
		});

		it("Taking '123', returns true.", () => {
			expect(helper.isDOMEl("123")).toBeFalsy();
		});

		it("Taking 123, returns true.", () => {
			expect(helper.isDOMEl(123)).toBeFalsy();
		});

		it("Taking false, returns true.", () => {
			expect(helper.isDOMEl(false)).toBeFalsy();
		});

		it("Taking true, returns true.", () => {
			expect(helper.isDOMEl(true)).toBeFalsy();
		});

		it("Taking undefined, returns true.", () => {
			expect(helper.isDOMEl(undefined)).toBeFalsy();
		});

		it("Taking NaN, returns true.", () => {
			expect(helper.isDOMEl(NaN)).toBeFalsy();
		});

		it("Taking null, returns true.", () => {
			expect(helper.isDOMEl(null)).toBeFalsy();
		});
	});
});