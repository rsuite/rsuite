const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const __DEV__ = process.env.NODE_ENV === 'development';
const filename = __DEV__ ? '[name].js' : '[name].min.js';

// Keep full Lodash semantics: Form's immutable updates rely on exotic values and Symbol keys.
const plugins = [
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
    },
    'react-dom/client': {
      root: 'ReactDOM',
      commonjs2: 'react-dom/client',
      commonjs: 'react-dom/client',
      amd: 'react-dom/client'
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
