const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    rsuite: path.join(__dirname, 'src')
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].production.min.js',
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
    moment: {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?babelrc'],
        exclude: /node_modules/
      }
    ]
  }
  //plugins: [new BundleAnalyzerPlugin()]
};
