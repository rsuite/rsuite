'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../hooks");
var _CustomProvider = require("../../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "children", "localeKey", "placeholder"];
/**
 * Make the component display in plain text, and display default characters when there is no children.
 * @private
 */
var Plaintext = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)(),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    empty: !children
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "text"
  }, rest, {
    ref: ref,
    className: classes
  }), children ? children : placeholder);
});
Plaintext.displayName = 'Plaintext';
var _default = exports.default = Plaintext;