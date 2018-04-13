const path = require('path');

module.exports = {
  entry: {
    rsuite: path.join(__dirname, 'src')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'rsuite',
    libraryTarget: 'umd'
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
};
