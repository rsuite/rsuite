"use strict";

exports.__esModule = true;
exports.default = clone;

function clone(data) {
  if (data !== undefined) {
    return JSON.parse(JSON.stringify(data));
  }

  return null;
}

module.exports = exports.default;