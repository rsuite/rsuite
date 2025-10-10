'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "children", "vertical"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The Divider component is used to separate content.
 * @see https://rsuitejs.com/components/divider
 */
var Divider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Divider', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'divider' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    vertical = propsWithDefaults.vertical,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(vertical ? 'vertical' : 'horizontal', {
    'with-text': children
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "separator"
  }, rest, {
    ref: ref,
    className: classes,
    "aria-orientation": vertical ? 'vertical' : 'horizontal'
  }), children && /*#__PURE__*/React.createElement("span", {
    className: prefix('inner-text')
  }, children));
});
Divider.displayName = 'Divider';
Divider.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool
};
export default Divider;