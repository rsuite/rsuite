'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "children", "localeKey", "placeholder"];
import React from 'react';
import { useClassNames } from "../hooks/index.js";
import { useCustom } from "../../CustomProvider/index.js";
/**
 * Make the component display in plain text, and display default characters when there is no children.
 * @private
 */
var Plaintext = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'plaintext' : _props$classPrefix,
    className = props.className,
    children = props.children,
    _props$localeKey = props.localeKey,
    localeKey = _props$localeKey === void 0 ? '' : _props$localeKey,
    _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? getLocale('Plaintext')[localeKey] || '' : _props$placeholder,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    empty: !children
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "text"
  }, rest, {
    ref: ref,
    className: classes
  }), children ? children : placeholder);
});
Plaintext.displayName = 'Plaintext';
export default Plaintext;