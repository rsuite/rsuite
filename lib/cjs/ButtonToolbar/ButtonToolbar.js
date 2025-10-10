'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _Stack = _interopRequireDefault(require("../Stack"));
var _excluded = ["className", "classPrefix", "as", "role"];
/**
 * The ButtonToolbar component is used to group a series of buttons together in a single line.
 * @see https://rsuitejs.com/components/button/#button-toolbar
 */
var ButtonToolbar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('ButtonToolbar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn-toolbar' : _propsWithDefaults$cl,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? _Stack.default : _propsWithDefaults$as,
    _propsWithDefaults$ro = propsWithDefaults.role,
    role = _propsWithDefaults$ro === void 0 ? 'toolbar' : _propsWithDefaults$ro,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var stackProps = Component === _Stack.default ? {
    wrap: true,
    spacing: 10,
    childrenRenderMode: 'clone'
  } : null;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, stackProps, rest, {
    role: role,
    ref: ref,
    className: classes
  }));
});
ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string
};
var _default = exports.default = ButtonToolbar;