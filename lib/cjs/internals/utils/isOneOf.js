'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.isOneOf = isOneOf;
function isOneOf(one, ofTarget) {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0;
  }
  return one === ofTarget;
}
var _default = exports.default = isOneOf;