// External modules
import WebpackLoader from "webpack-loader";

// Local modules
import makeMainConfig from "./webpackConfigs/mainConfig.js";
import makeBabelConfig from "./webpackConfigs/babelConfig.js";
import makePugConfig from "./webpackConfigs/pugConfig.js";
import makeStylusConfig from "./webpackConfigs/stylusConfig.js";
import makeStaticsConfig from "./webpackConfigs/staticsConfig.js";
import makeAliasesConfig from "./webpackConfigs/aliasesConfig.js";

var workFolder = process.cwd();
var npmArguments = process.argv.slice(2);
var webpackLoader = new WebpackLoader();

// Config
webpackLoader.makeNewConfig("main", [
	makeMainConfig({workFolder}),
	makeBabelConfig(),
	makePugConfig({workFolder}),
	makeStylusConfig(),
	makeStaticsConfig(),
	makeAliasesConfig({workFolder})
], "production");

webpackLoader.addToDevServerConfig({stats: "errors-only"});

// Init
// If mode is build
if (npmArguments.indexOf("build") > -1) webpackLoader.run();

// If mode is build-watch
if (npmArguments.indexOf("build-watch") > -1) webpackLoader.runWatch();

// If mode is build-live
if (npmArguments.indexOf("build-live") > -1) webpackLoader.runDevServer();
