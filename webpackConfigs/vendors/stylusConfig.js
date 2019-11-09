import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function(options) {
	var options = options ? options : {};
	var path = options.path;
	
	return {
		module: {
			rules: [
				{
					test: /\.(styl|css)/,
					use: [
						"style-loader",
						MiniCssExtractPlugin.loader,
						{ loader: "css-loader", options: { url: false } },
						"stylus-relative-loader"
					],
					exclude: /[\\/]node_modules[\\/]/
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: path
			})
		]
	};
}