'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Ripple = _interopRequireDefault(require("../internals/Ripple"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _excluded = ["as", "active", "disabled", "className", "classPrefix", "children", "eventKey", "style", "onSelect", "onClick"];
var PaginationButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'button' : _props$as,
    active = props.active,
    disabled = props.disabled,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'pagination-btn' : _props$classPrefix,
    children = props.children,
    eventKey = props.eventKey,
    style = props.style,
    onSelect = props.onSelect,
    onClick = props.onClick,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active,
    disabled: disabled
  }));
  var handleClick = (0, _hooks.useEventCallback)(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
  });
  var asProps = {};
  if (typeof Component !== 'string') {
    asProps.eventKey = eventKey;
    asProps.active = active;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, asProps, {
    disabled: disabled,
    onClick: (0, _utils.createChainedFunction)(onClick, handleClick),
    ref: ref,
    className: classes,
    style: style
  }), children, !disabled ? /*#__PURE__*/_react.default.createElement(_Ripple.default, null) : null);
});
PaginationButton.displayName = 'PaginationButton';
var _default = exports.default = PaginationButton;