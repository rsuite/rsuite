'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.shouldDisplay = void 0;
exports.transformData = transformData;
var _trim = _interopRequireDefault(require("lodash/trim"));
function transformData(data) {
  if (!data) {
    return [];
  }
  return data.map(function (item) {
    if (typeof item === 'string') {
      return {
        value: item,
        label: item
      };
    }
    if (typeof item === 'object') {
      return item;
    }
  });
}
var shouldDisplay = exports.shouldDisplay = function shouldDisplay(filterBy, value) {
  return function (item) {
    if (typeof filterBy === 'function') {
      return filterBy(value, item);
    }
    if (!(0, _trim.default)(value)) {
      return false;
    }
    var keyword = value.toLocaleLowerCase();
    return ("" + item.label).toLocaleLowerCase().indexOf(keyword) >= 0;
  };
};