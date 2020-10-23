/**
 * Configuration for processing styles
 * Provides:
 * - Stylus preprocessor
 *
 * Requires:
 * - Exec: "npm i -D grunt-contrib-stylus"
 */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-stylus');

  /* Configurations for tasks */
  grunt.config.set('stylus', {
    main: {
      files: {
        'dist/css.css': 'src/index.styl'
      }
    }
  });

  grunt.config.merge({
    styles: {
      files: './src/**/*.styl',
      tasks: ['styles']
    }
  });

  /* Tasks */
  grunt.registerTask('styles', ['stylus:main']);
};
