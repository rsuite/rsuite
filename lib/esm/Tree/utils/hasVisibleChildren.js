'use client';
/**
 * Checks if a node has visible children.
 */
export function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }
  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}