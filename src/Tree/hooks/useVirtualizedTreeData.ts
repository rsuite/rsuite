import { useCallback } from 'react';
import intersection from 'lodash/intersection';
import isUndefined from 'lodash/isUndefined';
import { getNodeParentKeys } from '../utils/getNodeParentKeys';
import { isSearching } from '../utils/isSearching';
import { UNSAFE_flattenTree } from '../utils/flattenTree';
import { getNodeCheckState } from '../../CheckTree/utils';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';
import type { TreeNode, TreeNodeMap } from '@/internals/Tree/types';

/**
 * Determines whether a node should be shown based on the expanded state of its parent nodes.
 */
function shouldShowNodeByParentExpanded<T>(expandItemValues: T[] = [], parentKeys: T[] = []) {
  const intersectionKeys = intersection(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}

function useVirtualizedTreeData(
  nodes: TreeNodeMap,
  data: TreeNode[],
  options: {
    expandItemValues: (string | number)[];
    cascade?: boolean;
    searchKeyword?: string;
  }
) {
  const { childrenKey, valueKey } = useItemDataKeys();

  /**
   * Formats the virtualized tree data.
   */
  return useCallback((): TreeNode[] => {
    const { cascade, searchKeyword, expandItemValues } = options;

    return UNSAFE_flattenTree(data, childrenKey, (node: any) => {
      let formatted = {};
      const curNode = nodes?.[node.refKey];
      const parentKeys = getNodeParentKeys(nodes, curNode, valueKey);
      /**
       * When using virtualized,
       * if the parent node is collapsed, the child nodes should be hidden
       * avoid component height calculation errors
       */
      let visible = curNode?.parent
        ? shouldShowNodeByParentExpanded(expandItemValues, parentKeys)
        : true;

      /**
       * when searching, every node default expand
       * the node's visible should follow the original state
       */
      if (isSearching(searchKeyword)) {
        visible = node.visible;
      }
      if (curNode) {
        const checkState = !isUndefined(cascade)
          ? getNodeCheckState(curNode, { cascade, nodes, childrenKey })
          : undefined;
        formatted = {
          ...node,
          check: curNode.check,
          uncheckable: curNode.uncheckable,
          hasChildren: !!node[childrenKey],
          layer: curNode.layer,
          parent: curNode.parent,
          checkState,
          visible
        };
      }
      return formatted;
    });
  }, [childrenKey, data, nodes, options, valueKey]);
}

export default useVirtualizedTreeData;
