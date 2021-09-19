/* eslint-disable indent */
import tinycolor from 'tinycolor2';
import 'core-js/modules/es.object.from-entries';

const PRIMARY_INDEX = 5;

const HUE_MAX = 360;
const SATURATION_MIN = 5;
const SATURATION_MAX = 100;
const BRIGHTNESS_MIN = 20;
const BRIGHTNESS_MAX = 100;

export default function (primaryColor) {
  const colors = Object.fromEntries(
    Array.from(new Array(10), (color, index) => {
      const { h, s, v } = tinycolor(primaryColor).toHsv();
      const name = `H${index === 0 ? '050' : index * 100}`;
      color =
        index === PRIMARY_INDEX
          ? primaryColor
          : tinycolor({
              h: calculateHue(h, index),
              s: calculateSaturation(s, index),
              v: calculateBrightness(v, index)
            }).toHexString();
      return [name, tinycolor(color).toRgbString()];
    })
  );
  return colors;
}

function calculateHue(originalHue, index) {
  originalHue = Math.round(originalHue) || 360;
  // 深色增加 浅色减少
  const step = index - PRIMARY_INDEX;
  const gap = 1;
  const hue = originalHue + step * gap;
  // hue 的值域为 [0,360) ，如果大于 360 则取差值的绝对值
  return hue >= HUE_MAX ? Math.abs(hue - HUE_MAX) : hue;
}

function calculateSaturation(originalSaturation, index) {
  originalSaturation = Math.round(originalSaturation * 100);
  //  深色增加 浅色减少
  const step = index - PRIMARY_INDEX;
  const gap = Math.round(
    (step > 0 && (100 - originalSaturation) / 4) ||
      (originalSaturation > SATURATION_MIN && (originalSaturation - 5) / 5) ||
      1
  );
  const saturation = originalSaturation + step * gap;
  return (
    // saturation 的值域为 [5,100]
    ((saturation < SATURATION_MIN && SATURATION_MIN) ||
      (saturation > SATURATION_MAX && SATURATION_MAX) ||
      saturation) / 100
  );
}

function calculateBrightnessAdjustValue(brightness, step) {
  if (step < 0) {
    if (brightness > 40) {
      // basicGap 向上取整，避免为0 的情况
      let basicGap = Math.ceil((brightness - 40) / 4 / 4);
      const levels = Math.abs(step);
      // 大于40 时，明度更小 ，n 为减少基数的倍数（等差增加）
      const n = ((1 + levels) * levels) / 2;
      return -1 * basicGap * n;
    }
    return Math.round(step * ((brightness - 20) / 4));
  }
  return Math.round(step * ((100 - brightness) / 5));
}

function calculateBrightness(originalBrightness, index) {
  originalBrightness = Math.round(originalBrightness * 100);
  // 深色减少 浅色增加
  const step = PRIMARY_INDEX - index;
  // 当 originalBrightness小于20，则不再进行调整
  if (step < 0 && originalBrightness < BRIGHTNESS_MIN) {
    return originalBrightness / 100;
  }
  const adjustValue = calculateBrightnessAdjustValue(originalBrightness, step);
  const brightness = originalBrightness + adjustValue;
  return (
    // brightness 的值域为 [20,100]
    ((brightness < BRIGHTNESS_MIN && BRIGHTNESS_MIN) ||
      (brightness > BRIGHTNESS_MAX && BRIGHTNESS_MAX) ||
      brightness) / 100
  );
}
