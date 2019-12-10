function config() {
  return {
    devServer: {
      before(app) {
        app.get('/', (req, res) => {
          res.redirect('/docs/docs/');
        });
      },
      stats: 'errors-warnings',
      publicPath: '/docs/',
      overlay: true,
      open: false,
    },
  };
}

module.exports = config;
