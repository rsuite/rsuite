/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const RtlCssPlugin = require('rtlcss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  devServer: {
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
  },
  entry: {
    app: './src/index.js',
    css: './src/index.less',
  },
  output: {
    filename: '[name].[contenthash:8].bundle.js?',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?babelrc'],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              esModule: false,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/style.css`,
    }),
    new RtlCssPlugin('css/style.rtl.css'),
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      inject: true,
      excludeChunks: ['css'],
    }),
  ],
};
