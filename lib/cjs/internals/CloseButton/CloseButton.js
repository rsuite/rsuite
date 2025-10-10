'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));
var _hooks = require("../hooks");
var _CustomProvider = require("../../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "locale"];
/**
 * Close button for components such as Message and Notification.
 */
var CloseButton = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'button' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'btn-close' : _props$classPrefix,
    className = props.className,
    overrideLocale = props.locale,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _getLocale = getLocale('CloseButton', overrideLocale),
    closeLabel = _getLocale.closeLabel;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    type: "button",
    ref: ref,
    className: classes,
    "aria-label": closeLabel
  }, rest), /*#__PURE__*/_react.default.createElement(_Close.default, null));
});
CloseButton.displayName = 'CloseButton';
var _default = exports.default = CloseButton;