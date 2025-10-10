'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "style", "children"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { ModalContext } from "./ModalContext.js";
import IconButton from "../IconButton/index.js";
import Close from '@rsuite/icons/Close';
var ModalBody = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal-body' : _props$classPrefix,
    className = props.className,
    style = props.style,
    children = props.children,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var context = useContext(ModalContext);
  var _ref = context || {},
    getBodyStyles = _ref.getBodyStyles,
    closeButton = _ref.closeButton,
    onModalClose = _ref.onModalClose;
  var bodyStyles = getBodyStyles === null || getBodyStyles === void 0 ? void 0 : getBodyStyles();
  var buttonElement = null;
  if (closeButton) {
    buttonElement = typeof closeButton === 'boolean' ? /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Close, null),
      appearance: "subtle",
      size: "sm",
      className: prefix('close'),
      onClick: onModalClose
    }) : closeButton;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    style: _extends({}, bodyStyles, style),
    className: classes
  }), buttonElement, children);
});
ModalBody.displayName = 'ModalBody';
ModalBody.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string
};
export default ModalBody;