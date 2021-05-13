const tinycolor = require('tinycolor2');

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('calcFontColor', function (bg, preferredColor, alternativeColor) {
      preferredColor = preferredColor || less.color('575757');
      alternativeColor = alternativeColor || less.color('ffffff');

      const a = tinycolor.readability(bg.value, preferredColor.value);
      const b = tinycolor.readability(bg.value, alternativeColor.value);

      return a >= b ? preferredColor : alternativeColor;
    });
  }
};
