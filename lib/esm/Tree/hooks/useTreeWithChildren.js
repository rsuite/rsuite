'use client';
import { useState, useCallback, useEffect } from 'react';
import { shallowEqual } from "../../internals/utils/index.js";
import { findNodeOfTree } from "../../internals/Tree/utils/index.js";
/**
 * Custom hook that provides functionality for managing a tree structure with children.
 */
export default function useTreeWithChildren(data, options) {
  var valueKey = options.valueKey,
    childrenKey = options.childrenKey;
  var _useState = useState([]),
    loadingNodeValues = _useState[0],
    setLoadingNodeValues = _useState[1];
  var _useState2 = useState(data),
    treeData = _useState2[0],
    setTreeData = _useState2[1];
  useEffect(function () {
    setTreeData(data);
  }, [data]);
  var concatChildren = useCallback(function (treeNode, children) {
    var value = treeNode[valueKey];
    treeNode = findNodeOfTree(data, function (item) {
      return value === item[valueKey];
    });
    treeNode[childrenKey] = children;
    var newData = data.concat([]);
    setTreeData(newData);
    return newData;
  }, [data, valueKey, childrenKey]);
  var appendChild = useCallback(function (node, getChildren) {
    setLoadingNodeValues(function (prev) {
      return prev.concat(node[valueKey]);
    });
    var children = getChildren(node);
    if (children instanceof Promise) {
      children.then(function (res) {
        var newData = concatChildren(node, res);
        setTreeData(newData);
        setLoadingNodeValues(function (prev) {
          return prev.filter(function (item) {
            return !shallowEqual(item, node[valueKey]);
          });
        });
      });
    } else {
      setTreeData(concatChildren(node, children));
      setLoadingNodeValues(function (prev) {
        return prev.filter(function (item) {
          return !shallowEqual(item, node[valueKey]);
        });
      });
    }
  }, [concatChildren, valueKey]);
  return {
    treeData: treeData,
    loadingNodeValues: loadingNodeValues,
    appendChild: appendChild
  };
}