/* eslint-env es6 */
/* eslint-disable consistent-return */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
});

server.listen(9000, 'localhost', (err) => {
  if (err) { return console.log(err); }
  console.log('Webpack server listening at http://localhost:9000/');
});
