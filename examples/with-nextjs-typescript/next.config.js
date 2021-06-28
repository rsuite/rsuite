// 不支持next 10、11版本
// "Next" version 10 and 11 are not supported
const withLess = require("@zeit/next-less");
module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  }
});