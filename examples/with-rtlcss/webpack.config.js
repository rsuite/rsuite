/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const RTLCSSPlugin = require('./scripts/RTLCSSPlugin');
const HtmlWebpackHandleCssInjectPlugin = require('./scripts/HtmlWebpackHandleCssInjectPlugin');
const themesConfig = require('./theme.config');

const config = merge(
  {
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true,
      compress: true,
      host: '0.0.0.0',
      port: 3000
    },
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: '[name].bundle.js?[hash]',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader?babelrc']
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.[hash].css'),
      new HtmlwebpackPlugin({
        template: 'src/index.html',
        inject: true
      }),
      new HtmlWebpackHandleCssInjectPlugin({
        filter: () => false
      }),
      new RTLCSSPlugin({
        path: 'css'
      })
    ]
  },
  themesConfig
);

module.exports = config;
