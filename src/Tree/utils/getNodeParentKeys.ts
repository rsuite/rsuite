import type { TreeNode, TreeNodeMap } from '@/internals/Tree/types';

/**
 * Retrieves an array of parent keys for a given node in a tree.
 */
export function getNodeParentKeys<T>(nodes: TreeNodeMap, node: TreeNode, valueKey: string) {
  const parentKeys: T[] = [];
  const traverse = (node: TreeNode) => {
    if (node?.parent?.refKey) {
      traverse(nodes[node.parent.refKey]);
      parentKeys.push(node?.parent?.[valueKey]);
    }
  };

  traverse(node);
  return parentKeys;
}
