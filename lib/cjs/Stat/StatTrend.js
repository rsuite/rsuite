'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../internals/hooks");
var _propTypes = require("../internals/propTypes");
var _excluded = ["as", "appearance", "classPrefix", "indicator", "className", "children"];
var svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
var ArrowUp = function ArrowUp(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({}, svgProps, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M17 7l-10 10"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M8 7l9 0l0 9"
  }));
};
var ArrowDown = function ArrowDown(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({}, svgProps, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M7 7l10 10"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M17 8l0 9l-9 0"
  }));
};
var ArrowEqual = function ArrowEqual(props) {
  return /*#__PURE__*/_react.default.createElement("svg", (0, _extends2.default)({}, svgProps, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M7 9l10 0"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M7 15l10 0"
  }));
};
var StatTrend = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'span' : _props$as,
    _props$appearance = props.appearance,
    appearance = _props$appearance === void 0 ? 'default' : _props$appearance,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'stat-trend' : _props$classPrefix,
    _props$indicator = props.indicator,
    indicator = _props$indicator === void 0 ? 'up' : _props$indicator,
    className = props.className,
    children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(appearance, indicator));
  var IndicatorIcon = indicator === 'up' ? ArrowUp : indicator === 'down' ? ArrowDown : ArrowEqual;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: classes
  }, rest), children, /*#__PURE__*/_react.default.createElement(IndicatorIcon, {
    className: prefix('indicator')
  }));
});
StatTrend.displayName = 'StatTrend';
StatTrend.propTypes = {
  indicator: (0, _propTypes.oneOf)(['up', 'down', 'equal']),
  appearance: (0, _propTypes.oneOf)(['default', 'subtle'])
};
var _default = exports.default = StatTrend;