'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["style"];
var rangeStyles = {
  position: 'absolute',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  clip: 'rect(0, 0, 0, 0)'
};
var Input = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var style = props.style,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({
    type: "range",
    readOnly: true,
    ref: ref,
    style: (0, _extends2.default)({}, rangeStyles, style)
  }, rest));
});
Input.displayName = 'Input';
var _default = exports.default = Input;