/*
    Файл с инструкциями для обработки Stylus и CSS файлов.
*/

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(options) {
    var options = options ? options : {};
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
            new MiniCssExtractPlugin({filename: "static/styles/styles.css"})
        ]
    }
};

// -whiteGloom
