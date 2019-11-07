import RemoveServiceOutputsPlugin from "remove-service-outputs-plugin";

export default function(options) {
	options = options ? options : {};
	var workFolder = options.workFolder;
	
	return {
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
					case "showcase":
						return "scripts/scripts.js";
					default: 
						return "[name].js";
				}
			}
		},
		plugins: [
			new RemoveServiceOutputsPlugin([
				["styles", /.*\.js$/],
				["wrunner-default-theme", /.*\.js$/]
			])
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
		devtool: "none"
	};
}
