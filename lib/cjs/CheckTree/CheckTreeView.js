'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _CheckTreeNode = _interopRequireDefault(require("./CheckTreeNode"));
var _IndentLine = _interopRequireDefault(require("../Tree/IndentLine"));
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _useTreeSearch2 = _interopRequireDefault(require("../Tree/hooks/useTreeSearch"));
var _useFocusTree2 = _interopRequireDefault(require("../Tree/hooks/useFocusTree"));
var _useVirtualizedTreeData = _interopRequireDefault(require("../Tree/hooks/useVirtualizedTreeData"));
var _useTreeCheckState2 = _interopRequireDefault(require("./hooks/useTreeCheckState"));
var _useTreeNodeProps = _interopRequireDefault(require("./hooks/useTreeNodeProps"));
var _Windowing = require("../internals/Windowing");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/Tree/utils");
var _Picker = require("../internals/Picker");
var _Tree = require("../internals/Tree");
var _utils2 = require("./utils");
var _utils3 = require("../Tree/utils");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "classPrefix", "cascade", "data", "disabledItemValues", "expandItemValues", "height", "locale", "listProps", "listRef", "style", "searchKeyword", "showIndentLine", "searchable", "searchInputRef", "uncheckableItemValues", "loadingNodeValues", "flattenedNodes", "searchBy", "onChange", "onSearch", "onSelect", "onSelectItem", "onScroll", "onExpand", "onFocusItem"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Props for the CheckTreeView component.
 */

