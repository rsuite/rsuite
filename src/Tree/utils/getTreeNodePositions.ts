import type { TreeNode } from '@/internals/Tree/types';

// Keep virtual-row metadata separate from application-defined node fields.
export const TREE_NODE_POSITION = Symbol('tree-node-position');

interface TreeNodePosition {
  posInSet: number;
  setSize: number;
}

type PositionedTreeNode = TreeNode & { [TREE_NODE_POSITION]?: TreeNodePosition };

export function getTreeNodePosition(node: TreeNode | undefined): TreeNodePosition | undefined {
  return (node as PositionedTreeNode | undefined)?.[TREE_NODE_POSITION];
}

export function getTreeNodePositions(
  data: readonly TreeNode[],
  childrenKey: string,
  searching: boolean
) {
  const positions = new Map<TreeNode, TreeNodePosition>();

  const visit = (siblings: readonly TreeNode[]) => {
    const visibleSiblings = searching ? siblings.filter(node => node.visible) : siblings;

    visibleSiblings.forEach((node, index) => {
      positions.set(node, { posInSet: index + 1, setSize: visibleSiblings.length });

      const children = node[childrenKey];
      if (Array.isArray(children)) {
        visit(children);
      }
    });
  };

  visit(data);
  return positions;
}
