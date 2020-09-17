const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __PRO__ = process.env.NODE_ENV === 'production';
const outputDir = path.join(__dirname, 'build/');

module.exports = {
  entry: './src/index.bs.js',
  mode: __PRO__ ? 'production' : 'development',
  output: {
    path: outputDir,
    publicPath: outputDir,
    filename: 'index.js',
  },
  devServer: {
    contentBase: outputDir,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};