var CheckTreeView = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('Combobox', overrideLocale),
    searchPlaceholder = _getLocale.searchPlaceholder,
    noResultsText = _getLocale.noResultsText;
  var _useTreeContextProps = (0, _TreeProvider.useTreeContextProps)(),
    childrenKey = _useTreeContextProps.childrenKey,
    valueKey = _useTreeContextProps.valueKey,
    virtualized = _useTreeContextProps.virtualized,
    scrollShadow = _useTreeContextProps.scrollShadow;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useTreeCheckState = (0, _useTreeCheckState2.default)({
      cascade: cascade,
      flattenedNodes: flattenedNodes,
      uncheckableItemValues: uncheckableItemValues
    }),
    getCheckedValues = _useTreeCheckState.getCheckedValues;
  var handleSearchCallback = function handleSearchCallback(value, _data, event) {
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  };
  var _useTreeSearch = (0, _useTreeSearch2.default)({
      callback: handleSearchCallback,
      data: data,
      searchKeyword: searchKeyword,
      searchBy: searchBy
    }),
    filteredData = _useTreeSearch.filteredData,
    keyword = _useTreeSearch.keyword,
    setFilteredData = _useTreeSearch.setFilteredData,
    handleSearch = _useTreeSearch.handleSearch;
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
    saveTreeNodeRef = _useFocusTree.saveTreeNodeRef;
  var transformation = (0, _useVirtualizedTreeData.default)(flattenedNodes, filteredData, {
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
    return (0, _utils2.getFormattedTree)(flattenedNodes, filteredData, {
      childrenKey: childrenKey,
      cascade: cascade
    }).map(function (node) {
      return render === null || render === void 0 ? void 0 : render(node, 1);
    }).filter(function (item) {
      return item;
    });
  };
  var getTreeNodeProps = (0, _useTreeNodeProps.default)({
    uncheckableItemValues: uncheckableItemValues,
    disabledItemValues: disabledItemValues,
    loadingNodeValues: loadingNodeValues,
    focusItemValue: focusItemValue,
    flattenedNodes: flattenedNodes,
    keyword: keyword
  });
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
  var handleSelect = (0, _hooks.useEventCallback)(function (node, event) {
    var currentNode = node.refKey ? flattenedNodes[node.refKey] : null;
    if (!node || !currentNode) {
      return;
    }
    var checkedValues = getCheckedValues(node, !currentNode.check);
    var path = (0, _utils.getPathTowardsItem)(node, function (item) {
      return itemParentMap.get(item[valueKey]);
    });
    setFocusItemValue(node[valueKey]);
    onChange === null || onChange === void 0 || onChange(checkedValues, event);
    onSelect === null || onSelect === void 0 || onSelect(node, checkedValues, event);
    onSelectItem === null || onSelectItem === void 0 || onSelectItem(node, path);
  });
  var selectActiveItem = function selectActiveItem(event) {
    if ((0, _isNil.default)(focusItemValue)) return;
    var activeItem = (0, _utils3.getActiveItem)(focusItemValue, flattenedNodes, valueKey);
    if (!(0, _utils2.isNodeUncheckable)(activeItem, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    }) && activeItem !== null) {
      handleSelect(activeItem, event);
    }
  };
  var handleTreeKeyDown = (0, _hooks.useEventCallback)(function (event) {
    onTreeKeydown(event);
    (0, _Picker.onMenuKeyDown)(event, {
      enter: selectActiveItem
    });
  });
  var _renderNode = function renderNode(node, layer) {
    var visible = node.visible,
      refKey = node.refKey,
      parent = node.parent;

    // when searching, all nodes should be expand
    var expanded = (0, _utils3.isExpand)(keyword, expandItemValues.includes(node[valueKey]));
    if (!visible) {
      return null;
    }
    var children = node[childrenKey];
    var hasChildren = keyword ? (0, _utils3.hasVisibleChildren)(node, childrenKey) : Boolean(children);
    var treeNodeProps = (0, _extends2.default)({}, getTreeNodeProps((0, _extends2.default)({}, node, {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: childClassName,
        key: node[valueKey]
      }, /*#__PURE__*/_react.default.createElement(_CheckTreeNode.default, (0, _extends2.default)({}, treeNodeProps, {
        treeItemRef: function treeItemRef(ref) {
          return saveTreeNodeRef(ref, refKey);
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: prefix('group'),
        role: "group"
      }, nodes.map(function (child) {
        return _renderNode(child, layer);
      }), showIndentLine && /*#__PURE__*/_react.default.createElement(_IndentLine.default, null)));
    }
    return /*#__PURE__*/_react.default.createElement(_CheckTreeNode.default, (0, _extends2.default)({
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
    var expanded = (0, _utils3.isExpand)(keyword, expandItemValues.includes(node[valueKey]));
    var treeNodeProps = (0, _extends2.default)({}, getTreeNodeProps((0, _extends2.default)({}, node, {
      parent: parent
    })), {
      onSelect: handleSelect,
      onExpand: onExpand,
      expanded: expanded,
      layer: layer,
      hasChildren: hasChildren
    });
    return visible && /*#__PURE__*/_react.default.createElement(_CheckTreeNode.default, (0, _extends2.default)({
      style: style,
      ref: function ref(_ref2) {
        return saveTreeNodeRef(_ref2, refKey);
      }
    }, treeNodeProps));
  };
  var classes = merge(className, withClassPrefix({
    'without-children': !(0, _utils2.hasGrandchild)(data, childrenKey),
    virtualized: virtualized
  }));
  var formattedNodes = getFormattedNodes(_renderNode);
  var treeNodesClass = merge(prefix('root'), (_merge2 = {}, _merge2[prefix('all-uncheckable')] = (0, _utils2.isEveryFirstLevelNodeUncheckable)(flattenedNodes, uncheckableItemValues, valueKey), _merge2));
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
    multiselectable: true,
    treeRootClassName: treeNodesClass,
    className: prefix('view'),
    onScroll: onScroll,
    onKeyDown: handleTreeKeyDown,
    height: height
  }), virtualized ? /*#__PURE__*/_react.default.createElement(_Windowing.AutoSizer, {
    defaultHeight: height,
    style: {
      width: 'auto',
      height: 'auto'
    },
    className: prefix('virt-auto-sizer')
  }, function (_ref3) {
    var height = _ref3.height;
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
CheckTreeView.displayName = 'CheckTreeView';
var _default = exports.default = CheckTreeView;