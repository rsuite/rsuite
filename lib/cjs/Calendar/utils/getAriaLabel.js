'use client';
"use strict";

exports.__esModule = true;
exports.getAriaLabel = getAriaLabel;
var _date = require("../../internals/utils/date");
/**
 * Get aria-label for the date.
 * @param date - The date.
 * @param formatStr - The format string.
 * @param format - The format function.
 */
function getAriaLabel(date, formatStr, format) {
  return format ? format(date, formatStr) : (0, _date.format)(date, formatStr);
}