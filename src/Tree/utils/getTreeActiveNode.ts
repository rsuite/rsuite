import shallowEqual from '../../utils/shallowEqual';
import { TreeNodeMap } from '../types';

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
    if (shallowEqual(nodes[refKey][valueKey], value)) {
      return nodes[refKey];
    }
  }
}
