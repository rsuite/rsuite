'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "scrollShadow", "customScrollbar", "height", "width", "style", "onScroll", "data-testid"];
import React from 'react';
import { useClassNames } from "../hooks/index.js";
import { createChainedFunction, mergeRefs } from "../utils/index.js";
import { useScrollState } from "./hooks/useScrollState.js";
var ScrollView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'scroll-view' : _props$classPrefix,
    className = props.className,
    children = props.children,
    scrollShadow = props.scrollShadow,
    customScrollbar = props.customScrollbar,
    height = props.height,
    width = props.width,
    style = props.style,
    onScroll = props.onScroll,
    dataTestId = props['data-testid'],
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useScrollState = useScrollState(scrollShadow),
    scrollState = _useScrollState.scrollState,
    handleScroll = _useScrollState.handleScroll,
    bodyRef = _useScrollState.bodyRef;
  var bodyStyles = _extends({
    height: height,
    width: width
  }, style);
  var bodyClasses = merge(className, withClassPrefix({
    shadow: scrollShadow,
    'thumb-top': scrollState === 'top',
    'thumb-middle': scrollState === 'middle',
    'thumb-bottom': scrollState === 'bottom',
    'custom-scrollbar': customScrollbar
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: mergeRefs(ref, bodyRef),
    className: bodyClasses,
    style: bodyStyles,
    onScroll: createChainedFunction(handleScroll, onScroll),
    "data-testid": dataTestId || 'scroll-view'
  }), children);
});
ScrollView.displayName = 'ScrollView';
export default ScrollView;