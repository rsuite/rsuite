'use client';
"use strict";

exports.__esModule = true;
exports.hasVisibleChildren = hasVisibleChildren;
/**
 * Checks if a node has visible children.
 */
function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }
  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}