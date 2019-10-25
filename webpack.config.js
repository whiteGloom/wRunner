// External modules
const merge	= require('webpack-merge');

// Local modules
const mainConfig = require("./webpackData/configs/mainConfig.js");
const babelConfig = require("./webpackData/configs/babelConfig.js");
const pugConfig = require("./webpackData/configs/pugConfig.js");
const stylusConfig = require("./webpackData/configs/stylusConfig.js");
const staticsConfig = require("./webpackData/configs/staticsConfig.js");
const aliasesConfig = require("./webpackData/configs/aliasesConfig.js");

var workFolder = process.cwd();

module.exports = function() {
	return merge([
		mainConfig({workFolder}),
		babelConfig(),
		pugConfig({workFolder}),
		stylusConfig(),
		staticsConfig(),
		aliasesConfig({workFolder})
	])
}
