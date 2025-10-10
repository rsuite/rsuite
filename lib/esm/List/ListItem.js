'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "children", "className", "classPrefix", "collection", "disabled", "index", "size"];
import React from 'react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import ListContext from "./ListContext.js";
/**
 * The `List.Item` component is used to specify the layout of the list item.
 * @see https://rsuitejs.com/components/list
 */
var ListItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    children = props.children,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'list-item' : _props$classPrefix,
    _props$collection = props.collection,
    collection = _props$collection === void 0 ? 0 : _props$collection,
    disabled = props.disabled,
    index = props.index,
    sizeProp = props.size,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useContext = useContext(ListContext),
    bordered = _useContext.bordered,
    register = _useContext.register,
    parentSize = _useContext.size;
  var size = sizeProp || parentSize;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var listItemRef = useRef(null);
  useEffect(function () {
    if (listItemRef.current) {
      var _register = register({
          node: listItemRef.current,
          edgeOffset: null,
          info: {
            collection: collection,
            disabled: disabled,
            index: index
          }
        }),
        unregister = _register.unregister;
      return unregister;
    }
  }, [collection, disabled, index, register]);
  var classes = merge(className, withClassPrefix(size, {
    disabled: disabled,
    bordered: bordered
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "listitem",
    "aria-disabled": disabled
  }, rest, {
    ref: mergeRefs(listItemRef, ref),
    className: classes
  }), children);
});
ListItem.displayName = 'ListItem';
ListItem.propTypes = {
  index: PropTypes.number,
  collection: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  children: PropTypes.node
};
export default ListItem;