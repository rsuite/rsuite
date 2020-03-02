const withLessExcludeRSuite = require("./next-less.config.js");

module.exports = withLessExcludeRSuite({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]_[hash:base64:5]"
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});
