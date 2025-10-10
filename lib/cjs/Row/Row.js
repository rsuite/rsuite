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
var _utils = require("../internals/utils");
var _excluded = ["as", "classPrefix", "className", "gutter", "children", "style"];
/**
 * The `Row` component is used for layout and grids.
 * @see https://rsuitejs.com/components/grid
 */
var Row = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Row', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'row' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    gutter = propsWithDefaults.gutter,
    children = propsWithDefaults.children,
    style = propsWithDefaults.style,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var cols = children;
  var rowStyles = style;
  if (typeof gutter !== 'undefined') {
    var padding = gutter / 2;
    cols = _utils.ReactChildren.mapCloneElement(children, function (child) {
      return (0, _extends2.default)({}, child.props, {
        style: (0, _extends2.default)({}, child.props.style, {
          paddingLeft: padding,
          paddingRight: padding
        })
      });
    });
    rowStyles = (0, _extends2.default)({}, style, {
      marginLeft: -padding,
      marginRight: -padding
    });
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "row"
  }, rest, {
    ref: ref,
    className: classes,
    style: rowStyles
  }), cols);
});
Row.displayName = 'Row';
Row.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  gutter: _propTypes.default.number,
  style: _propTypes.default.any,
  as: _propTypes.default.elementType,
  children: _propTypes.default.node
};
var _default = exports.default = Row;