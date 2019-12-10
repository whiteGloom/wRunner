const getMainConfig = require('./webpackConfigs/mainConfig');
const getShowcaseConfig = require('./webpackConfigs/showcaseConfig');

const workFolder = process.cwd();

const mainConfig = getMainConfig({ workFolder });
const showcaseConfig = getShowcaseConfig({ workFolder });

module.exports = () => [mainConfig, showcaseConfig];
