'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "children", "style", "visible", "arrow"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Tooltip` component is used to describe a element.
 *
 * @see https://rsuitejs.com/components/tooltip
 */
var Tooltip = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Tooltip', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'tooltip' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    style = propsWithDefaults.style,
    visible = propsWithDefaults.visible,
    _propsWithDefaults$ar = propsWithDefaults.arrow,
    arrow = _propsWithDefaults$ar === void 0 ? true : _propsWithDefaults$ar,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    arrow: arrow
  }));
  var styles = _extends({
    opacity: visible ? 1 : undefined
  }, style);
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "tooltip"
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), children);
});
Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
  visible: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  arrow: PropTypes.bool
};
export default Tooltip;