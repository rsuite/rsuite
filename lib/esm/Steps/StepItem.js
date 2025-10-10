'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "style", "itemWidth", "status", "icon", "stepNumber", "description", "title"];
import React from 'react';
import PropTypes from 'prop-types';
import Check from '@rsuite/icons/Check';
import Close from '@rsuite/icons/Close';
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
var STEP_STATUS_ICON = {
  finish: /*#__PURE__*/React.createElement(Check, null),
  wait: null,
  process: null,
  error: /*#__PURE__*/React.createElement(Close, null)
};
/**
 * The `Step.Item` component is used to set the layout of the child element in the `Steps` component.
 *
 * @see https://rsuitejs.com/components/steps
 */
var StepItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _withClassPrefix, _STEP_STATUS_ICON$sta;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'steps-item' : _props$classPrefix,
    style = props.style,
    itemWidth = props.itemWidth,
    status = props.status,
    icon = props.icon,
    stepNumber = props.stepNumber,
    description = props.description,
    title = props.title,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix((_withClassPrefix = {
    custom: icon
  }, _withClassPrefix["status-" + status] = status, _withClassPrefix)));
  var styles = _extends({
    width: itemWidth
  }, style);
  var iconNode = /*#__PURE__*/React.createElement("span", {
    className: prefix('icon', "icon-" + status)
  }, status ? (_STEP_STATUS_ICON$sta = STEP_STATUS_ICON[status]) !== null && _STEP_STATUS_ICON$sta !== void 0 ? _STEP_STATUS_ICON$sta : stepNumber : stepNumber);
  if (icon) {
    iconNode = /*#__PURE__*/React.createElement("span", {
      className: prefix('icon')
    }, icon);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('tail')
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix(['icon-wrapper', icon ? 'custom-icon' : ''])
  }, iconNode), /*#__PURE__*/React.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix('title')
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: prefix('description')
  }, description)));
});
StepItem.displayName = 'StepItem';
StepItem.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: oneOf(['finish', 'wait', 'process', 'error']),
  icon: PropTypes.object,
  stepNumber: PropTypes.number,
  description: PropTypes.node,
  title: PropTypes.node
};
export default StepItem;