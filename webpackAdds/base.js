/*
    Файл с основной информацией.
*/

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
	return {
		mode: 'development',
		entry: {
			'base': base + '/dev/index.js',
			'static': base + '/dev/static.js'
		},
		output: {
			path: base + '/prod/',
			filename: 'scripts/[name].js'
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
					commons: {
						name: 'vendors',
						chunks: 'all',
						test: /[\\/]vendors[\\/]/
					}
				}
			}
		},
	    resolve : {
	    	
	    },
	    devtool: 'none'
	}
}

// -whiteGloom
