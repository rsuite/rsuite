const tinycolor = require('tinycolor2');

// Primary color number.
var PRIMARY_INDEX = 5;
var HUE_MAX = 360;
var SATURATION_MIN = 5;
var SATURATION_MAX = 100;
var BRIGHTNESS_MIN = 20;
var BRIGHTNESS_MAX = 100;

var COLOR_NUMBER_SET = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

function calculateHue(originalHue, index) {
  originalHue = Math.round(originalHue) || 360;
  // Dark color increase , light color reduction
  const step = index - PRIMARY_INDEX;
  const gap = 1;
  const hue = originalHue + step * gap;

  // The value of hue is [0,360).
  // If it is greater than 360, the absolute value of the difference is taken.
  return hue >= HUE_MAX ? Math.abs(hue - HUE_MAX) : hue;
}

function calculateSaturation(originalSaturation, index) {
  originalSaturation = Math.round(originalSaturation * 100);
  //  Dark color increase , light color reduction
  const step = index - PRIMARY_INDEX;
  const gap = Math.round(
    (step > 0 && (100 - originalSaturation) / 4) ||
      (originalSaturation > SATURATION_MIN && (originalSaturation - 5) / 5) ||
      1
  );
  const saturation = originalSaturation + step * gap;
  return (
    // The value range of saturation is [5,100]
    ((saturation < SATURATION_MIN && SATURATION_MIN) ||
      (saturation > SATURATION_MAX && SATURATION_MAX) ||
      saturation) / 100
  );
}

function calculateBrightnessAdjustValue(brightness, step) {
  if (step < 0) {
    if (brightness > 40) {
      // BasicGap rounded up to avoid a situation of 0.
      let basicGap = Math.ceil((brightness - 40) / 4 / 4);
      const levels = Math.abs(step);
      // Less than 40, the brightness is smaller.
      // n is a multiple of the reduction base (increased by the arithmetic progression)
      const n = ((1 + levels) * levels) / 2;
      return -1 * basicGap * n;
    }
    return Math.round(step * ((brightness - 20) / 4));
  }
  return Math.round(step * ((100 - brightness) / 5));
}

function calculateBrightness(originalBrightness, index) {
  originalBrightness = Math.round(originalBrightness * 100);
  // Light color reduction , dark color increase.
  const step = PRIMARY_INDEX - index;
  // When originalBrightness is less than 20, no adjustment.
  if (step < 0 && originalBrightness < BRIGHTNESS_MIN) {
    return originalBrightness / 100;
  }
  const adjustValue = calculateBrightnessAdjustValue(originalBrightness, step);
  const brightness = originalBrightness + adjustValue;
  return (
    // The range of brightness is [20,100]
    ((brightness < BRIGHTNESS_MIN && BRIGHTNESS_MIN) ||
      (brightness > BRIGHTNESS_MAX && BRIGHTNESS_MAX) ||
      brightness) / 100
  );
}

module.exports = {
  install: function (less, pluginManager, functions) {
    /**
     * Calculate color
     * @param color
     * @param colorNumber
     */
    functions.add('palette', function (color, colorNumber) {
      const hsv = tinycolor(color.value).toHsv();
      const index = COLOR_NUMBER_SET.indexOf('' + colorNumber.value);
      if (index === -1 || index === PRIMARY_INDEX) {
        return less.color(color.rgb);
      }
      return less.color(
        tinycolor({
          h: calculateHue(hsv.h, index),
          s: calculateSaturation(hsv.s, index),
          v: calculateBrightness(hsv.v, index)
        }).toHex()
      );
    });
  }
};
