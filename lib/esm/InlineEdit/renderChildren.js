'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["onBlur"];
import React from 'react';
import Input from "../Input/index.js";
import { createChainedFunction } from "../internals/utils/index.js";
export function defaultRenderInput(props, ref) {
  return /*#__PURE__*/React.createElement(Input, _extends({
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
export function renderChildren(children, props, ref) {
  if (typeof children === 'function') {
    return children(props, ref);
  }
  if (pickers.includes(getDisplayName(children))) {
    var onBlur = props.onBlur,
      rest = _objectWithoutPropertiesLoose(props, _excluded);
    var _children$props = children.props,
      onExit = _children$props.onExit,
      onClean = _children$props.onClean;
    return /*#__PURE__*/React.cloneElement(children, _extends({}, rest, {
      // Pass onBlur to the child component to automatically save or cancel after the focus event is processed.
      // Special handling in the Picker component, call onBlur when onExit and onClean
      onExit: createChainedFunction(function () {
        return onBlur === null || onBlur === void 0 ? void 0 : onBlur();
      }, onExit),
      onClean: createChainedFunction(function () {
        return onBlur === null || onBlur === void 0 ? void 0 : onBlur();
      }, onClean),
      ref: ref
    }));
  }
  return /*#__PURE__*/React.cloneElement(children, _extends({}, props, {
    ref: ref
  }));
}