"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * gets computed document direction
 */
var _default = function _default() {
  return typeof window !== 'undefined' && window.getComputedStyle(document.body).direction === 'rtl';
};

exports.default = _default;
module.exports = exports.default;