import type { TreeNode } from '../types';
export function findNodeOfTree(data, check, childrenKey = 'children') {
  const findNode = (nodes: readonly TreeNode[] = []) => {
    for (let i = 0; i < nodes.length; i += 1) {
      const item = nodes[i];
      const children = item[childrenKey];
      if (Array.isArray(children)) {
        const node = findNode(children);
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
