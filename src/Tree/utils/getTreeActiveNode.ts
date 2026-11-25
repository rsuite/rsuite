import { shallowEqual } from '@/internals/utils';
import type { TreeNodeMap } from '@/internals/Tree/types';

/**
 * Retrieves the active node from a tree based on the provided value and value key.
 */
export function getTreeActiveNode<T extends number | string | undefined | null>(
  nodes: TreeNodeMap,
  value: T,
  valueKey: string
) {
  if (typeof value === 'undefined') {
    return;
  }
  for (const refKey in nodes) {
    const node = nodes[refKey];
    if (shallowEqual(node[valueKey], value)) {
      return node;
    }
  }
}
