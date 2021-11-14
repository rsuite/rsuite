export const precisionMath = value => parseFloat(value.toFixed(10));

function checkValue<T extends number | undefined>(
  value: T,
  min: number,
  max: number
): T extends undefined ? undefined : number;
function checkValue(value, min, max) {
  if (typeof value === 'undefined') {
    return value;
  }

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

export { checkValue };
