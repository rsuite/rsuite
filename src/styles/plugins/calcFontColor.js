const tinycolor = require('tinycolor2');

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('calcFontColor', function (color) {
      var black = '#575757';
      var white = '#ffffff';
      var a = tinycolor.readability(color, black);
      var b = tinycolor.readability(color, white);
      return a > b ? black : white;
    });
  }
};
