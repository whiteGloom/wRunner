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
	describe("", () => {
		
	});
});