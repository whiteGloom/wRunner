var cache = {};

function importAll (r) {
	r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context("./", true, /\.(jpe?g|gif|png|svg|ico)/)); // images
importAll(require.context("./", true, /\.(woff|otf|ttf|eot)/)); // fonts
importAll(require.context("./", true, /\.(styl|css)/)); // styles
importAll(require.context("./", true, /\.(mp4)/)); // videos