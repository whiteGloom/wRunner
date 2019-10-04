const packageAliases = require("../package.json")._moduleAliases;

module.exports = function(options) {
	options = options ? options : {};
	var base = options.base;

	var aliases = {};
	for(var key in packageAliases){
		aliases[key] = base + packageAliases[key].slice(1);
	}

	return {
		resolve: {
			alias: aliases
		}
	};
};