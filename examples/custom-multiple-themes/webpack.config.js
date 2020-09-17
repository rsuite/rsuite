const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const multipleThemesCompile = require('webpack-multiple-themes-compile');
const themes = require('./themes.config');

const { NODE_ENV } = process.env;

const isDev = NODE_ENV === 'dev';

const commonConfig = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
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
    publicPath: isDev ? '/' : './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'transform-loader?brfs', // Use browserify transforms as webpack-loader.
          'babel-loader?babelrc'
        ],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      // 使用 cssnano 优化
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          // zindex 不优化
          zindex: {
            disabled: true
          }
        },
        canPrint: true
      })
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'RSUITE multiple themes examples',
      template: 'src/index.html',
      inject: true,
      excludeChunks: Object.keys(themes)
    }),
    new webpack.DefinePlugin({
      'process.env.themes': JSON.stringify(Object.keys(themes))
    })
  ]
};

const themeConfig = multipleThemesCompile({
  themesConfig: themes,
  styleLoaders: [
    { loader: 'css-loader' },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  ],
  cwd: path.resolve('./')
});

module.exports = merge(commonConfig, themeConfig);
