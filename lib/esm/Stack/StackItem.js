'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "style", "className", "alignSelf", "flex", "grow", "shrink", "order", "basis"];
import React from 'react';
import PropTypes from 'prop-types';
import { oneOf } from "../internals/propTypes/index.js";
/**
 * The `Stack.Item` component is used to set the layout of the child element in the `Stack` component.
 *
 * @see https://rsuitejs.com/components/stack
 */
export default function StackItem(props) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: className,
    style: _extends({
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
  className: PropTypes.string,
  children: PropTypes.node,
  alignSelf: oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.number,
  shrink: PropTypes.number,
  order: PropTypes.number,
  basis: PropTypes.string
};