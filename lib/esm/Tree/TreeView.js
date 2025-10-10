'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "data", "style", "showIndentLine", "value", "locale", "height", "className", "searchable", "classPrefix", "searchKeyword", "searchBy", "draggable", "disabledItemValues", "loadingNodeValues", "flattenedNodes", "listProps", "listRef", "searchInputRef", "expandItemValues", "onSearch", "onSelect", "onSelectItem", "onChange", "onDragEnd", "onDragStart", "onDragEnter", "onDragLeave", "onDragOver", "onDrop", "onExpand", "onFocusItem", "onScroll"];
import React, { useEffect, useMemo } from 'react';
import isNil from 'lodash/isNil';
import TreeViewNode from "./TreeNode.js";
import IndentLine from "./IndentLine.js";
import useTreeSearch from "./hooks/useTreeSearch.js";
import useTreeDrag from "./hooks/useTreeDrag.js";
import useFocusTree from "./hooks/useFocusTree.js";
import useVirtualizedTreeData from "./hooks/useVirtualizedTreeData.js";
import useTreeNodeProps from "./hooks/useTreeNodeProps.js";
import SearchBox from "../internals/SearchBox/index.js";
import { List, AutoSizer, defaultItemSize } from "../internals/Windowing/index.js";
import { getPathTowardsItem, getKeyParentMap } from "../internals/Tree/utils/index.js";
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { isExpand, hasVisibleChildren, getActiveItem } from "./utils/index.js";
import { onMenuKeyDown } from "../internals/Picker/index.js";
import { TreeView as BaseTreeView } from "../internals/Tree/index.js";
import { useTreeContextProps } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";

/**
 * Props for the TreeViewInner component.
 */
/**
 * Represents the props for the TreeView component.
 */

