const faviconsContext = require.context(
  '!!file-loader?name=static/favicons/[name].[ext]!.',
  true,
  /\.(svg|png|ico|xml|json)$/,
);

faviconsContext.keys().forEach(faviconsContext);
