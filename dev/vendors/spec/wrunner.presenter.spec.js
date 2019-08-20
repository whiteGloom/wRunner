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
console.log(isNumber(5))