var TreeView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$data = props.data,
    data = _props$data === void 0 ? [] : _props$data,
    style = props.style,
    showIndentLine = props.showIndentLine,
    valueProp = props.value,
    overrideLocale = props.locale,
    _props$height = props.height,
    height = _props$height === void 0 ? 360 : _props$height,
    className = props.className,
    _props$searchable = props.searchable,
    searchable = _props$searchable === void 0 ? false : _props$searchable,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tree' : _props$classPrefix,
    searchKeyword = props.searchKeyword,
    searchBy = props.searchBy,
    draggable = props.draggable,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    _props$loadingNodeVal = props.loadingNodeValues,
    loadingNodeValues = _props$loadingNodeVal === void 0 ? [] : _props$loadingNodeVal,
    _props$flattenedNodes = props.flattenedNodes,
    flattenedNodes = _props$flattenedNodes === void 0 ? {} : _props$flattenedNodes,
    listProps = props.listProps,
    listRef = props.listRef,
    searchInputRef = props.searchInputRef,
    _props$expandItemValu = props.expandItemValues,
    expandItemValues = _props$expandItemValu === void 0 ? [] : _props$expandItemValu,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onSelectItem = props.onSelectItem,
    onChange = props.onChange,
    onDragEnd = props.onDragEnd,
    onDragStart = props.onDragStart,
    onDragEnter = props.onDragEnter,
    onDragLeave = props.onDragLeave,
    onDragOver = props.onDragOver,
    onDrop = props.onDrop,
    onExpand = props.onExpand,
    onFocusItem = props.onFocusItem,
    onScroll = props.onScroll,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('Combobox', overrideLocale),
    searchPlaceholder = _getLocale.searchPlaceholder,
    noResultsText = _getLocale.noResultsText;
  var _useTreeContextProps = useTreeContextProps(),
    valueKey = _useTreeContextProps.valueKey,
    childrenKey = _useTreeContextProps.childrenKey,
    scrollShadow = _useTreeContextProps.scrollShadow,
    virtualized = _useTreeContextProps.virtualized;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var handleSearchCallback = useEventCallback(function (value, _data, event) {
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  });
  var _useTreeSearch = useTreeSearch({
      callback: handleSearchCallback,
      searchKeyword: searchKeyword,
      data: data,
      searchBy: searchBy
    }),
    filteredData = _useTreeSearch.filteredData,
    keyword = _useTreeSearch.keyword,
    setFilteredData = _useTreeSearch.setFilteredData,
    handleSearch = _useTreeSearch.handleSearch;
  var transformation = useVirtualizedTreeData(flattenedNodes, filteredData, {
    expandItemValues: expandItemValues,
    searchKeyword: keyword
  });
  var getFormattedNodes = function getFormattedNodes(render) {
    if (virtualized) {
      return transformation().filter(function (n) {
        return n.visible;
      });
    }
    return filteredData.map(function (dataItem, index) {
      return render === null || render === void 0 ? void 0 : render(dataItem, index, 1);
    }).filter(function (n) {
      return n;
    });
  };
  useEffect(function () {
    setFilteredData(data, keyword);
  }, [data, keyword, setFilteredData]);

  // TODO-Doma
  // Replace `getKeyParentMap` with `getParentMap`
  var itemParentMap = useMemo(function () {
    return getKeyParentMap(data, function (node) {
      return node[valueKey];
    }, function (node) {
      return node[childrenKey];
    });
  }, [childrenKey, data, valueKey]);
  var _useFocusTree = useFocusTree({
      filteredData: filteredData,
      disabledItemValues: disabledItemValues,
      expandItemValues: expandItemValues,
      searchKeyword: keyword,
      flattenedNodes: flattenedNodes,
      onFocused: onFocusItem,
      onExpand: onExpand
    }),
    focusItemValue = _useFocusTree.focusItemValue,
    setFocusItemValue = _useFocusTree.setFocusItemValue,
    onTreeKeydown = _useFocusTree.onTreeKeydown,
    treeNodesRefs = _useFocusTree.treeNodesRefs,
    saveTreeNodeRef = _useFocusTree.saveTreeNodeRef,
    treeViewRef = _useFocusTree.treeViewRef;
  var _useTreeDrag = useTreeDrag({
      flattenedNodes: flattenedNodes,
      treeNodesRefs: treeNodesRefs,
      draggable: draggable,
      onDragStart: onDragStart,
      onDragEnter: onDragEnter,
      onDragOver: onDragOver,
      onDragLeave: onDragLeave,
      onDragEnd: onDragEnd,
      onDrop: onDrop,
      prefix: prefix
    }),
    dragNode = _useTreeDrag.dragNode,
    dragOverNodeKey = _useTreeDrag.dragOverNodeKey,
    dropNodePosition = _useTreeDrag.dropNodePosition,
    dragEvents = _useTreeDrag.dragEvents;
  var getTreeNodeProps = useTreeNodeProps({
    value: valueProp,
    disabledItemValues: disabledItemValues,
    loadingNodeValues: loadingNodeValues,
    focusItemValue: focusItemValue,
    keyword: keyword,
    dragNode: dragNode,
    dragOverNodeKey: dragOverNodeKey,
    dropNodePosition: dropNodePosition
  });
  var handleSelect = useEventCallback(function (nodeData, event) {
    if (!nodeData) {
      return;
    }
    var nextValue = nodeData[valueKey];
    var path = getPathTowardsItem(nodeData, function (item) {
      return itemParentMap.get(item[valueKey]);
    });
    setFocusItemValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    onSelect === null || onSelect === void 0 || onSelect(nodeData, nextValue, event);
    onSelectItem === null || onSelectItem === void 0 || onSelectItem(nodeData, path);
  });
  var selectActiveItem = useEventCallback(function (event) {
    if (isNil(focusItemValue)) return;
    var activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    handleSelect(activeItem, event);
  });
  var handleTreeKeyDown = useEventCallback(function (event) {
    onTreeKeydown(event);
    onMenuKeyDown(event, {
      enter: selectActiveItem
    });
  });
  var _renderNode = function renderNode(node, index, layer) {
    var visible = node.visible;
    if (!visible) {
      return null;
    }
    var children = node[childrenKey];
    var expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));
    var hasChildren = keyword ? hasVisibleChildren(node, childrenKey) : Boolean(children);
    var nodeProps = _extends({}, getTreeNodeProps(node, layer, index), dragEvents, {
      expanded: expanded,
      draggable: draggable,
      onExpand: onExpand,
      onSelect: handleSelect,
      hasChildren: hasChildren
    });
    if (hasChildren) {
      var _merge;
      layer += 1;
      var childClassName = merge(prefix('node-children'), (_merge = {}, _merge[prefix('node-expanded')] = expanded, _merge));
      return /*#__PURE__*/React.createElement("div", {
        className: childClassName,
        key: node[valueKey]
      }, /*#__PURE__*/React.createElement(TreeViewNode, _extends({}, nodeProps, {
        ref: function ref(_ref) {
          return saveTreeNodeRef(_ref, node.refKey);
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: prefix('group'),
        role: "group"
      }, children === null || children === void 0 ? void 0 : children.map(function (child, i) {
        return _renderNode(child, i, layer);
      }), showIndentLine && /*#__PURE__*/React.createElement(IndentLine, null)));
    }
    return /*#__PURE__*/React.createElement(TreeViewNode, _extends({
      ref: function ref(_ref2) {
        return saveTreeNodeRef(_ref2, node.refKey);
      },
      key: node[valueKey]
    }, nodeProps));
  };
  var renderVirtualListNode = function renderVirtualListNode(_ref3) {
    var index = _ref3.index,
      style = _ref3.style,
      data = _ref3.data;
    var node = data[index];
    var layer = node.layer,
      visible = node.visible,
      hasChildren = node.hasChildren;
    var expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));
    if (!visible) {
      return null;
    }
    var treeNodeProps = _extends({}, getTreeNodeProps(node, layer), dragEvents, {
      expanded: expanded,
      style: style,
      onExpand: onExpand,
      onSelect: handleSelect,
      hasChildren: hasChildren
    });
    return visible && /*#__PURE__*/React.createElement(TreeViewNode, _extends({
      ref: function ref(_ref4) {
        return saveTreeNodeRef(_ref4, node.refKey);
      }
    }, treeNodeProps));
  };
  var classes = merge(withClassPrefix({
    virtualized: virtualized
  }), className);
  var formattedNodes = getFormattedNodes(_renderNode);
  return /*#__PURE__*/React.createElement(Component, {
    ref: ref,
    className: classes,
    style: style
  }, searchable ? /*#__PURE__*/React.createElement(SearchBox, {
    placeholder: searchPlaceholder,
    onChange: handleSearch,
    value: keyword,
    inputRef: searchInputRef
  }) : null, keyword && formattedNodes.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: prefix('empty')
  }, noResultsText) : null, /*#__PURE__*/React.createElement(BaseTreeView, _extends({}, rest, {
    ref: treeViewRef,
    treeRootClassName: prefix('root'),
    onScroll: onScroll,
    onKeyDown: handleTreeKeyDown,
    className: prefix('view'),
    height: height
  }), virtualized ? /*#__PURE__*/React.createElement(AutoSizer, {
    defaultHeight: height,
    style: {
      width: 'auto',
      height: 'auto'
    },
    className: prefix('virt-auto-sizer')
  }, function (_ref5) {
    var height = _ref5.height;
    return /*#__PURE__*/React.createElement(List, _extends({
      ref: listRef,
      height: height,
      itemSize: defaultItemSize,
      itemCount: formattedNodes.length,
      itemData: formattedNodes,
      className: prefix('virt-list'),
      scrollShadow: scrollShadow
    }, listProps), renderVirtualListNode);
  }) : formattedNodes));
});
TreeView.displayName = 'TreeView';
export default TreeView;