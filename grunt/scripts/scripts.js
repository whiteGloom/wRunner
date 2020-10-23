/**
 * Configuration for processing styles
 * Provides:
 * - Rollup compiler
 * - ESLint linter
 *
 * Requires:
 * - Exec: "npm i -D @babel/core @babel/node @babel/preset-env @rollup/plugin-babel @rollup/plugin-json @rollup/plugin-node-resolve @rollup/plugin-commonjs grunt-eslint grunt-rollup jasmine"
 */
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').nodeResolve;


module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-rollup');
  grunt.loadNpmTasks('grunt-eslint');


  /* Configurations for tasks */
  grunt.config.set('rollup', {
    options: {
      plugins: [
        /* Converts CommonJS modules to ES6, so they can be included in a Rollup bundle */
        commonjs({
          include: /node_modules/
        }),

        /* Converts .json files into es modules */
        json(),

        /* Convert modern js into old specifications */
        babel({
          exclude: '/node_modules/',
          babelHelpers: 'bundled' // Also, you can check the "plugin-transform-runtime" plugin for Babel to cut final size.
        }),

        /**
         * Allows you to inject modules into your built package
         * Example: "resolveOnly: ['@rollup/plugin-babel']"
         */
        resolve({
          resolveOnly: []
        })
      ]
    },
    main: {
      files: {
        'dist/index.js': 'src/index.js'
      }
    }
  });

  grunt.config.set('eslint', {
    options: {
      failOnError: false
    },
    target: ['src/**/*.js']
  });

  grunt.config.merge({
    scripts: {
      files: './src/**/*.js',
      tasks: ['scripts']
    }
  });


  /* Tasks */
  grunt.registerTask('scripts', ['rollup:main', 'eslint']);
};
