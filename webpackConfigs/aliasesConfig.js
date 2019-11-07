const packageAliases = require("../package.json")._moduleAliases;

module.exports = function(options) {
	options = options ? options : {};
	
	var aliases = {};
	for(var key in packageAliases) {
		aliases[key] = options.workFolder + packageAliases[key].slice(1);
	}

	return {
		resolve: {
			alias: aliases
		}
	};
};