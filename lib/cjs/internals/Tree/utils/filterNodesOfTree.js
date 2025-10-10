'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.filterNodesOfTree = filterNodesOfTree;
var _clone = _interopRequireDefault(require("lodash/clone"));
function filterNodesOfTree(data, check) {
  var _findNodes = function findNodes(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }
    var nextNodes = [];
    for (var i = 0; i < nodes.length; i += 1) {
      if (Array.isArray(nodes[i].children)) {
        var nextChildren = _findNodes(nodes[i].children);
        if (nextChildren.length) {
          var item = (0, _clone.default)(nodes[i]);
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
  return _findNodes(data);
}