function config() {
  return {
    module: {
      rules: [
        {
          test: /\.(js)/,
          loader: 'babel-loader',
          exclude: /[\\/]node_modules[\\/]/,
        },
      ],
    },
  };
}

module.exports = config;
