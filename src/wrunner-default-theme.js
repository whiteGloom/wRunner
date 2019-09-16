var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context("./wrunnerDefaultTheme/", true, /\.(jpe?g|gif|png|svg)/));	// images
importAll(require.context("./wrunnerDefaultTheme/", true, /\.(woff|otf|ttf|eot)/));	// fonts
importAll(require.context("./wrunnerDefaultTheme/", true, /\.(styl|css)/));			// styles
importAll(require.context("./wrunnerDefaultTheme/", true, /\.(mp4)/));				// videos