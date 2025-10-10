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
var _excluded = ["as", "classPrefix", "className", "level"];
/**
 *
 * The `Heading` component is used to display a heading.
 *
 * @see https://rsuitejs.com/components/heading
 */
var Heading = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Heading', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var as = propsWithDefaults.as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'heading' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    _propsWithDefaults$le = propsWithDefaults.level,
    level = _propsWithDefaults$le === void 0 ? 3 : _propsWithDefaults$le,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var Component = as || "h" + level;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }));
});
Heading.displayName = 'Heading';
Heading.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType,
  level: _propTypes.default.oneOf([1, 2, 3, 4, 5, 6])
};
var _default = exports.default = Heading;