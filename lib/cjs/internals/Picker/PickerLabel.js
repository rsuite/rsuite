'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _InputGroup = _interopRequireDefault(require("../../InputGroup"));
var _excluded = ["children", "className", "as"];
var PickerLabel = function PickerLabel(_ref) {
  var children = _ref.children,
    className = _ref.className,
    _ref$as = _ref.as,
    Component = _ref$as === void 0 ? _InputGroup.default.Addon : _ref$as,
    rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  return children ? /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    "data-testid": "picker-label",
    className: className
  }, rest), children) : null;
};
var _default = exports.default = PickerLabel;