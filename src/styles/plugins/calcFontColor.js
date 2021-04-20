const tinycolor = require('tinycolor2');

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('calcFontColor', function (color) {
      const black = '#575757';
      const white = '#ffffff';
      const a = tinycolor.readability(color, black);
      const b = tinycolor.readability(color, white);
      return less.color(tinycolor(a > b ? black : white).toHex());
    });
  }
};
