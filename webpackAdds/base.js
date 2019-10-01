/*
	Файл с основной информацией.
*/

module.exports = function(options) {
	var options = options ? options : {};
	var base = options.base;
	return {
		mode: 'development',
		entry: {
			'showcase': base + '/src/showcase/index.js',
			'styles': base + '/src/showcase/static.js',
			'wrunner-native': base + '/src/slider-js-native/wrunner-native.js',
			'wrunner-jquery': base + '/src/slider-jquery/wrunner-jquery.js',
			'wrunner-default-theme': base + '/src/themes/wrunnerDefaultTheme/wrunner-default-theme.js',
		},
		output: {
			path: base + '/prod/',
			filename: (data) => {
				switch(data.chunk.name) {
					case 'styles':
					case 'wrunner-default-theme':
						return 'scripts/tmp/[name].js';
						break;
					case 'showcase':
						return 'scripts/scripts.js';
						break;
					default: 
						return '[name].js';
						break;
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
						name: 'vendors',
						filename: '[name].js',
						chunks: 'all'
					},
					default: false
				}
			}
		},
		resolve : {
			
		},
		devtool: 'none',
		devServer: {
			stats: 'errors-only'
		}
	}
}
