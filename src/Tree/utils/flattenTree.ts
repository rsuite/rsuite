import { attachParent } from '@/internals/utils';

/**
 * Strategy for walking the tree.
 */
export enum WalkTreeStrategy {
  DFS, // Depth-first search
  BFS // Breadth-first search
}

/**
 * Flattens a tree structure into an array.
 */
export function flattenTree<T>(
  rootNodes: readonly T[],
  getChildren: (node: T) => readonly T[] | undefined,
  walkStrategy = WalkTreeStrategy.BFS
): T[] {
  const result: T[] = [];

  if (walkStrategy === WalkTreeStrategy.BFS) {
    walkTreeBfs(rootNodes, getChildren, node => result.push(node));
  } else if (walkStrategy === WalkTreeStrategy.DFS) {
    walkTreeDfs(rootNodes, getChildren, node => result.push(node));
  }

  return result;
}

/**
 * Walks the tree in a breadth-first search (BFS) manner.
 */
export function walkTreeBfs<T>(
  rootNodes: readonly T[],
  getChildren: (node: T) => readonly T[] | undefined,
  callback: (node: T) => void
): void {
  for (const queue = [...rootNodes]; queue.length > 0; ) {
    const node = queue.shift() as T;
    callback(node);

    const children = getChildren(node);

    if (children) {
      queue.push(...children);
    }
  }
}

/**
 * Walks the tree in a depth-first search (DFS) manner.
 */
export function walkTreeDfs<T>(
  rootNodes: readonly T[],
  getChildren: (node: T) => readonly T[] | undefined,
  callback: (node: T) => void
): void {
  for (const node of rootNodes) {
    callback(node);
    const children = getChildren(node);

    if (children) {
      walkTreeDfs(children, getChildren, callback);
    }
  }
}

/**
 * Flattens a tree structure to an array (deprecated).
 * @deprecated This function is considered unsafe because it mutates the `tree` argument in-place.
 *             Use the `flattenTree` function instead.
 */
export function UNSAFE_flattenTree<TItem>(
  tree: TItem[],
  childrenKey = 'children',
  executor?: (node: any, index: number) => any
): TItem[] {
  const flattenData: TItem[] = [];
  const traverse = (data: any[], parent: any | null) => {
    if (!Array.isArray(data)) {
      return;
    }

    data.forEach((item: any, index: number) => {
      const node: any = typeof executor === 'function' ? executor(item, index) : item;

      flattenData.push(attachParent(node, parent));

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
}
