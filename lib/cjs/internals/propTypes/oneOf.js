'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var oneOf = function oneOf(arr) {
  var checkType = _propTypes.default.oneOf(arr);

  // for [storybook/utils/propTypesToArgType.ts]
  checkType._argType_ = {
    type: 'oneOf',
    value: arr
  };
  return checkType;
};
var _default = exports.default = oneOf;