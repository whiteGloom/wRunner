const package = require("../package.json");

module.exports = function(options) {
	options = options ? options : {};
	var base = options.base;

	var aliases = {};
	for(var key in package._moduleAliases){
		aliases[key] = base + package._moduleAliases[key].slice(1)
	};

	return {
		resolve: {
			alias: aliases
		}
	};
};