// External modules
import WebpackLoader from "webpack-loader";

// Local modules
import getAliasesConfig from "./webpackConfigs/vendors/aliasesConfig.js";
import getBabelConfig from "./webpackConfigs/vendors/babelConfig.js";
import getStylusConfig from "./webpackConfigs/vendors/stylusConfig.js";
import getPugConfig from "./webpackConfigs/vendors/pugConfig.js";
import getStaticsConfig from "./webpackConfigs/vendors/staticsConfig.js";

import getMainConfig from "./webpackConfigs/mainConfig.js";
import getShowcaseConfig from "./webpackConfigs/showcaseConfig.js";


// Variables
var workFolder = process.cwd();
var npmArguments = process.argv.slice(2);
var webpackLoader = new WebpackLoader();


// Config
webpackLoader.makeNewConfig("main", [
	getMainConfig({workFolder}),
	getBabelConfig(),
	getStylusConfig({path: "/themes/[name].css"}),
	getStaticsConfig(),
	getAliasesConfig({workFolder})
], "production");

webpackLoader.makeNewConfig("showcase", [
	getShowcaseConfig({workFolder}),
	getBabelConfig(),
	getPugConfig({workFolder}),
	getStylusConfig({path: "static/styles/[name].css"}),
	getStaticsConfig(),
	getAliasesConfig({workFolder})
], "production");

webpackLoader.addToDevServerConfig({
	before: function(app, server) {
		app.get("/", (req, res) => {
			res.redirect("/docs/docs/");
		});
	},
	stats: "errors-warnings",
	publicPath: "/docs/",
	overlay: true,
	open: true
});


// Init
// If mode is build
if (npmArguments.indexOf("build") > -1) webpackLoader.run();

// If mode is build-watch
if (npmArguments.indexOf("build-watch") > -1) webpackLoader.runWatch();

// If mode is build-live
if (npmArguments.indexOf("build-live") > -1) webpackLoader.runDevServer();
