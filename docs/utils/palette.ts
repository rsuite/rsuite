import tinycolor from 'tinycolor2';

const PRIMARY_INDEX = 5;

const HUE_MAX = 360;
const SATURATION_MIN = 5;
const SATURATION_MAX = 100;
const BRIGHTNESS_MIN = 20;
const BRIGHTNESS_MAX = 100;

function calculateHue(originalHue, index) {
  originalHue = Math.round(originalHue) || 360;
  // Dark color increases, light color decreases
  const step = index - PRIMARY_INDEX;
  const gap = 1;
  const hue = originalHue + step * gap;
  // Hue's value range is [0,360) , if it's greater than 360, take the absolute value of the difference
  return hue >= HUE_MAX ? Math.abs(hue - HUE_MAX) : hue;
}

function calculateSaturation(originalSaturation, index) {
  originalSaturation = Math.round(originalSaturation * 100);
  // Dark color increases, light color decreases
  const step = index - PRIMARY_INDEX;
  const gap = Math.round(
    (step > 0 && (100 - originalSaturation) / 4) ||
      (originalSaturation > SATURATION_MIN && (originalSaturation - 5) / 5) ||
      1
  );
  const saturation = originalSaturation + step * gap;
  return (
    // Saturation's value range is [5,100]
    ((saturation < SATURATION_MIN && SATURATION_MIN) ||
      (saturation > SATURATION_MAX && SATURATION_MAX) ||
      saturation) / 100
  );
}

function calculateBrightnessAdjustValue(brightness, step) {
  if (step < 0) {
    if (brightness > 40) {
      // Round up to avoid 0
      const basicGap = Math.ceil((brightness - 40) / 4 / 4);
      const levels = Math.abs(step);
      // When brightness is greater than 40, the brightness decreases, n is the multiple of the base gap (arithmetic progression)
      const n = ((1 + levels) * levels) / 2;
      return -1 * basicGap * n;
    }
    return Math.round(step * ((brightness - 20) / 4));
  }
  return Math.round(step * ((100 - brightness) / 5));
}

function calculateBrightness(originalBrightness, index) {
  originalBrightness = Math.round(originalBrightness * 100);
  // Dark color decreases, light color increases
  const step = PRIMARY_INDEX - index;
  // When originalBrightness is less than 20, no adjustment is made
  if (step < 0 && originalBrightness < BRIGHTNESS_MIN) {
    return originalBrightness / 100;
  }
  const adjustValue = calculateBrightnessAdjustValue(originalBrightness, step);
  const brightness = originalBrightness + adjustValue;
  return (
    // Brightness's value range is [20,100]
    ((brightness < BRIGHTNESS_MIN && BRIGHTNESS_MIN) ||
      (brightness > BRIGHTNESS_MAX && BRIGHTNESS_MAX) ||
      brightness) / 100
  );
}

export function getPalette(primaryColor) {
  const colors = Array.from(new Array(10), (_color, index) => {
    const { h, s, v } = tinycolor(primaryColor).toHsv();
    const key = index === 0 ? '50' : index * 100;
    const lessKey = index === 0 ? '050' : index * 100;
    return {
      key,
      name: `@H${lessKey}`,
      cssName: `--rs-primary-${key}`,
      scssName: `$H${lessKey}`,
      hex:
        index === PRIMARY_INDEX
          ? primaryColor
          : tinycolor({
              h: calculateHue(h, index),
              s: calculateSaturation(s, index),
              v: calculateBrightness(v, index)
            }).toHexString()
    };
  });
  return colors;
}

export default getPalette;
