var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context("./showcase/static/wrunnerDefaultTheme/", true, /\.(jpe?g|gif|png|svg)/));	// images
importAll(require.context("./showcase/static/wrunnerDefaultTheme/", true, /\.(woff|otf|ttf|eot)/));	// fonts
importAll(require.context("./showcase/static/wrunnerDefaultTheme/", true, /\.(styl|css)/));			// styles
importAll(require.context("./showcase/static/wrunnerDefaultTheme/", true, /\.(mp4)/));				// videos