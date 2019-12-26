"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var toJSX = function toJSX(node, key) {
  return typeof node !== 'undefined' ? _react.default.createElement("span", {
    key: key
  }, node) : null;
};
/**
 * tplTransform('Show {0} data', <i>100</i>);
 * output:
 * Show <span><i>100</i></span> data
 */


var _default = function _default(pattern) {
  for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }

  return pattern.split(/\{(\d+)\}/).map(function (item, index) {
    return index % 2 ? toJSX(data[+item], index) : toJSX(item, index);
  }).filter(function (item) {
    return item !== '';
  });
};

exports.default = _default;
module.exports = exports.default;