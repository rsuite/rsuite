const tinycolor = require('tinycolor2');

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('calcFontColor', function (bg, preferredColor, alternativeColor) {
      preferredColor = preferredColor ? tinycolor(preferredColor.value) : tinycolor('#575757');
      alternativeColor = alternativeColor
        ? tinycolor(alternativeColor.value)
        : tinycolor('#ffffff');

      const a = tinycolor.readability(bg.value, preferredColor);
      const b = tinycolor.readability(bg.value, alternativeColor);

      return a > b ? preferredColor : alternativeColor;
    });
  }
};
