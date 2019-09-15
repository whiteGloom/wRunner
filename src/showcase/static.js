var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context("./static/", true, /\.(jpe?g|gif|png|svg)/));	// images
importAll(require.context("./static/", true, /\.(woff|otf|ttf|eot)/));	// fonts
importAll(require.context("./static/", true, /\.(styl|css)/));			// styles
importAll(require.context("./static/", true, /\.(mp4)/));				// videos