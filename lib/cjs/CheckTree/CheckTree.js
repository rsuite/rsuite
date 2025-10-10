'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _hooks = require("../internals/hooks");
var _useTreeValue2 = _interopRequireDefault(require("./hooks/useTreeValue"));
var _CheckTreeView = _interopRequireDefault(require("./CheckTreeView"));
var _useFlattenTree = _interopRequireDefault(require("../Tree/hooks/useFlattenTree"));
var _useTreeWithChildren2 = _interopRequireDefault(require("../Tree/hooks/useTreeWithChildren"));
var _useExpandTree2 = _interopRequireDefault(require("../Tree/hooks/useExpandTree"));
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["value", "data", "defaultValue", "defaultExpandAll", "defaultExpandItemValues", "uncheckableItemValues", "expandItemValues", "childrenKey", "labelKey", "valueKey", "virtualized", "cascade", "scrollShadow", "renderTreeIcon", "renderTreeNode", "getChildren", "onExpand", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `CheckTree` component is used for selecting multiple options which are organized in a tree structure.
 * @see https://rsuitejs.com/components/check-tree
 */
var CheckTree = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('CheckTree', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var controlledValue = propsWithDefaults.value,
    data = propsWithDefaults.data,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$de = propsWithDefaults.defaultExpandAll,
    defaultExpandAll = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    _propsWithDefaults$de2 = propsWithDefaults.defaultExpandItemValues,
    defaultExpandItemValues = _propsWithDefaults$de2 === void 0 ? [] : _propsWithDefaults$de2,
    uncheckableItemValues = propsWithDefaults.uncheckableItemValues,
    controlledExpandItemValues = propsWithDefaults.expandItemValues,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    virtualized = propsWithDefaults.virtualized,
    _propsWithDefaults$ca = propsWithDefaults.cascade,
    cascade = _propsWithDefaults$ca === void 0 ? true : _propsWithDefaults$ca,
    scrollShadow = propsWithDefaults.scrollShadow,
    renderTreeIcon = propsWithDefaults.renderTreeIcon,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    getChildren = propsWithDefaults.getChildren,
    onExpand = propsWithDefaults.onExpand,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useTreeValue = (0, _useTreeValue2.default)(controlledValue, {
      defaultValue: defaultValue,
      uncheckableItemValues: uncheckableItemValues
    }),
    value = _useTreeValue[0],
    setValue = _useTreeValue[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = (0, _useTreeWithChildren2.default)(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var _useExpandTree = (0, _useExpandTree2.default)(data, (0, _extends2.default)({}, itemDataKeys, {
      defaultExpandAll: defaultExpandAll,
      defaultExpandItemValues: defaultExpandItemValues,
      controlledExpandItemValues: controlledExpandItemValues,
      onExpand: onExpand,
      getChildren: getChildren,
      appendChild: appendChild
    })),
    expandItemValues = _useExpandTree.expandItemValues,
    handleExpandTreeNode = _useExpandTree.handleExpandTreeNode;
  var flattenedNodes = (0, _useFlattenTree.default)(treeData, (0, _extends2.default)({}, itemDataKeys, {
    uncheckableItemValues: uncheckableItemValues,
    multiple: true,
    cascade: cascade,
    value: value
  }));
  var handleChange = (0, _hooks.useEventCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  var treeContext = (0, _react.useMemo)(function () {
    return {
      props: {
        labelKey: labelKey,
        valueKey: valueKey,
        childrenKey: childrenKey,
        virtualized: virtualized,
        scrollShadow: scrollShadow,
        renderTreeIcon: renderTreeIcon,
        renderTreeNode: renderTreeNode
      }
    };
  }, [childrenKey, labelKey, valueKey, virtualized, scrollShadow, renderTreeIcon, renderTreeNode]);
  return /*#__PURE__*/_react.default.createElement(_TreeProvider.TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/_react.default.createElement(_CheckTreeView.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    value: value,
    cascade: cascade,
    data: treeData,
    loadingNodeValues: loadingNodeValues,
    flattenedNodes: flattenedNodes,
    uncheckableItemValues: uncheckableItemValues,
    expandItemValues: expandItemValues,
    onChange: handleChange,
    onExpand: handleExpandTreeNode
  })));
});
CheckTree.displayName = 'CheckTree';
var _default = exports.default = CheckTree;