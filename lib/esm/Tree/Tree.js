'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["value", "defaultValue", "childrenKey", "labelKey", "valueKey", "data", "defaultExpandAll", "defaultExpandItemValues", "expandItemValues", "virtualized", "scrollShadow", "renderTreeIcon", "renderTreeNode", "getChildren", "onChange", "onExpand"];
import React, { useMemo } from 'react';
import useFlattenTree from "./hooks/useFlattenTree.js";
import useTreeWithChildren from "./hooks/useTreeWithChildren.js";
import useExpandTree from "./hooks/useExpandTree.js";
import TreeView from "./TreeView.js";
import { useControlled, useEventCallback } from "../internals/hooks/index.js";
import { TreeProvider } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Tree` component is used to display hierarchical data.
 *
 * @see https://rsuitejs.com/components/tree
 */
var Tree = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Tree', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useControlled = useControlled(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = useTreeWithChildren(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var flattenedNodes = useFlattenTree(treeData, _extends({}, itemDataKeys));
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
  var handleChange = useEventCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  });
  var treeContext = useMemo(function () {
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
  return /*#__PURE__*/React.createElement(TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/React.createElement(TreeView, _extends({
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
export default Tree;