'use client';
"use strict";

exports.__esModule = true;
exports.getNodeParentKeys = getNodeParentKeys;
/**
 * Retrieves an array of parent keys for a given node in a tree.
 */
function getNodeParentKeys(nodes, node, valueKey) {
  var parentKeys = [];
  var _traverse = function traverse(node) {
    var _node$parent;
    if (node !== null && node !== void 0 && (_node$parent = node.parent) !== null && _node$parent !== void 0 && _node$parent.refKey) {
      var _node$parent2;
      _traverse(nodes[node.parent.refKey]);
      parentKeys.push(node === null || node === void 0 || (_node$parent2 = node.parent) === null || _node$parent2 === void 0 ? void 0 : _node$parent2[valueKey]);
    }
  };
  _traverse(node);
  return parentKeys;
}