'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = StackItem;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../internals/propTypes");
var _excluded = ["as", "style", "className", "alignSelf", "flex", "grow", "shrink", "order", "basis"];
/**
 * The `Stack.Item` component is used to set the layout of the child element in the `Stack` component.
 *
 * @see https://rsuitejs.com/components/stack
 */
function StackItem(props) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    style = props.style,
    className = props.className,
    alignSelf = props.alignSelf,
    flex = props.flex,
    grow = props.grow,
    shrink = props.shrink,
    order = props.order,
    basis = props.basis,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    className: className,
    style: (0, _extends2.default)({
      alignSelf: alignSelf,
      order: order
    }, flex ? {
      flex: flex
    } : {
      flexGrow: grow,
      flexShrink: shrink,
      flexBasis: basis
    }, style)
  }, rest));
}
StackItem.displayName = 'StackItem';
StackItem.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  alignSelf: (0, _propTypes2.oneOf)(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  grow: _propTypes.default.number,
  shrink: _propTypes.default.number,
  order: _propTypes.default.number,
  basis: _propTypes.default.string
};