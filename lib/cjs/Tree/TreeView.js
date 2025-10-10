'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _TreeNode = _interopRequireDefault(require("./TreeNode"));
var _IndentLine = _interopRequireDefault(require("./IndentLine"));
var _useTreeSearch2 = _interopRequireDefault(require("./hooks/useTreeSearch"));
var _useTreeDrag2 = _interopRequireDefault(require("./hooks/useTreeDrag"));
var _useFocusTree2 = _interopRequireDefault(require("./hooks/useFocusTree"));
var _useVirtualizedTreeData = _interopRequireDefault(require("./hooks/useVirtualizedTreeData"));
var _useTreeNodeProps = _interopRequireDefault(require("./hooks/useTreeNodeProps"));
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _Windowing = require("../internals/Windowing");
var _utils = require("../internals/Tree/utils");
var _hooks = require("../internals/hooks");
var _utils2 = require("./utils");
var _Picker = require("../internals/Picker");
var _Tree = require("../internals/Tree");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "data", "style", "showIndentLine", "value", "locale", "height", "className", "searchable", "classPrefix", "searchKeyword", "searchBy", "draggable", "disabledItemValues", "loadingNodeValues", "flattenedNodes", "listProps", "listRef", "searchInputRef", "expandItemValues", "onSearch", "onSelect", "onSelectItem", "onChange", "onDragEnd", "onDragStart", "onDragEnter", "onDragLeave", "onDragOver", "onDrop", "onExpand", "onFocusItem", "onScroll"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Props for the TreeViewInner component.
 */
/**
 * Represents the props for the TreeView component.
 */

