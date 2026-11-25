/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const config = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3100,
    allowedHosts: 'all'
  },
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ]
};

module.exports = config;
