import RemoveServiceOutputsPlugin from 'remove-service-outputs-plugin';

function config(options = {}) {
  const { workFolder } = options;

  return {
    entry: {
      scripts: `${workFolder}/src/showcase/index.js`,
      styles: `${workFolder}/src/showcase/static.js`,
      'wrunner-native': `${workFolder}/src/wRunner/wrunner-native.js`,
      'wrunner-jquery': `${workFolder}/src/wRunner/wrunner-jquery.js`,
      'wrunner-default-theme': `${workFolder}/src/themes/wrunnerDefaultTheme/wrunner-default-theme.js`,
    },
    output: {
      path: `${workFolder}/docs/`,
      filename: (data) => {
        switch (data.chunk.name) {
          default:
            return 'scripts/[name].js';
        }
      },
    },
    plugins: [
      new RemoveServiceOutputsPlugin([
        ['styles', /.*\.js$/],
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
            filename: './scripts/[name].js',
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
