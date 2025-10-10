'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["reverse", "spacing", "alignItems", "childrenRenderMode"];
import React from 'react';
import Stack from "./Stack.js";
var VStack = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var reverse = props.reverse,
    _props$spacing = props.spacing,
    spacing = _props$spacing === void 0 ? 6 : _props$spacing,
    _props$alignItems = props.alignItems,
    alignItems = _props$alignItems === void 0 ? 'flex-start' : _props$alignItems,
    _props$childrenRender = props.childrenRenderMode,
    childrenRenderMode = _props$childrenRender === void 0 ? 'clone' : _props$childrenRender,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var direction = reverse ? 'column-reverse' : 'column';
  return /*#__PURE__*/React.createElement(Stack, _extends({
    spacing: spacing,
    childrenRenderMode: childrenRenderMode,
    alignItems: alignItems
  }, rest, {
    direction: direction,
    ref: ref
  }));
});
VStack.displayName = 'VStack';
VStack.Item = Stack.Item;
export default VStack;