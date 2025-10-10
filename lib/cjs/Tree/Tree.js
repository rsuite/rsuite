'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _useFlattenTree = _interopRequireDefault(require("./hooks/useFlattenTree"));
var _useTreeWithChildren2 = _interopRequireDefault(require("./hooks/useTreeWithChildren"));
var _useExpandTree2 = _interopRequireDefault(require("./hooks/useExpandTree"));
var _TreeView = _interopRequireDefault(require("./TreeView"));
var _hooks = require("../internals/hooks");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["value", "defaultValue", "childrenKey", "labelKey", "valueKey", "data", "defaultExpandAll", "defaultExpandItemValues", "expandItemValues", "virtualized", "scrollShadow", "renderTreeIcon", "renderTreeNode", "getChildren", "onChange", "onExpand"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Tree` component is used to display hierarchical data.
 *
 * @see https://rsuitejs.com/components/tree
 */
var Tree = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Tree', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var controlledValue = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    data = propsWithDefaults.data,
    _propsWithDefaults$de = propsWithDefaults.defaultExpandAll,
    defaultExpandAll = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    _propsWithDefaults$de2 = propsWithDefaults.defaultExpandItemValues,
    defaultExpandItemValues = _propsWithDefaults$de2 === void 0 ? [] : _propsWithDefaults$de2,
    controlledExpandItemValues = propsWithDefaults.expandItemValues,
    virtualized = propsWithDefaults.virtualized,
    scrollShadow = propsWithDefaults.scrollShadow,
    renderTreeIcon = propsWithDefaults.renderTreeIcon,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    getChildren = propsWithDefaults.getChildren,
    onChange = propsWithDefaults.onChange,
    onExpand = propsWithDefaults.onExpand,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useControlled = (0, _hooks.useControlled)(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = (0, _useTreeWithChildren2.default)(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var flattenedNodes = (0, _useFlattenTree.default)(treeData, (0, _extends2.default)({}, itemDataKeys));
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
  var handleChange = (0, _hooks.useEventCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  var treeContext = (0, _react.useMemo)(function () {
    return {
      props: {
        childrenKey: childrenKey,
        labelKey: labelKey,
        valueKey: valueKey,
        virtualized: virtualized,
        scrollShadow: scrollShadow,
        renderTreeIcon: renderTreeIcon,
        renderTreeNode: renderTreeNode
      }
    };
  }, [childrenKey, labelKey, valueKey, scrollShadow, virtualized, renderTreeIcon, renderTreeNode]);
  return /*#__PURE__*/_react.default.createElement(_TreeProvider.TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/_react.default.createElement(_TreeView.default, (0, _extends2.default)({
    ref: ref
  }, rest, {
    value: value,
    data: treeData,
    loadingNodeValues: loadingNodeValues,
    flattenedNodes: flattenedNodes,
    expandItemValues: expandItemValues,
    onChange: handleChange,
    onExpand: handleExpandTreeNode
  })));
});
Tree.displayName = 'Tree';
var _default = exports.default = Tree;