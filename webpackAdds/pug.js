/*
    Файл с инструкциями для обработки Pug файлов.
*/

const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
    return {
        module: {
            rules: [
				{
				    test: /\.(pug|html)/,
				    loader: 'pug-loader',
					exclude: /[\\/]node_modules[\\/]/
				}
            ]
        },
        plugins: [
			new HTMLWebpackPlugin({
				template: base + "/dev/views/index.pug",
				filename: 'index.html',
				inject: false,
				minify: false
			})
		]
    }
};

// -whiteGloom
