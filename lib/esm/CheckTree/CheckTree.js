'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["value", "data", "defaultValue", "defaultExpandAll", "defaultExpandItemValues", "uncheckableItemValues", "expandItemValues", "childrenKey", "labelKey", "valueKey", "virtualized", "cascade", "scrollShadow", "renderTreeIcon", "renderTreeNode", "getChildren", "onExpand", "onChange"];
import React, { useMemo } from 'react';
import { useEventCallback } from "../internals/hooks/index.js";
import useTreeValue from "./hooks/useTreeValue.js";
import CheckTreeView from "./CheckTreeView.js";
import useFlattenTree from "../Tree/hooks/useFlattenTree.js";
import useTreeWithChildren from "../Tree/hooks/useTreeWithChildren.js";
import useExpandTree from "../Tree/hooks/useExpandTree.js";
import { TreeProvider } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `CheckTree` component is used for selecting multiple options which are organized in a tree structure.
 * @see https://rsuitejs.com/components/check-tree
 */
var CheckTree = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('CheckTree', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useTreeValue = useTreeValue(controlledValue, {
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
  var _useTreeWithChildren = useTreeWithChildren(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var _useExpandTree = useExpandTree(data, _extends({}, itemDataKeys, {
      defaultExpandAll: defaultExpandAll,
      defaultExpandItemValues: defaultExpandItemValues,
      controlledExpandItemValues: controlledExpandItemValues,
      onExpand: onExpand,
      getChildren: getChildren,
      appendChild: appendChild
    })),
    expandItemValues = _useExpandTree.expandItemValues,
    handleExpandTreeNode = _useExpandTree.handleExpandTreeNode;
  var flattenedNodes = useFlattenTree(treeData, _extends({}, itemDataKeys, {
    uncheckableItemValues: uncheckableItemValues,
    multiple: true,
    cascade: cascade,
    value: value
  }));
  var handleChange = useEventCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  var treeContext = useMemo(function () {
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
  return /*#__PURE__*/React.createElement(TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/React.createElement(CheckTreeView, _extends({}, rest, {
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
export default CheckTree;