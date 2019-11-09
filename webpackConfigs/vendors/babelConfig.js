export default function() {
	return {
		module: {
			rules: [
				{
					test: /\.(js)/,
					loader: "babel-loader",
					exclude: /[\\/]node_modules[\\/]/
				}
			]
		}
	};
}