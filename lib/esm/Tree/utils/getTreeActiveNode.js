'use client';
import { shallowEqual } from "../../internals/utils/index.js";
/**
 * Retrieves the active node from a tree based on the provided value and value key.
 */
export function getTreeActiveNode(nodes, value, valueKey) {
  if (typeof value === 'undefined') {
    return;
  }
  for (var refKey in nodes) {
    var node = nodes[refKey];
    if (shallowEqual(node[valueKey], value)) {
      return node;
    }
  }
}