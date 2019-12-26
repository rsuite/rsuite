"use strict";

exports.__esModule = true;
exports.default = getSafeRegExpString;

/**
 * @description escape Regular_Expressions special_characters '^$.|*+?{\\[()'
 */
function getSafeRegExpString(str) {
  return str.replace(/([\^\$\.\|\*\+\?\{\\\[\(\)])/g, '\\$1');
}

module.exports = exports.default;