var TreeView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('Combobox', overrideLocale),
    searchPlaceholder = _getLocale.searchPlaceholder,
    noResultsText = _getLocale.noResultsText;
  var _useTreeContextProps = (0, _TreeProvider.useTreeContextProps)(),
    valueKey = _useTreeContextProps.valueKey,
    childrenKey = _useTreeContextProps.childrenKey,
    scrollShadow = _useTreeContextProps.scrollShadow,
    virtualized = _useTreeContextProps.virtualized;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var handleSearchCallback = (0, _hooks.useEventCallback)(function (value, _data, event) {
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  });
  var _useTreeSearch = (0, _useTreeSearch2.default)({
      callback: handleSearchCallback,
      searchKeyword: searchKeyword,
      data: data,
      searchBy: searchBy
    }),
    filteredData = _useTreeSearch.filteredData,
    keyword = _useTreeSearch.keyword,
    setFilteredData = _useTreeSearch.setFilteredData,
    handleSearch = _useTreeSearch.handleSearch;
  var transformation = (0, _useVirtualizedTreeData.default)(flattenedNodes, filteredData, {
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
  (0, _react.useEffect)(function () {
    setFilteredData(data, keyword);
  }, [data, keyword, setFilteredData]);

  // TODO-Doma
  // Replace `getKeyParentMap` with `getParentMap`
  var itemParentMap = (0, _react.useMemo)(function () {
    return (0, _utils.getKeyParentMap)(data, function (node) {
      return node[valueKey];
    }, function (node) {
      return node[childrenKey];
    });
  }, [childrenKey, data, valueKey]);
  var _useFocusTree = (0, _useFocusTree2.default)({
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
  var _useTreeDrag = (0, _useTreeDrag2.default)({
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
  var getTreeNodeProps = (0, _useTreeNodeProps.default)({
    value: valueProp,
    disabledItemValues: disabledItemValues,
    loadingNodeValues: loadingNodeValues,
    focusItemValue: focusItemValue,
    keyword: keyword,
    dragNode: dragNode,
    dragOverNodeKey: dragOverNodeKey,
    dropNodePosition: dropNodePosition
  });
  var handleSelect = (0, _hooks.useEventCallback)(function (nodeData, event) {
    if (!nodeData) {
      return;
    }
    var nextValue = nodeData[valueKey];
    var path = (0, _utils.getPathTowardsItem)(nodeData, function (item) {
      return itemParentMap.get(item[valueKey]);
    });
    setFocusItemValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    onSelect === null || onSelect === void 0 || onSelect(nodeData, nextValue, event);
    onSelectItem === null || onSelectItem === void 0 || onSelectItem(nodeData, path);
  });
  var selectActiveItem = (0, _hooks.useEventCallback)(function (event) {
    if ((0, _isNil.default)(focusItemValue)) return;
    var activeItem = (0, _utils2.getActiveItem)(focusItemValue, flattenedNodes, valueKey);
    handleSelect(activeItem, event);
  });
  var handleTreeKeyDown = (0, _hooks.useEventCallback)(function (event) {
    onTreeKeydown(event);
    (0, _Picker.onMenuKeyDown)(event, {
      enter: selectActiveItem
    });
  });
  var _renderNode = function renderNode(node, index, layer) {
    var visible = node.visible;
    if (!visible) {
      return null;
    }
    var children = node[childrenKey];
    var expanded = (0, _utils2.isExpand)(keyword, expandItemValues.includes(node[valueKey]));
    var hasChildren = keyword ? (0, _utils2.hasVisibleChildren)(node, childrenKey) : Boolean(children);
    var nodeProps = (0, _extends2.default)({}, getTreeNodeProps(node, layer, index), dragEvents, {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: childClassName,
        key: node[valueKey]
      }, /*#__PURE__*/_react.default.createElement(_TreeNode.default, (0, _extends2.default)({}, nodeProps, {
        ref: function ref(_ref) {
          return saveTreeNodeRef(_ref, node.refKey);
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: prefix('group'),
        role: "group"
      }, children === null || children === void 0 ? void 0 : children.map(function (child, i) {
        return _renderNode(child, i, layer);
      }), showIndentLine && /*#__PURE__*/_react.default.createElement(_IndentLine.default, null)));
    }
    return /*#__PURE__*/_react.default.createElement(_TreeNode.default, (0, _extends2.default)({
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
    var expanded = (0, _utils2.isExpand)(keyword, expandItemValues.includes(node[valueKey]));
    if (!visible) {
      return null;
    }
    var treeNodeProps = (0, _extends2.default)({}, getTreeNodeProps(node, layer), dragEvents, {
      expanded: expanded,
      style: style,
      onExpand: onExpand,
      onSelect: handleSelect,
      hasChildren: hasChildren
    });
    return visible && /*#__PURE__*/_react.default.createElement(_TreeNode.default, (0, _extends2.default)({
      ref: function ref(_ref4) {
        return saveTreeNodeRef(_ref4, node.refKey);
      }
    }, treeNodeProps));
  };
  var classes = merge(withClassPrefix({
    virtualized: virtualized
  }), className);
  var formattedNodes = getFormattedNodes(_renderNode);
  return /*#__PURE__*/_react.default.createElement(Component, {
    ref: ref,
    className: classes,
    style: style
  }, searchable ? /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
    placeholder: searchPlaceholder,
    onChange: handleSearch,
    value: keyword,
    inputRef: searchInputRef
  }) : null, keyword && formattedNodes.length === 0 ? /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('empty')
  }, noResultsText) : null, /*#__PURE__*/_react.default.createElement(_Tree.TreeView, (0, _extends2.default)({}, rest, {
    ref: treeViewRef,
    treeRootClassName: prefix('root'),
    onScroll: onScroll,
    onKeyDown: handleTreeKeyDown,
    className: prefix('view'),
    height: height
  }), virtualized ? /*#__PURE__*/_react.default.createElement(_Windowing.AutoSizer, {
    defaultHeight: height,
    style: {
      width: 'auto',
      height: 'auto'
    },
    className: prefix('virt-auto-sizer')
  }, function (_ref5) {
    var height = _ref5.height;
    return /*#__PURE__*/_react.default.createElement(_Windowing.List, (0, _extends2.default)({
      ref: listRef,
      height: height,
      itemSize: _Windowing.defaultItemSize,
      itemCount: formattedNodes.length,
      itemData: formattedNodes,
      className: prefix('virt-list'),
      scrollShadow: scrollShadow
    }, listProps), renderVirtualListNode);
  }) : formattedNodes));
});
TreeView.displayName = 'TreeView';
var _default = exports.default = TreeView;