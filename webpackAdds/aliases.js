/*
    Файл со списком сокращений.
*/

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
    return {
        resolve : {
            alias: {
                'helper': base + '/src/helper.js',
                'event': base + '/src/event.js',
                'wrunner-nat': base + '/src/wrunner-native',
                'wrunner-jq': base + '/src/wrunner-jquery'
            }
        }
    }
};