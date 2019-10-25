const packageAliases = require("../../package.json")._moduleAliases;

module.exports = function(options) {
	options = options ? options : {};
	var workFolder = options.workFolder;

	var aliases = {};
	for(var key in packageAliases) {
		aliases[key] = workFolder + packageAliases[key].slice(1);
	}

	return {
		resolve: {
			alias: aliases
		}
	};
};