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
var _excluded = ["as", "className", "classPrefix", "children", "style", "visible", "arrow"];
/**
 * The `Tooltip` component is used to describe a element.
 *
 * @see https://rsuitejs.com/components/tooltip
 */
var Tooltip = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Tooltip', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'tooltip' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    style = propsWithDefaults.style,
    visible = propsWithDefaults.visible,
    _propsWithDefaults$ar = propsWithDefaults.arrow,
    arrow = _propsWithDefaults$ar === void 0 ? true : _propsWithDefaults$ar,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    arrow: arrow
  }));
  var styles = (0, _extends2.default)({
    opacity: visible ? 1 : undefined
  }, style);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "tooltip"
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), children);
});
Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
  visible: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  arrow: _propTypes.default.bool
};
var _default = exports.default = Tooltip;