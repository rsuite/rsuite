'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _TreeView = _interopRequireDefault(require("./TreeView"));
var _SearchView = _interopRequireDefault(require("./SearchView"));
var _utils = require("../internals/Tree/utils");
var _utils2 = require("../Tree/utils");
var _hooks = require("../internals/hooks");
var _hooks2 = require("./hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "data", "defaultValue", "className", "classPrefix", "childrenKey", "valueKey", "labelKey", "locale", "value", "disabledItemValues", "columnWidth", "columnHeight", "searchable", "renderTreeNode", "renderColumn", "onSelect", "onSearch", "onChange", "getChildren"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * CascadeTree is a component that displays tree-structured data in columns.
 *
 * @see https://rsuitejs.com/components/cascade-tree
 */
var CascadeTree = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('CascadeTree', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? [] : _propsWithDefaults$da,
    defaultValue = propsWithDefaults.defaultValue,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'cascade-tree' : _propsWithDefaults$cl,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    locale = propsWithDefaults.locale,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? [] : _propsWithDefaults$di,
    columnWidth = propsWithDefaults.columnWidth,
    columnHeight = propsWithDefaults.columnHeight,
    searchable = propsWithDefaults.searchable,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    renderColumn = propsWithDefaults.renderColumn,
    onSelect = propsWithDefaults.onSelect,
    onSearch = propsWithDefaults.onSearch,
    onChange = propsWithDefaults.onChange,
    getChildren = propsWithDefaults.getChildren,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _ref = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _ref[0],
    setValue = _ref[1];

  // Store the children of each node
  var childrenMap = (0, _hooks.useMap)();

  // Store the parent of each node
  var parentMap = (0, _react.useMemo)(function () {
    return (0, _utils.getParentMap)(data, function (item) {
      var _childrenMap$get;
      return (_childrenMap$get = childrenMap.get(item)) !== null && _childrenMap$get !== void 0 ? _childrenMap$get : item[childrenKey];
    });
  }, [childrenMap, childrenKey, data]);

  // Flatten the tree data
  var flattenedData = (0, _react.useMemo)(function () {
    return (0, _utils2.flattenTree)(data, function (item) {
      var _childrenMap$get2;
      return (_childrenMap$get2 = childrenMap.get(item)) !== null && _childrenMap$get2 !== void 0 ? _childrenMap$get2 : item[childrenKey];
    });
  }, [childrenMap, childrenKey, data]);

  // The selected item
  var selectedItem = flattenedData.find(function (item) {
    return item[valueKey] === value;
  });

  // Callback function after selecting the node
  var onSelectCallback = function onSelectCallback(node, event) {
    var isLeafNode = node.isLeafNode,
      cascadePaths = node.cascadePaths,
      itemData = node.itemData;
    onSelect === null || onSelect === void 0 || onSelect(itemData, cascadePaths, event);
    if (isLeafNode) {
      var nextValue = itemData[valueKey];
      setValue(nextValue);
    }
  };
  var _useSelect = (0, _hooks2.useSelect)({
      value: value,
      valueKey: valueKey,
      childrenKey: childrenKey,
      childrenMap: childrenMap,
      selectedItem: selectedItem,
      getChildren: getChildren,
      onChange: onChange,
      onSelect: onSelectCallback
    }),
    activeItem = _useSelect.activeItem,
    loadingItemsSet = _useSelect.loadingItemsSet,
    handleSelect = _useSelect.handleSelect;
  var _usePaths = (0, _hooks2.usePaths)({
      data: data,
      activeItem: activeItem,
      selectedItem: selectedItem,
      getParent: function getParent(item) {
        return parentMap.get(item);
      },
      getChildren: function getChildren(item) {
        var _childrenMap$get3;
        return (_childrenMap$get3 = childrenMap.get(item)) !== null && _childrenMap$get3 !== void 0 ? _childrenMap$get3 : item[childrenKey];
      }
    }),
    columns = _usePaths.columns,
    pathTowardsActiveItem = _usePaths.pathTowardsActiveItem;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var onSearchCallback = (0, _react.useCallback)(function (value, _items, event) {
    return onSearch === null || onSearch === void 0 ? void 0 : onSearch(value, event);
  }, [onSearch]);
  var _useSearch = (0, _hooks2.useSearch)({
      labelKey: labelKey,
      childrenKey: childrenKey,
      parentMap: parentMap,
      flattenedData: flattenedData,
      onSearch: onSearchCallback
    }),
    items = _useSearch.items,
    searchKeyword = _useSearch.searchKeyword,
    setSearchKeyword = _useSearch.setSearchKeyword,
    handleSearch = _useSearch.handleSearch;
  var handleSearchRowSelect = (0, _hooks.useEventCallback)(function (item, items, event) {
    var _item$childrenKey;
    var node = {
      itemData: item,
      cascadePaths: items,
      isLeafNode: !((_item$childrenKey = item[childrenKey]) !== null && _item$childrenKey !== void 0 && _item$childrenKey.length)
    };
    handleSelect(node, event);
    setSearchKeyword('');
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    className: classes
  }, rest, {
    ref: ref
  }), searchable && /*#__PURE__*/_react.default.createElement(_SearchView.default, {
    data: items,
    searchKeyword: searchKeyword,
    valueKey: valueKey,
    labelKey: labelKey,
    locale: locale,
    parentMap: parentMap,
    disabledItemValues: disabledItemValues,
    onSelect: handleSearchRowSelect,
    onSearch: handleSearch
  }), !searchKeyword && /*#__PURE__*/_react.default.createElement(_TreeView.default, {
    columnWidth: columnWidth,
    columnHeight: columnHeight,
    disabledItemValues: disabledItemValues,
    loadingItemsSet: loadingItemsSet,
    valueKey: valueKey,
    labelKey: labelKey,
    childrenKey: childrenKey,
    classPrefix: classPrefix,
    data: columns,
    cascadePaths: pathTowardsActiveItem,
    activeItemValue: value,
    onSelect: handleSelect,
    renderColumn: renderColumn,
    renderTreeNode: renderTreeNode
  }));
});
CascadeTree.displayName = 'CascadeTree';
var _default = exports.default = CascadeTree;