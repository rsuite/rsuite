'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.getWeekKeys = getWeekKeys;
/**
 * Retrieves an array of week keys starting from the specified weekday.
 */
function getWeekKeys(weekStart) {
  var weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  if (typeof weekStart === 'undefined') {
    return weekKeys;
  }
  return weekKeys.slice(weekStart).concat(weekKeys.slice(0, weekStart));
}
var _default = exports.default = getWeekKeys;