import clone from 'lodash/clone';

type HasChildren<T extends Record<string, unknown>> = T & {
  children?: readonly HasChildren<T>[];
};
export function filterNodesOfTree<TItem extends HasChildren<Record<string, unknown>>>(
  data: readonly TItem[],
  check: (item: TItem) => boolean
): TItem[] {
  const findNodes = (nodes: readonly TItem[] = []) => {
    const nextNodes: TItem[] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      if (Array.isArray(nodes[i].children)) {
        const nextChildren = findNodes(nodes[i].children as TItem[]);
        if (nextChildren.length) {
          const item = clone(nodes[i]);
          item.children = nextChildren;
          nextNodes.push(item);
          continue;
        }
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }

    return nextNodes;
  };

  return findNodes(data);
}
