/**
 * Checks if a node is a leaf node.
 * @param node  The node to check.
 * @param childrenKey The key of the children property.
 */
export function isLeafNode<T extends Record<string, unknown>>(node: T, childrenKey = 'children') {
  if (!node) {
    return true;
  }

  const children = node[childrenKey] as unknown[];
  return !children || !Array.isArray(children) || children.length === 0;
}
