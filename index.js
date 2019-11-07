// External modules
import webpackMerge from "webpack-merge";
import WebpackLoader from "webpack-loader";

// Local modules
import npmHelper from "./src/npmHelper.js";
import makeMainConfig from "./webpackConfigs/mainConfig.js";
import makeBabelConfig from "./webpackConfigs/babelConfig.js";
import makePugConfig from "./webpackConfigs/pugConfig.js";
import makeStylusConfig from "./webpackConfigs/stylusConfig.js";
import makeStaticsConfig from "./webpackConfigs/staticsConfig.js";
import makeAliasesConfig from "./webpackConfigs/aliasesConfig.js";

var webpackLoader = new WebpackLoader();
var workFolder = process.cwd();
var npmArguments = process.argv.slice(2);

webpackLoader.makeNewConfig("main", [
	makeMainConfig({workFolder}),
	makeBabelConfig(),
	makePugConfig({workFolder}),
	makeStylusConfig(),
	makeStaticsConfig(),
	makeAliasesConfig({workFolder})
], "production");

webpackLoader.addToDevServerConfig({stats: "errors-only"});

// If mode is build
if (npmHelper.checkTag(npmArguments, "build")) webpackLoader.run();

// If mode is build-watch
if (npmHelper.checkTag(npmArguments, "build-watch")) webpackLoader.runWatch();

// If mode is build-live
if (npmHelper.checkTag(npmArguments, "build-live")) webpackLoader.runDevServer();
