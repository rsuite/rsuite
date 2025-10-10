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
var _propTypes2 = require("../internals/propTypes");
var _excluded = ["as", "align", "classPrefix", "color", "className", "maxLines", "weight", "muted", "transform", "size", "style"];
var fontSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20
};
/**
 *
 * The `Text` component is used to display text.
 *
 * @see https://rsuitejs.com/components/text
 */
var Text = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Text', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'p' : _propsWithDefaults$as,
    align = propsWithDefaults.align,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'text' : _propsWithDefaults$cl,
    color = propsWithDefaults.color,
    className = propsWithDefaults.className,
    maxLines = propsWithDefaults.maxLines,
    weight = propsWithDefaults.weight,
    muted = propsWithDefaults.muted,
    transform = propsWithDefaults.transform,
    size = propsWithDefaults.size,
    style = propsWithDefaults.style,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(color, align, weight, transform, {
    muted: muted,
    ellipsis: maxLines
  }));
  var styles = (0, _extends2.default)({
    fontSize: fontSizeMap[size] || size
  }, maxLines ? {
    WebkitLineClamp: maxLines
  } : null, style);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }));
});
Text.displayName = 'Text';
Text.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType,
  size: _propTypes.default.oneOfType([_propTypes.default.number, (0, _propTypes2.oneOf)(['sm', 'md', 'lg', 'xl', 'xxl'])]),
  muted: _propTypes.default.bool,
  transform: (0, _propTypes2.oneOf)(['uppercase', 'lowercase', 'capitalize']),
  align: (0, _propTypes2.oneOf)(['left', 'center', 'right', 'justify']),
  weight: (0, _propTypes2.oneOf)(['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
  maxLines: _propTypes.default.number
};
var _default = exports.default = Text;