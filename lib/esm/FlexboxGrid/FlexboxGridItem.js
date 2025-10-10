'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "colspan", "order"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
/**
 * The `FlexboxGrid.Item` component is used to specify the layout of the child element in the `FlexboxGrid` component.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
var FlexboxGridItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix[colspan] = colspan >= 0, _withClassPrefix["order-" + order] = order, _withClassPrefix)));
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref
  }, rest, {
    className: classes
  }));
});
FlexboxGridItem.displayName = 'FlexboxGridItem';
FlexboxGridItem.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  colspan: PropTypes.number,
  order: PropTypes.number,
  classPrefix: PropTypes.string
};
export default FlexboxGridItem;