import type { TreeNode } from '@/internals/Tree/types';
/**
 * Checks if a node has visible children.
 */
export function hasVisibleChildren(node: TreeNode, childrenKey: string) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some((child: TreeNode) => child.visible);
}
