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
var _excluded = ["as", "className", "classPrefix", "colspan", "order"];
/**
 * The `FlexboxGrid.Item` component is used to specify the layout of the child element in the `FlexboxGrid` component.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
var FlexboxGridItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _withClassPrefix;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'flex-box-grid-item' : _props$classPrefix,
    _props$colspan = props.colspan,
    colspan = _props$colspan === void 0 ? 0 : _props$colspan,
    _props$order = props.order,
    order = _props$order === void 0 ? 0 : _props$order,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix[colspan] = colspan >= 0, _withClassPrefix["order-" + order] = order, _withClassPrefix)));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref
  }, rest, {
    className: classes
  }));
});
FlexboxGridItem.displayName = 'FlexboxGridItem';
FlexboxGridItem.propTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  colspan: _propTypes.default.number,
  order: _propTypes.default.number,
  classPrefix: _propTypes.default.string
};
var _default = exports.default = FlexboxGridItem;