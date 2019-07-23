const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'development';
const filename = __DEV__ ? '[name].js' : '[name].min.js';

module.exports = {
  entry: {
    rsuite: path.join(__dirname, 'src')
  },
  output: {
    path: path.join(__dirname, 'dist'),
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
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: `${filename}.map`
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
