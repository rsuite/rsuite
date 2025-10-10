'use client';
import { useEffect } from 'react';
import isFunction from 'lodash/isFunction';
import { useControlled, useEventCallback } from "../../internals/hooks/index.js";
import { createConcatChildrenFunction } from "../../internals/Picker/index.js";
import { getExpandItemValues, flattenTree } from "../utils/index.js";
export function getDefaultExpandItemValues(data, options) {
  var valueKey = options.valueKey,
    defaultExpandAll = options.defaultExpandAll,
    childrenKey = options.childrenKey,
    _options$defaultExpan = options.defaultExpandItemValues,
    defaultExpandItemValues = _options$defaultExpan === void 0 ? [] : _options$defaultExpan;
  if (defaultExpandAll) {
    return flattenTree(data, function (item) {
      return item[childrenKey] || [];
    }).filter(function (item) {
      return Array.isArray(item[childrenKey]) && item[childrenKey].length > 0;
    }).map(function (item) {
      return item[valueKey];
    });
  }
  return defaultExpandItemValues;
}
/**
 * Custom hook for managing tree expansion state.
 */
function useExpandTree(data, props) {
  var defaultExpandAll = props.defaultExpandAll,
    valueKey = props.valueKey,
    childrenKey = props.childrenKey,
    defaultExpandItemValues = props.defaultExpandItemValues,
    controlledExpandItemValues = props.controlledExpandItemValues,
    onExpand = props.onExpand,
    getChildren = props.getChildren,
    appendChild = props.appendChild;
  var _useControlled = useControlled(controlledExpandItemValues, getDefaultExpandItemValues(data, {
      defaultExpandAll: defaultExpandAll,
      valueKey: valueKey,
      childrenKey: childrenKey,
      defaultExpandItemValues: defaultExpandItemValues
    })),
    expandItemValues = _useControlled[0],
    setExpandItemValues = _useControlled[1];
  useEffect(function () {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);
  var handleExpandTreeNode = useEventCallback(function (node, expanded) {
    var nextExpandItemValues = getExpandItemValues({
      node: node,
      isExpand: !expanded,
      expandItemValues: expandItemValues,
      valueKey: valueKey
    });
    setExpandItemValues(nextExpandItemValues);
    onExpand === null || onExpand === void 0 || onExpand(nextExpandItemValues, node, createConcatChildrenFunction(node, node[valueKey], {
      valueKey: valueKey,
      childrenKey: childrenKey
    }));
    if (isFunction(getChildren) && !node.expand && Array.isArray(node[childrenKey]) && node[childrenKey].length === 0) {
      appendChild(node, getChildren);
    }
  });
  return {
    expandItemValues: expandItemValues,
    handleExpandTreeNode: handleExpandTreeNode
  };
}
export default useExpandTree;