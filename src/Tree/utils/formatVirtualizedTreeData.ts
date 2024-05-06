import isUndefined from 'lodash/isUndefined';
import { shouldShowNodeByParentExpanded } from './shouldShowNodeByParentExpanded';
import { getNodeParentKeys } from './getNodeParentKeys';
import { isSearching } from './isSearching';
import { UNSAFE_flattenTree } from './flattenTree';
import { getNodeCheckState } from '../../CheckTree/utils';
import type { TreeNode, TreeNodeMap } from '../types';

/**
 * Formats the virtualized tree data.
 */
export const formatVirtualizedTreeData = (
  nodes: TreeNodeMap,
  data: any[],
  expandItemValues: unknown[],
  options: {
    cascade?: boolean;
    searchKeyword?: string;
    childrenKey?: string;
    valueKey?: string;
  }
): TreeNode[] => {
  const { cascade, searchKeyword, childrenKey = 'children', valueKey = 'value' } = options;
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
};
