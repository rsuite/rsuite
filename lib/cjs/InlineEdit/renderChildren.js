'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.defaultRenderInput = defaultRenderInput;
exports.renderChildren = renderChildren;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _Input = _interopRequireDefault(require("../Input"));
var _utils = require("../internals/utils");
var _excluded = ["onBlur"];
function defaultRenderInput(props, ref) {
  return /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends2.default)({
    ref: ref
  }, props));
}
var pickers = ['DatePicker', 'DateRangePicker', 'TimePicker', 'TimeRangePicker', 'InputPicker', 'TagPicker', 'Cascader', 'MultiCascader', 'SelectPicker', 'CheckPicker', 'CheckTreePicker', 'TreePicker'];
function getDisplayName(Component) {
  var _Component$type;
  if (typeof (Component === null || Component === void 0 ? void 0 : Component.type) === 'string') {
    return Component === null || Component === void 0 ? void 0 : Component.type;
  }
  return (Component === null || Component === void 0 || (_Component$type = Component.type) === null || _Component$type === void 0 ? void 0 : _Component$type.displayName) || '';
}
function renderChildren(children, props, ref) {
  if (typeof children === 'function') {
    return children(props, ref);
  }
  if (pickers.includes(getDisplayName(children))) {
    var onBlur = props.onBlur,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
    var _children$props = children.props,
      onExit = _children$props.onExit,
      onClean = _children$props.onClean;
    return /*#__PURE__*/_react.default.cloneElement(children, (0, _extends2.default)({}, rest, {
      // Pass onBlur to the child component to automatically save or cancel after the focus event is processed.
      // Special handling in the Picker component, call onBlur when onExit and onClean
      onExit: (0, _utils.createChainedFunction)(function () {
        return onBlur === null || onBlur === void 0 ? void 0 : onBlur();
      }, onExit),
      onClean: (0, _utils.createChainedFunction)(function () {
        return onBlur === null || onBlur === void 0 ? void 0 : onBlur();
      }, onClean),
      ref: ref
    }));
  }
  return /*#__PURE__*/_react.default.cloneElement(children, (0, _extends2.default)({}, props, {
    ref: ref
  }));
}