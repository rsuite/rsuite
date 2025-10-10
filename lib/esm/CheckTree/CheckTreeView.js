'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "cascade", "data", "disabledItemValues", "expandItemValues", "height", "locale", "listProps", "listRef", "style", "searchKeyword", "showIndentLine", "searchable", "searchInputRef", "uncheckableItemValues", "loadingNodeValues", "flattenedNodes", "searchBy", "onChange", "onSearch", "onSelect", "onSelectItem", "onScroll", "onExpand", "onFocusItem"];
import React, { useEffect, useMemo } from 'react';
import isNil from 'lodash/isNil';
import CheckTreeNode from "./CheckTreeNode.js";
import IndentLine from "../Tree/IndentLine.js";
import SearchBox from "../internals/SearchBox/index.js";
import useTreeSearch from "../Tree/hooks/useTreeSearch.js";
import useFocusTree from "../Tree/hooks/useFocusTree.js";
import useVirtualizedTreeData from "../Tree/hooks/useVirtualizedTreeData.js";
import useTreeCheckState from "./hooks/useTreeCheckState.js";
import useTreeNodeProps from "./hooks/useTreeNodeProps.js";
import { List, AutoSizer, defaultItemSize } from "../internals/Windowing/index.js";
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { getPathTowardsItem, getKeyParentMap } from "../internals/Tree/utils/index.js";
import { onMenuKeyDown } from "../internals/Picker/index.js";
import { TreeView } from "../internals/Tree/index.js";
import { hasGrandchild, isEveryFirstLevelNodeUncheckable, getFormattedTree, isNodeUncheckable } from "./utils.js";
import { hasVisibleChildren, getActiveItem, isExpand } from "../Tree/utils/index.js";
import { useTreeContextProps } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";

/**
 * Props for the CheckTreeView component.
 */

