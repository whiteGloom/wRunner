const packageAliases = require('../../package.json')._moduleAliases;

function config(options = {}) {
  const aliases = {};
  Object.keys(packageAliases).forEach((key) => {
    aliases[key] = options.workFolder + packageAliases[key].slice(1);
  });

  return {
    resolve: {
      alias: aliases,
    },
  };
}

export default config;
