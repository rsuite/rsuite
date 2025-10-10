'use client';
export function findNodeOfTree(data, check) {
  var _findNode = function findNode(nodes) {
    if (nodes === void 0) {
      nodes = [];
    }
    for (var i = 0; i < nodes.length; i += 1) {
      var item = nodes[i];
      if (Array.isArray(item.children)) {
        var node = _findNode(item.children);
        if (node) {
          return node;
        }
      }
      if (check(item)) {
        return item;
      }
    }
    return undefined;
  };
  return _findNode(data);
}