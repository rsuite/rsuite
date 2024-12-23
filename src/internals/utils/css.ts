/**
 * Processes and returns a value suitable for CSS (with a unit).
 */
export function getCssValue(value?: number | string, unit = 'px') {
  // If the value is a number, append the default unit (defaults to 'px')
  if (typeof value === 'number') {
    return `${value}${unit}`;
  }

  // If the value is already a string (and likely contains a unit), return it as is
  if (typeof value === 'string') {
    return value;
  }
}
