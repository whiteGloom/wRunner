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

export default config;
