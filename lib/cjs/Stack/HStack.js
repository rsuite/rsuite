'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Stack = _interopRequireDefault(require("./Stack"));
var _excluded = ["reverse", "spacing", "childrenRenderMode"];
var HStack = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var reverse = props.reverse,
    _props$spacing = props.spacing,
    spacing = _props$spacing === void 0 ? 6 : _props$spacing,
    _props$childrenRender = props.childrenRenderMode,
    childrenRenderMode = _props$childrenRender === void 0 ? 'clone' : _props$childrenRender,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var direction = reverse ? 'row-reverse' : 'row';
  return /*#__PURE__*/_react.default.createElement(_Stack.default, (0, _extends2.default)({
    spacing: spacing,
    childrenRenderMode: childrenRenderMode
  }, rest, {
    direction: direction,
    ref: ref
  }));
});
HStack.displayName = 'HStack';
HStack.Item = _Stack.default.Item;
var _default = exports.default = HStack;