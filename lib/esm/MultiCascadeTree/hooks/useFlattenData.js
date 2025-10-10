'use client';
import { useState, useCallback, useEffect } from 'react';
import { UNSAFE_flattenTree } from "../../Tree/utils/index.js";
import { attachParent } from "../../internals/utils/index.js";
/**
 * A hook to flatten tree structure data
 */
function useFlattenData(data, itemKeys) {
  var childrenKey = itemKeys.childrenKey;
  var _useState = useState(UNSAFE_flattenTree(data, itemKeys.childrenKey)),
    flattenData = _useState[0],
    setFlattenData = _useState[1];
  var addFlattenData = useCallback(function (children, parent) {
    var nodes = children.map(function (child) {
      return attachParent(child, parent);
    });
    parent[childrenKey] = nodes;
    setFlattenData([].concat(flattenData, nodes));
  }, [childrenKey, flattenData]);
  useEffect(function () {
    setFlattenData(UNSAFE_flattenTree(data, itemKeys.childrenKey));
  }, [data, itemKeys.childrenKey]);
  return {
    addFlattenData: addFlattenData,
    flattenData: flattenData
  };
}
export default useFlattenData;