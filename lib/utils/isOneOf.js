"use strict";

exports.__esModule = true;
exports.default = isOneOf;

function isOneOf(one, ofTarget) {
  if (Array.isArray(ofTarget)) {
    return ofTarget.indexOf(one) >= 0;
  }

  return one === ofTarget;
}

module.exports = exports.default;