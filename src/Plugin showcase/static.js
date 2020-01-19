import './favicons';

const cache = {};
function importAll(r) {
  r.keys().forEach((key) => { cache[key] = r(key); });
}

// importAll(require.context('./static/images/', true, /\.(jpe?g|gif|png|svg|ico)/)); // images
// importAll(require.context('./static/fonts/', true, /\.(woff|otf|ttf|eot)/)); // fonts
importAll(require.context('./static/styles/', true, /\.(styl|css)/)); // styles
importAll(require.context('./blocks/', true, /\.(styl|css)/)); // styles
// importAll(require.context('./static/videos/', true, /\.(mp4)/)); // videos
