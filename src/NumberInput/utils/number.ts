import isNil from 'lodash/isNil';
/**
 * Clamp a value within min/max and handle NaN as empty string.
 */
export function clampValue(value: number | string, min?: number, max?: number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (Number.isNaN(num)) {
    return '';
  }
  let result = num;
  if (typeof max !== 'undefined' && result > max) {
    result = max;
  }
  if (typeof min !== 'undefined' && result < min) {
    result = min;
  }
  return result.toString();
}

function isNumber(value: string | number) {
  return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(value + '');
}

function getDecimalLength(value: number): number {
  if (isNumber(value)) {
    return value.toString().split('.')[1].length;
  }
  return 0;
}

export function decimals(...values: number[]): number {
  const lengths = values.map(getDecimalLength);
  return Math.max(...lengths);
}

/**
 * Disable the upper limit of the number.
 * @param value
 * @param max
 */
export function valueReachesMax(value: number | string | null | undefined, max: number) {
  if (!isNil(value)) {
    return +value >= max;
  }
  return false;
}

/**
 * Disable the lower limit of the number.
 * @param value
 * @param min
 */
export function valueReachesMin(value: number | string | null | undefined, min: number) {
  if (!isNil(value)) {
    return +value <= min;
  }
  return false;
}
