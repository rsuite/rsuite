const path = require('path');
const webpack = require('webpack');

const isPublish = process.env.NODE_ENV === 'publish';
const plugins = [];

if (isPublish) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  plugins.push(new webpack.BannerPlugin(`Last update: ${new Date().toString()}`));
}

module.exports = {
  entry: {
    suite: path.join(__dirname, 'src')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'RSuite',
    libraryTarget: 'umd'
  },
  plugins,
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader?babelrc'
      ],
      exclude: /node_modules/
    }]
  }
};
