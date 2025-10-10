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
var _excluded = ["as", "classPrefix", "className", "children", "columns", "spacing", "style"];
var CardGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('CardGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'card-group' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    columns = propsWithDefaults.columns,
    _propsWithDefaults$sp = propsWithDefaults.spacing,
    spacing = _propsWithDefaults$sp === void 0 ? 16 : _propsWithDefaults$sp,
    style = propsWithDefaults.style,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var styles = (0, _extends2.default)({}, style, {
    '--rs-columns': columns,
    '--rs-spacing': typeof spacing === 'number' ? spacing + "px" : spacing
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: classes,
    style: styles
  }, rest), children);
});
CardGroup.displayName = 'CardGroup';
CardGroup.propTypes = {
  columns: _propTypes.default.number,
  spacing: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var _default = exports.default = CardGroup;