'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.NavbarContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _NavbarBody = _interopRequireDefault(require("./NavbarBody"));
var _NavbarHeader = _interopRequireDefault(require("./NavbarHeader"));
var _NavbarBrand = _interopRequireDefault(require("./NavbarBrand"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["className", "as", "classPrefix", "appearance"];
var NavbarContext = exports.NavbarContext = /*#__PURE__*/_react.default.createContext(false);
/**
 * The `Navbar` component is used to create a navigation header.
 * @see https://rsuitejs.com/components/navbar
 */
var Navbar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Navbar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'nav' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'navbar' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(appearance));
  return /*#__PURE__*/_react.default.createElement(NavbarContext.Provider, {
    value: true
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  })));
});
Navbar.Header = _NavbarHeader.default;
Navbar.Body = _NavbarBody.default;
Navbar.Brand = _NavbarBrand.default;
Navbar.displayName = 'Navbar';
var _default = exports.default = Navbar;