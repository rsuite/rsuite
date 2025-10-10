'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "value", "formatOptions"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { FormattedNumber } from "../CustomProvider/index.js";
var StatValue = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'dd' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'stat-value' : _props$classPrefix,
    className = props.className,
    children = props.children,
    value = props.value,
    formatOptions = props.formatOptions,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes
  }, rest), value && /*#__PURE__*/React.createElement(FormattedNumber, {
    value: value,
    formatOptions: formatOptions
  }), children);
});
StatValue.displayName = 'StatValue';
StatValue.propTypes = {
  value: PropTypes.number,
  formatOptions: PropTypes.object
};
export default StatValue;