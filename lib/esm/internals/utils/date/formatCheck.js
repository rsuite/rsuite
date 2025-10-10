'use client';
/**
 * Check if the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the time should be rendered.
 */
export var shouldRenderTime = function shouldRenderTime(format) {
  return /([Hhms])/.test(format);
};

/**
 * Check if the month should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the month should be rendered.
 */
export var shouldRenderMonth = function shouldRenderMonth(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format);
};

/**
 * Check if the date should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the date should be rendered.
 */
export var shouldRenderDate = function shouldRenderDate(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format) && /[Dd]/.test(format);
};

/**
 * Check if only the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether only the time should be rendered.
 */
export var shouldOnlyRenderTime = function shouldOnlyRenderTime(format) {
  return /([Hhms])/.test(format) && !/([YyMDd])/.test(format);
};

/**
 * Check if only the month should be rendered based on the format.
 */
export var shouldOnlyRenderMonth = function shouldOnlyRenderMonth(format) {
  return shouldRenderMonth(format) && !shouldRenderDate(format);
};