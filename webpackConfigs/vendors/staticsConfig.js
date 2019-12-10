function config() {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|gif|png|svg|ico)/,
          loader: 'file-loader',
          options: {
            outputPath: 'static/images',
            name: '[name].[ext]',
          },
          exclude: /[\\/](node_modules|fonts)[\\/]/,
        },
        {
          test: /\.(woff|otf|ttf|eot)/,
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts',
            name: '[name].[ext]',
          },
          exclude: /[\\/]node_modules[\\/]/,
        },
        {
          test: /\.svg$/,
          loader: 'file-loader',
          options: {
            outputPath: 'static/fonts',
            name: '[name].[ext]',
          },
          include: /[\\/]fonts[\\/]/,
        },
        {
          test: /\.mp4$/,
          loader: 'file-loader',
          options: {
            outputPath: 'static/videos',
            name: '[name].[ext]',
          },
          include: /[\\/]videos[\\/]/,
        },
      ],
    },
  };
}

module.exports = config;
