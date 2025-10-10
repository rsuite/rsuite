'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "autoScroll", "bordered", "classPrefix", "className", "children", "divider", "hover", "size", "sortable", "pressDelay", "transitionDuration", "onSort", "onSortEnd", "onSortMove", "onSortStart"];
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useSortHelper from "./helper/useSortHelper.js";
import ListContext from "./ListContext.js";
import ListItem from "./ListItem.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `List` component is used to specify the layout of the list.
 * @see https://rsuitejs.com/components/list
 */
var List = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('List', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$au = propsWithDefaults.autoScroll,
    autoScroll = _propsWithDefaults$au === void 0 ? true : _propsWithDefaults$au,
    bordered = propsWithDefaults.bordered,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'list' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$di = propsWithDefaults.divider,
    divider = _propsWithDefaults$di === void 0 ? true : _propsWithDefaults$di,
    hover = propsWithDefaults.hover,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'md' : _propsWithDefaults$si,
    sortable = propsWithDefaults.sortable,
    _propsWithDefaults$pr = propsWithDefaults.pressDelay,
    pressDelay = _propsWithDefaults$pr === void 0 ? 0 : _propsWithDefaults$pr,
    _propsWithDefaults$tr = propsWithDefaults.transitionDuration,
    transitionDuration = _propsWithDefaults$tr === void 0 ? 300 : _propsWithDefaults$tr,
    onSort = propsWithDefaults.onSort,
    onSortEnd = propsWithDefaults.onSortEnd,
    onSortMove = propsWithDefaults.onSortMove,
    onSortStart = propsWithDefaults.onSortStart,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _useSortHelper = useSortHelper({
      autoScroll: autoScroll,
      onSort: onSort,
      onSortEnd: onSortEnd,
      onSortMove: onSortMove,
      onSortStart: onSortStart,
      pressDelay: pressDelay,
      transitionDuration: transitionDuration
    }),
    containerRef = _useSortHelper.containerRef,
    register = _useSortHelper.register,
    sorting = _useSortHelper.sorting,
    handleEnd = _useSortHelper.handleEnd,
    handleStart = _useSortHelper.handleStart,
    handleTouchStart = _useSortHelper.handleTouchStart,
    handleTouchEnd = _useSortHelper.handleTouchEnd;
  var classes = merge(className, withClassPrefix({
    bordered: bordered,
    sortable: sortable,
    sorting: sorting,
    hover: hover,
    divider: divider
  }));
  var contextValue = useMemo(function () {
    return {
      bordered: bordered,
      size: size,
      register: register
    };
  }, [bordered, register, size]);
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "list"
  }, rest, {
    ref: mergeRefs(containerRef, ref),
    className: classes,
    onMouseDown: sortable ? handleStart : undefined,
    onMouseUp: sortable ? handleEnd : undefined,
    onTouchStart: sortable ? handleTouchStart : undefined,
    onTouchEnd: sortable ? handleTouchEnd : undefined
  }), /*#__PURE__*/React.createElement(ListContext.Provider, {
    value: contextValue
  }, children));
});
List.Item = ListItem;
List.displayName = 'List';
List.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  bordered: PropTypes.bool,
  divider: PropTypes.bool,
  hover: PropTypes.bool,
  sortable: PropTypes.bool,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  autoScroll: PropTypes.bool,
  pressDelay: PropTypes.number,
  transitionDuration: PropTypes.number,
  onSortStart: PropTypes.func,
  onSortMove: PropTypes.func,
  onSortEnd: PropTypes.func,
  onSort: PropTypes.func
};
export default List;