var CheckTreeView = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _merge2;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'check-tree' : _props$classPrefix,
    _props$cascade = props.cascade,
    cascade = _props$cascade === void 0 ? true : _props$cascade,
    _props$data = props.data,
    data = _props$data === void 0 ? [] : _props$data,
    _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    _props$expandItemValu = props.expandItemValues,
    expandItemValues = _props$expandItemValu === void 0 ? [] : _props$expandItemValu,
    _props$height = props.height,
    height = _props$height === void 0 ? 360 : _props$height,
    overrideLocale = props.locale,
    listProps = props.listProps,
    listRef = props.listRef,
    style = props.style,
    searchKeyword = props.searchKeyword,
    showIndentLine = props.showIndentLine,
    searchable = props.searchable,
    searchInputRef = props.searchInputRef,
    _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? [] : _props$uncheckableIte,
    _props$loadingNodeVal = props.loadingNodeValues,
    loadingNodeValues = _props$loadingNodeVal === void 0 ? [] : _props$loadingNodeVal,
    _props$flattenedNodes = props.flattenedNodes,
    flattenedNodes = _props$flattenedNodes === void 0 ? {} : _props$flattenedNodes,
    searchBy = props.searchBy,
    onChange = props.onChange,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onSelectItem = props.onSelectItem,
    onScroll = props.onScroll,
    onExpand = props.onExpand,
    onFocusItem = props.onFocusItem,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('Combobox', overrideLocale),
    searchPlaceholder = _getLocale.searchPlaceholder,
    noResultsText = _getLocale.noResultsText;
  var _useTreeContextProps = useTreeContextProps(),
    childrenKey = _useTreeContextProps.childrenKey,
    valueKey = _useTreeContextProps.valueKey,
    virtualized = _useTreeContextProps.virtualized,
    scrollShadow = _useTreeContextProps.scrollShadow;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useTreeCheckState = useTreeCheckState({
      cascade: cascade,
      flattenedNodes: flattenedNodes,
      uncheckableItemValues: uncheckableItemValues
    }),
    getCheckedValues = _useTreeCheckState.getCheckedValues;
  var handleSearchCallback = function handleSearchCallback(value, _data, event) {
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  };
  var _useTreeSearch = useTreeSearch({
      callback: handleSearchCallback,
      data: data,
      searchKeyword: searchKeyword,
      searchBy: searchBy
    }),
    filteredData = _useTreeSearch.filteredData,
    keyword = _useTreeSearch.keyword,
    setFilteredData = _useTreeSearch.setFilteredData,
    handleSearch = _useTreeSearch.handleSearch;
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
    saveTreeNodeRef = _useFocusTree.saveTreeNodeRef;
  var transformation = useVirtualizedTreeData(flattenedNodes, filteredData, {
    cascade: cascade,
    expandItemValues: expandItemValues,
    searchKeyword: keyword
  });

  /**
   * Get formatted nodes for render tree
   * @params render - renderNode function. only used when virtualized setting false
   */
  var getFormattedNodes = function getFormattedNodes(render) {
    if (virtualized) {
      return transformation().filter(function (item) {
        return item.visible;
      });
    }
    return getFormattedTree(flattenedNodes, filteredData, {
      childrenKey: childrenKey,
      cascade: cascade
    }).map(function (node) {
      return render === null || render === void 0 ? void 0 : render(node, 1);
    }).filter(function (item) {
      return item;
    });
  };
  var getTreeNodeProps = useTreeNodeProps({
    uncheckableItemValues: uncheckableItemValues,
    disabledItemValues: disabledItemValues,
    loadingNodeValues: loadingNodeValues,
    focusItemValue: focusItemValue,
    flattenedNodes: flattenedNodes,
    keyword: keyword
  });
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
  var handleSelect = useEventCallback(function (node, event) {
    var currentNode = node.refKey ? flattenedNodes[node.refKey] : null;
    if (!node || !currentNode) {
      return;
    }
    var checkedValues = getCheckedValues(node, !currentNode.check);
    var path = getPathTowardsItem(node, function (item) {
      return itemParentMap.get(item[valueKey]);
    });
    setFocusItemValue(node[valueKey]);
    onChange === null || onChange === void 0 || onChange(checkedValues, event);
    onSelect === null || onSelect === void 0 || onSelect(node, checkedValues, event);
    onSelectItem === null || onSelectItem === void 0 || onSelectItem(node, path);
  });
  var selectActiveItem = function selectActiveItem(event) {
    if (isNil(focusItemValue)) return;
    var activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    if (!isNodeUncheckable(activeItem, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    }) && activeItem !== null) {
      handleSelect(activeItem, event);
    }
  };
  var handleTreeKeyDown = useEventCallback(function (event) {
    onTreeKeydown(event);
    onMenuKeyDown(event, {
      enter: selectActiveItem
    });
  });
  var _renderNode = function renderNode(node, layer) {
    var visible = node.visible,
      refKey = node.refKey,
      parent = node.parent;

    // when searching, all nodes should be expand
    var expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));
    if (!visible) {
      return null;
    }
    var children = node[childrenKey];
    var hasChildren = keyword ? hasVisibleChildren(node, childrenKey) : Boolean(children);
    var treeNodeProps = _extends({}, getTreeNodeProps(_extends({}, node, {
      parent: parent
    })), {
      layer: layer,
      expanded: expanded,
      hasChildren: hasChildren,
      onSelect: handleSelect,
      onExpand: onExpand
    });
    if (hasChildren) {
      var _merge;
      layer += 1;
      var childClassName = merge(prefix('node-children'), (_merge = {}, _merge[prefix('node-expanded')] = expanded, _merge));
      var nodes = children || [];
      return /*#__PURE__*/React.createElement("div", {
        className: childClassName,
        key: node[valueKey]
      }, /*#__PURE__*/React.createElement(CheckTreeNode, _extends({}, treeNodeProps, {
        treeItemRef: function treeItemRef(ref) {
          return saveTreeNodeRef(ref, refKey);
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: prefix('group'),
        role: "group"
      }, nodes.map(function (child) {
        return _renderNode(child, layer);
      }), showIndentLine && /*#__PURE__*/React.createElement(IndentLine, null)));
    }
    return /*#__PURE__*/React.createElement(CheckTreeNode, _extends({
      key: node[valueKey],
      treeItemRef: function treeItemRef(ref) {
        return saveTreeNodeRef(ref, refKey);
      }
    }, treeNodeProps));
  };
  var renderVirtualListNode = function renderVirtualListNode(_ref) {
    var index = _ref.index,
      style = _ref.style,
      data = _ref.data;
    var node = data[index];
    var layer = node.layer,
      refKey = node.refKey,
      visible = node.visible,
      hasChildren = node.hasChildren,
      parent = node.parent;
    var expanded = isExpand(keyword, expandItemValues.includes(node[valueKey]));
    var treeNodeProps = _extends({}, getTreeNodeProps(_extends({}, node, {
      parent: parent
    })), {
      onSelect: handleSelect,
      onExpand: onExpand,
      expanded: expanded,
      layer: layer,
      hasChildren: hasChildren
    });
    return visible && /*#__PURE__*/React.createElement(CheckTreeNode, _extends({
      style: style,
      ref: function ref(_ref2) {
        return saveTreeNodeRef(_ref2, refKey);
      }
    }, treeNodeProps));
  };
  var classes = merge(className, withClassPrefix({
    'without-children': !hasGrandchild(data, childrenKey),
    virtualized: virtualized
  }));
  var formattedNodes = getFormattedNodes(_renderNode);
  var treeNodesClass = merge(prefix('root'), (_merge2 = {}, _merge2[prefix('all-uncheckable')] = isEveryFirstLevelNodeUncheckable(flattenedNodes, uncheckableItemValues, valueKey), _merge2));
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
  }, noResultsText) : null, /*#__PURE__*/React.createElement(TreeView, _extends({}, rest, {
    multiselectable: true,
    treeRootClassName: treeNodesClass,
    className: prefix('view'),
    onScroll: onScroll,
    onKeyDown: handleTreeKeyDown,
    height: height
  }), virtualized ? /*#__PURE__*/React.createElement(AutoSizer, {
    defaultHeight: height,
    style: {
      width: 'auto',
      height: 'auto'
    },
    className: prefix('virt-auto-sizer')
  }, function (_ref3) {
    var height = _ref3.height;
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
CheckTreeView.displayName = 'CheckTreeView';
export default CheckTreeView;