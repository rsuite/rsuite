'use client';
"use strict";

exports.__esModule = true;
exports.getSafeRegExpString = getSafeRegExpString;
/**
 * @description escape Regular_Expressions special_characters '^$.|*+?{\\[()'
 */
function getSafeRegExpString(str) {
  return str.replace(/([\^\$\.\|\*\+\?\{\\\[\(\)])/g, '\\$1');
}