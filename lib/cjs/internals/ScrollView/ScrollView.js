'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _useScrollState2 = require("./hooks/useScrollState");
var _excluded = ["as", "classPrefix", "className", "children", "scrollShadow", "customScrollbar", "height", "width", "style", "onScroll", "data-testid"];
var ScrollView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useScrollState = (0, _useScrollState2.useScrollState)(scrollShadow),
    scrollState = _useScrollState.scrollState,
    handleScroll = _useScrollState.handleScroll,
    bodyRef = _useScrollState.bodyRef;
  var bodyStyles = (0, _extends2.default)({
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
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: (0, _utils.mergeRefs)(ref, bodyRef),
    className: bodyClasses,
    style: bodyStyles,
    onScroll: (0, _utils.createChainedFunction)(handleScroll, onScroll),
    "data-testid": dataTestId || 'scroll-view'
  }), children);
});
ScrollView.displayName = 'ScrollView';
var _default = exports.default = ScrollView;