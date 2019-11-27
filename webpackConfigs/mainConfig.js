import RemoveServiceOutputsPlugin from 'remove-service-outputs-plugin';

function config(options = {}) {
  const { workFolder } = options;

  return {
    entry: {
      'wrunner-native': `${workFolder}/src/wRunner/wrunner-native.js`,
      'wrunner-jquery': `${workFolder}/src/wRunner/wrunner-jquery.js`,
      'wrunner-default-theme': `${workFolder}/src/themes/wrunnerDefaultTheme/wrunner-default-theme.js`,
    },
    output: {
      path: `${workFolder}/prod/`,
      filename: (data) => {
        switch (data.chunk.name) {
          default:
            return '[name].js';
        }
      },
    },
    plugins: [
      new RemoveServiceOutputsPlugin([
        ['wrunner-default-theme', /.*\.js$/],
      ]),
    ],
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/](vendors|node_modules)[\\/]/,
            name: 'vendors',
            filename: '[name].js',
            chunks: 'all',
          },
          default: false,
        },
      },
    },
    devtool: 'none',
  };
}

export default config;
