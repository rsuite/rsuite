'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "closable", "duration", "className", "type", "header", "children", "onClose"];
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDelayedClosure from "../toaster/hooks/useDelayedClosure.js";
import CloseButton from "../internals/CloseButton/index.js";
import { MESSAGE_STATUS_ICONS } from "../internals/constants/statusIcons.js";
import { useClassNames, useIsMounted, useEventCallback } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Notification` component is used to display global messages and notifications.
 *
 * @see https://rsuitejs.com/components/notification
 */
var Notification = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Notification', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'notification' : _propsWithDefaults$cl,
    closable = propsWithDefaults.closable,
    _propsWithDefaults$du = propsWithDefaults.duration,
    duration = _propsWithDefaults$du === void 0 ? 4500 : _propsWithDefaults$du,
    className = propsWithDefaults.className,
    type = propsWithDefaults.type,
    header = propsWithDefaults.header,
    children = propsWithDefaults.children,
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

  // Click to trigger to close the message
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
  var renderHeader = function renderHeader() {
    if (!header) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: prefix('title')
    }, type ? /*#__PURE__*/React.createElement("div", {
      className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["title-with-icon"])))
    }, MESSAGE_STATUS_ICONS[type], header) : /*#__PURE__*/React.createElement("div", {
      className: prefix('title')
    }, header));
  };
  if (display === 'hide') {
    return null;
  }
  var classes = merge(className, withClassPrefix(type, display, {
    closable: closable
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "alert"
  }, rest, {
    ref: mergeRefs(targetRef, ref),
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["content"])))
  }, renderHeader(), /*#__PURE__*/React.createElement("div", {
    className: prefix('description')
  }, typeof children === 'function' ? children() : children)), closable && /*#__PURE__*/React.createElement(CloseButton, {
    onClick: handleClose
  }));
});
Notification.displayName = 'Notification';
Notification.propTypes = {
  as: PropTypes.elementType,
  duration: PropTypes.number,
  header: PropTypes.node,
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  type: oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func
};
export default Notification;