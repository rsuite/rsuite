"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = function _default() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (first) {
    return fns.reduce(function (previousValue, fn) {
      return fn(previousValue);
    }, first);
  };
};

exports.default = _default;
module.exports = exports.default;