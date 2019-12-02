// External modules
import WebpackLoader from 'webpack-loader';
import ghpages from 'gh-pages';

// Local modules
import getAliasesConfig from './webpackConfigs/vendors/aliasesConfig';
import getBabelConfig from './webpackConfigs/vendors/babelConfig';
import getStylusConfig from './webpackConfigs/vendors/stylusConfig';
import getPugConfig from './webpackConfigs/vendors/pugConfig';
import getStaticsConfig from './webpackConfigs/vendors/staticsConfig';

import getMainConfig from './webpackConfigs/mainConfig';
import getShowcaseConfig from './webpackConfigs/showcaseConfig';


// Variables
const workFolder = process.cwd();
const npmArguments = process.argv.slice(2);
const webpackLoader = new WebpackLoader();


// Config
webpackLoader.makeNewConfig('main', [
  getMainConfig({ workFolder }),
  getBabelConfig(),
  getStylusConfig({ path: '/themes/[name].css' }),
  getStaticsConfig(),
  getAliasesConfig({ workFolder }),
], 'production');

webpackLoader.makeNewConfig('showcase', [
  getShowcaseConfig({ workFolder }),
  getBabelConfig(),
  getPugConfig({ workFolder }),
  getStylusConfig({ path: 'static/styles/[name].css' }),
  getStaticsConfig(),
  getAliasesConfig({ workFolder }),
], 'production');

webpackLoader.addToDevServerConfig({
  before(app) {
    app.get('/', (req, res) => {
      res.redirect('/docs/docs/');
    });
  },
  stats: 'errors-warnings',
  publicPath: '/docs/',
  overlay: true,
  open: false,
});

function ghPagesInit() {
  ghpages.publish('docs', (err) => {
    console.log('GitHub Pages branch updated.');
  });
  ghpages.publish('prod', { branch: 'Production' }, (err) => {
    if(err) console.log(err)
    console.log('Prod branch updated.');
  });
}

// Init
// If mode is build
if (npmArguments.indexOf('build') > -1) webpackLoader.run(ghPagesInit);

// If mode is build-watch
if (npmArguments.indexOf('build-watch') > -1) webpackLoader.runWatch();

// If mode is build-live
if (npmArguments.indexOf('build-live') > -1) webpackLoader.runDevServer();
