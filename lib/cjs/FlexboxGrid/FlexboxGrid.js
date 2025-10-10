'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _FlexboxGridItem = _interopRequireDefault(require("./FlexboxGridItem"));
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "classPrefix", "align", "justify"];
/**
 * The FlexboxGrid component is a box that can be used to layout other components.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
var FlexboxGrid = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('FlexboxGrid', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'flex-box-grid' : _propsWithDefaults$cl,
    _propsWithDefaults$al = propsWithDefaults.align,
    align = _propsWithDefaults$al === void 0 ? 'top' : _propsWithDefaults$al,
    _propsWithDefaults$ju = propsWithDefaults.justify,
    justify = _propsWithDefaults$ju === void 0 ? 'start' : _propsWithDefaults$ju,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(align, justify));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }));
});
FlexboxGrid.Item = _FlexboxGridItem.default;
FlexboxGrid.displayName = 'FlexboxGrid';
FlexboxGrid.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  align: (0, _propTypes2.oneOf)(['top', 'middle', 'bottom']),
  justify: (0, _propTypes2.oneOf)(['start', 'end', 'center', 'space-around', 'space-between'])
};
var _default = exports.default = FlexboxGrid;