'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "classPrefix", "as", "role"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import Stack from "../Stack/index.js";
/**
 * The ButtonToolbar component is used to group a series of buttons together in a single line.
 * @see https://rsuitejs.com/components/button/#button-toolbar
 */
var ButtonToolbar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('ButtonToolbar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn-toolbar' : _propsWithDefaults$cl,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? Stack : _propsWithDefaults$as,
    _propsWithDefaults$ro = propsWithDefaults.role,
    role = _propsWithDefaults$ro === void 0 ? 'toolbar' : _propsWithDefaults$ro,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var stackProps = Component === Stack ? {
    wrap: true,
    spacing: 10,
    childrenRenderMode: 'clone'
  } : null;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({}, stackProps, rest, {
    role: role,
    ref: ref,
    className: classes
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string
};
export default ButtonToolbar;