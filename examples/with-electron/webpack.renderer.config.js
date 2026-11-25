// Renderer process uses different rules (no asset-relocator-loader)
const rules = [
  // Babel loader for JSX and modern JavaScript
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  // CSS loader
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
];

module.exports = {
  module: {
    rules,
  },
  target: 'web',
};
