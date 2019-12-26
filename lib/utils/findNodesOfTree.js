"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = findNodesOfTree;

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function findNodesOfTree(data, check) {
  var nextNodes = [];

  var findNodes = function findNodes(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }

    for (var i = 0; i < nodes.length; i += 1) {
      if ((0, _isArray2.default)(nodes[i].children)) {
        findNodes(nodes[i].children);
      }

      if (check(nodes[i])) {
        nextNodes.push(nodes[i]);
      }
    }
  };

  findNodes(data);
  return nextNodes;
}

module.exports = exports.default;