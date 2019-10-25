module.exports = function(options) {
	options = options ? options : {};
	var workFolder = options.workFolder;
	
	return {
		mode: "development",
		entry: {
			"showcase": workFolder + "/src/showcase/index.js",
			"styles": workFolder + "/src/showcase/static.js",
			"wrunner-native": workFolder + "/src/slider-js-native/wrunner-native.js",
			"wrunner-jquery": workFolder + "/src/slider-jquery/wrunner-jquery.js",
			"wrunner-default-theme": workFolder + "/src/themes/wrunnerDefaultTheme/wrunner-default-theme.js"
		},
		output: {
			path: workFolder + "/prod/",
			filename: (data) => {
				switch(data.chunk.name) {
					case "styles":
					case "wrunner-default-theme":
						return "scripts/tmp/[name].js";
					case "showcase":
						return "scripts/scripts.js";
					default: 
						return "[name].js";
				}
			}
		},
		module: {
			rules: [

			]
		},
		plugins: [
		
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/](vendors|node_modules)[\\/]/,
						name: "vendors",
						filename: "[name].js",
						chunks: "all"
					},
					default: false
				}
			}
		},
		resolve : {
			
		},
		devtool: "none",
		devServer: {
			stats: "errors-only"
		}
	};
};
