/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const rules = require('./webpack.rules');
/* eslint-enable */

rules.push({
  test: /\.(less|css)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  ]
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProgressPlugin({ profile: false })
  ]
};
