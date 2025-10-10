'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "locale"];
import React from 'react';
import Close from '@rsuite/icons/Close';
import { useClassNames } from "../hooks/index.js";
import { useCustom } from "../../CustomProvider/index.js";
/**
 * Close button for components such as Message and Notification.
 */
var CloseButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'button' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'btn-close' : _props$classPrefix,
    className = props.className,
    overrideLocale = props.locale,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _getLocale = getLocale('CloseButton', overrideLocale),
    closeLabel = _getLocale.closeLabel;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({
    type: "button",
    ref: ref,
    className: classes,
    "aria-label": closeLabel
  }, rest), /*#__PURE__*/React.createElement(Close, null));
});
CloseButton.displayName = 'CloseButton';
export default CloseButton;