'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isSearching = isSearching;
var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));
function isSearching(searchKeyword) {
  return !(0, _isEmpty.default)(searchKeyword);
}