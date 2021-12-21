const RemoveServiceOutputsPlugin = require('remove-service-outputs-plugin').default;
const merge = require('webpack-merge');
const aliasesConfig = require('./vendors/aliasesConfig');
const babelConfig = require('./vendors/babelConfig');
const stylusConfig = require('./vendors/stylusConfig');
const staticsConfig = require('./vendors/staticsConfig');
const devserverConfig = require('./vendors/devserverConfig');

function config(options = {}) {
  const { workFolder } = options;

  return merge([
    babelConfig(),
    stylusConfig({ path: './themes/[name].css' }),
    staticsConfig(),
    aliasesConfig({ workFolder }),
    devserverConfig(),
    {
      mode: 'production',
      entry: {
        'wrunner-native': `${workFolder}/src/wRunner/wrunner-native.js`,
        'wrunner-jquery': `${workFolder}/src/wRunner/wrunner-jquery.js`,
        'wrunner-default-theme': `${workFolder}/src/wRunner/themes/wrunner-default-theme/wrunner-default-theme.js`,
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
    },
  ]);
}

module.exports = config;
