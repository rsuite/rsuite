'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var _excluded = ["as", "bordered", "centered", "className", "classPrefix", "children", "closable", "duration", "full", "header", "type", "showIcon", "onClose"];
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CloseButton from "../internals/CloseButton/index.js";
import useDelayedClosure from "../toaster/hooks/useDelayedClosure.js";
import { STATUS } from "../internals/constants/index.js";
import { MESSAGE_STATUS_ICONS } from "../internals/constants/statusIcons.js";
import { useClassNames, useIsMounted, useEventCallback } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Message` component is used to display important messages to users.
 * @see https://rsuitejs.com/components/message
 */
var Message = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _withClassPrefix;
  var _useCustom = useCustom('Message', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    bordered = propsWithDefaults.bordered,
    centered = propsWithDefaults.centered,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'message' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    closable = propsWithDefaults.closable,
    _propsWithDefaults$du = propsWithDefaults.duration,
    duration = _propsWithDefaults$du === void 0 ? 2000 : _propsWithDefaults$du,
    full = propsWithDefaults.full,
    header = propsWithDefaults.header,
    _propsWithDefaults$ty = propsWithDefaults.type,
    type = _propsWithDefaults$ty === void 0 ? 'info' : _propsWithDefaults$ty,
    showIcon = propsWithDefaults.showIcon,
    onClose = propsWithDefaults.onClose,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useState = useState('show'),
    display = _useState[0],
    setDisplay = _useState[1];
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var isMounted = useIsMounted();
  var targetRef = React.useRef(null);

  // Timed close message
  var _useDelayedClosure = useDelayedClosure({
      targetRef: targetRef,
      onClose: onClose,
      duration: duration
    }),
    clear = _useDelayedClosure.clear;
  var handleClose = useEventCallback(function (event) {
    setDisplay('hiding');
    onClose === null || onClose === void 0 || onClose(event);
    clear();
    setTimeout(function () {
      if (isMounted()) {
        setDisplay('hide');
      }
    }, 1000);
  });
  if (display === 'hide') {
    return null;
  }
  var classes = merge(className, withClassPrefix(type, display, (_withClassPrefix = {
    full: full,
    bordered: bordered,
    centered: centered
  }, _withClassPrefix['has-title'] = header, _withClassPrefix['has-icon'] = showIcon, _withClassPrefix)));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "alert"
  }, rest, {
    ref: mergeRefs(targetRef, ref),
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["container"])))
  }, closable && /*#__PURE__*/React.createElement(CloseButton, {
    onClick: handleClose
  }), showIcon && /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["icon"])))
  }, MESSAGE_STATUS_ICONS[type]), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["content"])))
  }, header && /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["header"])))
  }, header), children && /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject5 || (_templateObject5 = _taggedTemplateLiteralLoose(["body"])))
  }, children))));
});
Message.displayName = 'Message';
Message.propTypes = {
  bordered: PropTypes.bool,
  centered: PropTypes.bool,
  closable: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  description: PropTypes.node,
  full: PropTypes.bool,
  onClose: PropTypes.func,
  showIcon: PropTypes.bool,
  title: PropTypes.node,
  type: oneOf(STATUS)
};
export default Message;