'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "align", "classPrefix", "color", "className", "maxLines", "weight", "muted", "transform", "size", "style"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { oneOf } from "../internals/propTypes/index.js";
var fontSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20
};
/**
 *
 * The `Text` component is used to display text.
 *
 * @see https://rsuitejs.com/components/text
 */
var Text = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Text', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'p' : _propsWithDefaults$as,
    align = propsWithDefaults.align,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'text' : _propsWithDefaults$cl,
    color = propsWithDefaults.color,
    className = propsWithDefaults.className,
    maxLines = propsWithDefaults.maxLines,
    weight = propsWithDefaults.weight,
    muted = propsWithDefaults.muted,
    transform = propsWithDefaults.transform,
    size = propsWithDefaults.size,
    style = propsWithDefaults.style,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(color, align, weight, transform, {
    muted: muted,
    ellipsis: maxLines
  }));
  var styles = _extends({
    fontSize: fontSizeMap[size] || size
  }, maxLines ? {
    WebkitLineClamp: maxLines
  } : null, style);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }));
});
Text.displayName = 'Text';
Text.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType,
  size: PropTypes.oneOfType([PropTypes.number, oneOf(['sm', 'md', 'lg', 'xl', 'xxl'])]),
  muted: PropTypes.bool,
  transform: oneOf(['uppercase', 'lowercase', 'capitalize']),
  align: oneOf(['left', 'center', 'right', 'justify']),
  weight: oneOf(['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
  maxLines: PropTypes.number
};
export default Text;