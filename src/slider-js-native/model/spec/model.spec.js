// Requirements
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const window = (new JSDOM('<body><div id="root"></div></body>', { runScripts: "outside-only" })).window;
global.window = window;
global.document = window.document;

describe("Test method", () => {
	it("Test query", () => {
		expect(123).toEqual(123);
	});
})