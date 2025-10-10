'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { useCallback } from 'react';
import intersection from 'lodash/intersection';
import isUndefined from 'lodash/isUndefined';
import { getNodeParentKeys } from "../utils/getNodeParentKeys.js";
import { isSearching } from "../utils/isSearching.js";
import { UNSAFE_flattenTree } from "../utils/flattenTree.js";
import { getNodeCheckState } from "../../CheckTree/utils.js";
import { useItemDataKeys } from "../../internals/Tree/TreeProvider.js";
/**
 * Determines whether a node should be shown based on the expanded state of its parent nodes.
 */
function shouldShowNodeByParentExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }
  if (parentKeys === void 0) {
    parentKeys = [];
  }
  var intersectionKeys = intersection(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}
function useVirtualizedTreeData(nodes, data, options) {
  var _useItemDataKeys = useItemDataKeys(),
    childrenKey = _useItemDataKeys.childrenKey,
    valueKey = _useItemDataKeys.valueKey;

  /**
   * Formats the virtualized tree data.
   */
  return useCallback(function () {
    var cascade = options.cascade,
      searchKeyword = options.searchKeyword,
      expandItemValues = options.expandItemValues;
    return UNSAFE_flattenTree(data, childrenKey, function (node) {
      var formatted = {};
      var curNode = nodes === null || nodes === void 0 ? void 0 : nodes[node.refKey];
      var parentKeys = getNodeParentKeys(nodes, curNode, valueKey);
      /**
       * When using virtualized,
       * if the parent node is collapsed, the child nodes should be hidden
       * avoid component height calculation errors
       */
      var visible = curNode !== null && curNode !== void 0 && curNode.parent ? shouldShowNodeByParentExpanded(expandItemValues, parentKeys) : true;

      /**
       * when searching, every node default expand
       * the node's visible should follow the original state
       */
      if (isSearching(searchKeyword)) {
        visible = node.visible;
      }
      if (curNode) {
        var checkState = !isUndefined(cascade) ? getNodeCheckState(curNode, {
          cascade: cascade,
          nodes: nodes,
          childrenKey: childrenKey
        }) : undefined;
        formatted = _extends({}, node, {
          check: curNode.check,
          uncheckable: curNode.uncheckable,
          hasChildren: !!node[childrenKey],
          layer: curNode.layer,
          parent: curNode.parent,
          checkState: checkState,
          visible: visible
        });
      }
      return formatted;
    });
  }, [childrenKey, data, nodes, options, valueKey]);
}
export default useVirtualizedTreeData;