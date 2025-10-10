'use client';
"use strict";

exports.__esModule = true;
exports.getTreeActiveNode = getTreeActiveNode;
var _utils = require("../../internals/utils");
/**
 * Retrieves the active node from a tree based on the provided value and value key.
 */
function getTreeActiveNode(nodes, value, valueKey) {
  if (typeof value === 'undefined') {
    return;
  }
  for (var refKey in nodes) {
    var node = nodes[refKey];
    if ((0, _utils.shallowEqual)(node[valueKey], value)) {
      return node;
    }
  }
}