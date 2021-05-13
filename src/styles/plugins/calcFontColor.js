const tinycolor = require('tinycolor2');

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('calcFontColor', function (bg, blackish, whitish) {
      blackish = blackish || '#575757';
      whitish = whitish || '#ffffff';
      const a = tinycolor.readability(bg, blackish);
      const b = tinycolor.readability(bg, whitish);
      return less.color(tinycolor(a > b ? blackish : whitish).toHex());
    });
  }
};
