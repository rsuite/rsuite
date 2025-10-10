'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("../../Button"));
var ToggleButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({}, props, {
    ref: ref,
    as: "div",
    ripple: false
  }));
});
ToggleButton.displayName = 'ToggleButton';
var _default = exports.default = ToggleButton;