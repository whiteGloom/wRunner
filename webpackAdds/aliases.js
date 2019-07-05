/*
    Файл со списком сокращений.
*/

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
    return {
        resolve : {
            alias: {
            	'wrunner': base + '/dev/vendors/wrunner'
            }
        }
    }
};

// -whiteGloom