'use client';
"use strict";

exports.__esModule = true;
exports.shouldRenderTime = exports.shouldRenderMonth = exports.shouldRenderDate = exports.shouldOnlyRenderTime = exports.shouldOnlyRenderMonth = void 0;
/**
 * Check if the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the time should be rendered.
 */
var shouldRenderTime = exports.shouldRenderTime = function shouldRenderTime(format) {
  return /([Hhms])/.test(format);
};

/**
 * Check if the month should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the month should be rendered.
 */
var shouldRenderMonth = exports.shouldRenderMonth = function shouldRenderMonth(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format);
};

/**
 * Check if the date should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the date should be rendered.
 */
var shouldRenderDate = exports.shouldRenderDate = function shouldRenderDate(format) {
  return /[Yy]/.test(format) && /[ML]/.test(format) && /[Dd]/.test(format);
};

/**
 * Check if only the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether only the time should be rendered.
 */
var shouldOnlyRenderTime = exports.shouldOnlyRenderTime = function shouldOnlyRenderTime(format) {
  return /([Hhms])/.test(format) && !/([YyMDd])/.test(format);
};

/**
 * Check if only the month should be rendered based on the format.
 */
var shouldOnlyRenderMonth = exports.shouldOnlyRenderMonth = function shouldOnlyRenderMonth(format) {
  return shouldRenderMonth(format) && !shouldRenderDate(format);
};