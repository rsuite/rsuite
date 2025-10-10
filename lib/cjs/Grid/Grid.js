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
var _excluded = ["as", "classPrefix", "className", "fluid"];
/**
 * The Grid component is used to specify the layout of child elements in rows and columns.
 * @see https://rsuitejs.com/components/grid
 */
var Grid = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Grid', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'grid-container' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    fluid = propsWithDefaults.fluid,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, fluid ? prefix({
    fluid: fluid
  }) : withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "grid"
  }, rest, {
    ref: ref,
    className: classes
  }));
});
Grid.displayName = 'Grid';
Grid.propTypes = {
  className: _propTypes.default.string,
  fluid: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType
};
var _default = exports.default = Grid;