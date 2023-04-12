/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const __DEV__ = process.env.NODE_ENV === 'development';
const filename = __DEV__ ? '[name].js' : '[name].min.js';

const plugins = [
  new LodashModuleReplacementPlugin({
    currying: true
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: `${filename}.map`
  })
];

if (process.env.ANALYZE === 'true') {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: {
    rsuite: path.join(__dirname, 'src')
  },
  output: {
    path: path.join(__dirname, 'lib/dist'),
    filename,
    library: 'rsuite',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx?$/,
        use: ['babel-loader?babelrc'],
        exclude: /node_modules/
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
