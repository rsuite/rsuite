import type { TreeNode } from '../types';
export function findNodeOfTree(data, check) {
  const findNode = (nodes: readonly TreeNode[] = []) => {
    for (let i = 0; i < nodes.length; i += 1) {
      const item = nodes[i];
      if (Array.isArray(item.children)) {
        const node = findNode(item.children);
        if (node) {
          return node;
        }
      }

      if (check(item)) {
        return item;
      }
    }

    return undefined;
  };

  return findNode(data);
}
