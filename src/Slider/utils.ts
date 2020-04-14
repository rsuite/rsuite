export const precisionMath = value => parseFloat(value.toFixed(10));

export const checkValue = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};
