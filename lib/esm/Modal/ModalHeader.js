'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "closeButton", "children", "onClose"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { createChainedFunction } from "../internals/utils/index.js";
import { ModalContext } from "./ModalContext.js";
import CloseButton from "../internals/CloseButton/index.js";
import Close from '@rsuite/icons/Close';
import IconButton from "../IconButton/index.js";
var ModalHeader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'modal-header' : _props$classPrefix,
    className = props.className,
    _props$closeButton = props.closeButton,
    closeButton = _props$closeButton === void 0 ? true : _props$closeButton,
    children = props.children,
    onClose = props.onClose,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var context = useContext(ModalContext);
  var _ref = context || {},
    isDrawer = _ref.isDrawer,
    onModalClose = _ref.onModalClose;
  var buttonElement = isDrawer ? /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Close, null),
    appearance: "subtle",
    size: "sm",
    className: prefix('close'),
    onClick: createChainedFunction(onClose, onModalClose)
  }) : /*#__PURE__*/React.createElement(CloseButton, {
    className: prefix('close'),
    onClick: createChainedFunction(onClose, onModalClose)
  });
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), closeButton && buttonElement, children);
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
  children: PropTypes.node
};
export default ModalHeader;