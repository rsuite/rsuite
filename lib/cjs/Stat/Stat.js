'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _StatLabel = _interopRequireDefault(require("./StatLabel"));
var _StatValue = _interopRequireDefault(require("./StatValue"));
var _StatValueUnit = _interopRequireDefault(require("./StatValueUnit"));
var _StatHelpText = _interopRequireDefault(require("./StatHelpText"));
var _StatTrend = _interopRequireDefault(require("./StatTrend"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "children", "bordered", "icon"];
var Stat = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Stat', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'stat' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    bordered = propsWithDefaults.bordered,
    icon = propsWithDefaults.icon,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    bordered: bordered
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    className: classes,
    ref: ref
  }, rest), icon && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('icon')
  }, icon), /*#__PURE__*/_react.default.createElement("dl", {
    className: prefix('body')
  }, children));
});
Stat.displayName = 'Stat';
Stat.propTypes = {
  bordered: _propTypes.default.bool,
  icon: _propTypes.default.node
};
Stat.Label = _StatLabel.default;
Stat.Value = _StatValue.default;
Stat.Trend = _StatTrend.default;
Stat.ValueUnit = _StatValueUnit.default;
Stat.HelpText = _StatHelpText.default;
var _default = exports.default = Stat;