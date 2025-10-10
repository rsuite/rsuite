'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["reverse", "spacing", "childrenRenderMode"];
import React from 'react';
import Stack from "./Stack.js";
var HStack = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var reverse = props.reverse,
    _props$spacing = props.spacing,
    spacing = _props$spacing === void 0 ? 6 : _props$spacing,
    _props$childrenRender = props.childrenRenderMode,
    childrenRenderMode = _props$childrenRender === void 0 ? 'clone' : _props$childrenRender,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var direction = reverse ? 'row-reverse' : 'row';
  return /*#__PURE__*/React.createElement(Stack, _extends({
    spacing: spacing,
    childrenRenderMode: childrenRenderMode
  }, rest, {
    direction: direction,
    ref: ref
  }));
});
HStack.displayName = 'HStack';
HStack.Item = Stack.Item;
export default HStack;