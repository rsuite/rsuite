'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Check = _interopRequireDefault(require("@rsuite/icons/Check"));
var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));
var _propTypes2 = require("../internals/propTypes");
var _hooks = require("../internals/hooks");
var _excluded = ["as", "className", "classPrefix", "style", "itemWidth", "status", "icon", "stepNumber", "description", "title"];
var STEP_STATUS_ICON = {
  finish: /*#__PURE__*/_react.default.createElement(_Check.default, null),
  wait: null,
  process: null,
  error: /*#__PURE__*/_react.default.createElement(_Close.default, null)
};
/**
 * The `Step.Item` component is used to set the layout of the child element in the `Steps` component.
 *
 * @see https://rsuitejs.com/components/steps
 */
var StepItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix((_withClassPrefix = {
    custom: icon
  }, _withClassPrefix["status-" + status] = status, _withClassPrefix)));
  var styles = (0, _extends2.default)({
    width: itemWidth
  }, style);
  var iconNode = /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('icon', "icon-" + status)
  }, status ? (_STEP_STATUS_ICON$sta = STEP_STATUS_ICON[status]) !== null && _STEP_STATUS_ICON$sta !== void 0 ? _STEP_STATUS_ICON$sta : stepNumber : stepNumber);
  if (icon) {
    iconNode = /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('icon')
    }, icon);
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('tail')
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(['icon-wrapper', icon ? 'custom-icon' : ''])
  }, iconNode), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('title')
  }, title), description && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('description')
  }, description)));
});
StepItem.displayName = 'StepItem';
StepItem.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  style: _propTypes.default.object,
  itemWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  status: (0, _propTypes2.oneOf)(['finish', 'wait', 'process', 'error']),
  icon: _propTypes.default.object,
  stepNumber: _propTypes.default.number,
  description: _propTypes.default.node,
  title: _propTypes.default.node
};
var _default = exports.default = StepItem;