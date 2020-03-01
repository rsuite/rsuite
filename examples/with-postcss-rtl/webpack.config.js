/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const config = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3100
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
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'less-loader?javascriptEnabled=true',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('postcss-rtl')({
                    //onlyDirection: 'rtl'
                  })
                ];
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};

module.exports = config;
