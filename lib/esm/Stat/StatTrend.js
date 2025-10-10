'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["as", "appearance", "classPrefix", "indicator", "className", "children"];
import React from 'react';
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
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
  return /*#__PURE__*/React.createElement("svg", _extends({}, svgProps, props), /*#__PURE__*/React.createElement("path", {
    d: "M17 7l-10 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 7l9 0l0 9"
  }));
};
var ArrowDown = function ArrowDown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({}, svgProps, props), /*#__PURE__*/React.createElement("path", {
    d: "M7 7l10 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 8l0 9l-9 0"
  }));
};
var ArrowEqual = function ArrowEqual(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({}, svgProps, props), /*#__PURE__*/React.createElement("path", {
    d: "M7 9l10 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 15l10 0"
  }));
};
var StatTrend = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(appearance, indicator));
  var IndicatorIcon = indicator === 'up' ? ArrowUp : indicator === 'down' ? ArrowDown : ArrowEqual;
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes
  }, rest), children, /*#__PURE__*/React.createElement(IndicatorIcon, {
    className: prefix('indicator')
  }));
});
StatTrend.displayName = 'StatTrend';
StatTrend.propTypes = {
  indicator: oneOf(['up', 'down', 'equal']),
  appearance: oneOf(['default', 'subtle'])
};
export default StatTrend;