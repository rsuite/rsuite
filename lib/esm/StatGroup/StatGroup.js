'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "columns", "spacing", "style"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var StatGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('StatGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'stat-group' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    columns = propsWithDefaults.columns,
    _propsWithDefaults$sp = propsWithDefaults.spacing,
    spacing = _propsWithDefaults$sp === void 0 ? 6 : _propsWithDefaults$sp,
    style = propsWithDefaults.style,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var styles = _extends({}, style, {
    '--rs-columns': columns,
    '--rs-spacing': typeof spacing === 'number' ? spacing + "px" : spacing
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes,
    style: styles
  }, rest), children);
});
StatGroup.displayName = 'StatGroup';
StatGroup.propTypes = {
  columns: PropTypes.number,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
export default StatGroup;