module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');


  /* Configurations for tasks */
  grunt.config.init({
    concurrent: {
      /**
       * Put here your concurrent scripts
       * Example: "web: ['scripts', 'styles']"
       */
      web: ['scripts', 'styles']
    },
    clean: { // Be careful when setting this script.
      options: {
        'no-write': false
      },
      dist: ['dist/*']
    }
  });

  /* Uncomment line below and follow the instructions in the task file if you want to compile scripts */ // eslint-disable-next-line
  grunt.loadTasks('grunt/scripts');  // eslint-disable-line

  /* Uncomment line below and follow the instructions in the task file if you want to compile styles */ // eslint-disable-next-line
  grunt.loadTasks('grunt/styles');


  /**
   * Main tasks.
   * For the first add the needed tasks into "build" task
   * Example: "grunt.registerTask('build', ['clean', 'concurrent:web']);"
   */
  grunt.registerTask('build', ['clean', 'concurrent:web']);
  grunt.registerTask('watcher', ['build', 'watch']);

  grunt.registerTask('default', ['build']);
};
