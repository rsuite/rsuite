'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "alignItems", "classPrefix", "childrenRenderMode", "className", "children", "direction", "justifyContent", "spacing", "divider", "style", "wrap"];
import React from 'react';
import PropTypes from 'prop-types';
import StackItem from "./StackItem.js";
import { isSupportFlexGap, ReactChildren } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
function isStackItem(child) {
  var _child$type;
  return child.type === StackItem || ((_child$type = child.type) === null || _child$type === void 0 ? void 0 : _child$type.displayName) === 'StackItem';
}

/**
 * The `Stack` component is a quick layout component through Flexbox,
 * supporting vertical and horizontal stacking, custom spacing and line wrapping.
 *
 * @see https://rsuitejs.com/components/stack
 */
var Stack = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _itemStyles;
  var _useCustom = useCustom('Stack', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$al = propsWithDefaults.alignItems,
    alignItems = _propsWithDefaults$al === void 0 ? 'center' : _propsWithDefaults$al,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'stack' : _propsWithDefaults$cl,
    _propsWithDefaults$ch = propsWithDefaults.childrenRenderMode,
    childrenRenderMode = _propsWithDefaults$ch === void 0 ? 'wrap' : _propsWithDefaults$ch,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    direction = propsWithDefaults.direction,
    justifyContent = propsWithDefaults.justifyContent,
    spacing = propsWithDefaults.spacing,
    divider = propsWithDefaults.divider,
    style = propsWithDefaults.style,
    wrap = propsWithDefaults.wrap,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  var isSupportGap = isSupportFlexGap();
  var flexGap = Array.isArray(spacing) ? spacing : [spacing, spacing];
  var itemStyles = (_itemStyles = {}, _itemStyles[rtl ? 'marginLeft' : 'marginRight'] = flexGap[0], _itemStyles.marginBottom = flexGap[1], _itemStyles);
  var styles = _extends({
    alignItems: alignItems,
    justifyContent: justifyContent,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    gap: isSupportGap ? spacing : undefined
  }, style);

  /*
   * toArray remove undefined, null and boolean
   */
  var filterChildren = React.Children.toArray(children);
  var count = ReactChildren.count(filterChildren);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), ReactChildren.map(filterChildren, function (child, index) {
    var childNode = childrenRenderMode === 'wrap' && !isStackItem(child) ? /*#__PURE__*/React.createElement(StackItem, {
      key: index,
      className: prefix('item'),
      style: !isSupportGap ? itemStyles : undefined
    }, child) : (/*#__PURE__*/React.cloneElement(child, {
      className: merge(prefix('item'), child.props.className),
      style: !isSupportGap ? _extends({}, itemStyles, child.props.style) : child.props.style
    }));
    return [childNode, index < count - 1 ? divider : null];
  }));
});
Stack.Item = StackItem;
Stack.displayName = 'Stack';
Stack.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  direction: oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  alignItems: oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  justifyContent: oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  divider: PropTypes.node,
  wrap: PropTypes.bool
};
export default Stack;