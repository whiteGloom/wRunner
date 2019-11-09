// External modules
import WebpackLoader from "webpack-loader";

// Local modules
import makeMainConfig from "./webpackConfigs/mainConfig.js";
import makeShowcaseConfig from "./webpackConfigs/showcaseConfig.js";
import makeBabelConfig from "./webpackConfigs/vendors/babelConfig.js";
import makePugConfig from "./webpackConfigs/vendors/pugConfig.js";
import makeStylusConfig from "./webpackConfigs/vendors/stylusConfig.js";
import makeStaticsConfig from "./webpackConfigs/vendors/staticsConfig.js";
import makeAliasesConfig from "./webpackConfigs/vendors/aliasesConfig.js";

var workFolder = process.cwd();
var npmArguments = process.argv.slice(2);
var webpackLoader = new WebpackLoader();

// Config
webpackLoader.makeNewConfig("showcase", [
	makeShowcaseConfig({workFolder}),
	makeBabelConfig(),
	makePugConfig({workFolder}),
	makeStylusConfig({path: "static/styles/[name].css"}),
	makeStaticsConfig(),
	makeAliasesConfig({workFolder})
], "production");

webpackLoader.makeNewConfig("main", [
	makeMainConfig({workFolder}),
	makeBabelConfig(),
	makeStylusConfig({path: "/themes/[name].css"}),
	makeStaticsConfig(),
	makeAliasesConfig({workFolder})
], "production");

webpackLoader.addToDevServerConfig({stats: "errors-only", contentBase: "./docs/", historyApiFallback: true});

// Init
// If mode is build
if (npmArguments.indexOf("build") > -1) webpackLoader.run();

// If mode is build-watch
if (npmArguments.indexOf("build-watch") > -1) webpackLoader.runWatch();

// If mode is build-live
if (npmArguments.indexOf("build-live") > -1) webpackLoader.runDevServer();
