'use client';
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import { attachParent } from "../../internals/utils/index.js";

/**
 * Strategy for walking the tree.
 */
export var WalkTreeStrategy = /*#__PURE__*/function (WalkTreeStrategy) {
  WalkTreeStrategy[WalkTreeStrategy["DFS"] = 0] = "DFS";
  WalkTreeStrategy[WalkTreeStrategy["BFS"] = 1] = "BFS";
  return WalkTreeStrategy;
}({});

/**
 * Flattens a tree structure into an array.
 */
export function flattenTree(rootNodes, getChildren, walkStrategy) {
  if (walkStrategy === void 0) {
    walkStrategy = WalkTreeStrategy.BFS;
  }
  var result = [];
  if (walkStrategy === WalkTreeStrategy.BFS) {
    walkTreeBfs(rootNodes, getChildren, function (node) {
      return result.push(node);
    });
  } else if (walkStrategy === WalkTreeStrategy.DFS) {
    walkTreeDfs(rootNodes, getChildren, function (node) {
      return result.push(node);
    });
  }
  return result;
}

/**
 * Walks the tree in a breadth-first search (BFS) manner.
 */
export function walkTreeBfs(rootNodes, getChildren, callback) {
  for (var queue = [].concat(rootNodes); queue.length > 0;) {
    var node = queue.shift();
    callback(node);
    var children = getChildren(node);
    if (children) {
      queue.push.apply(queue, children);
    }
  }
}

/**
 * Walks the tree in a depth-first search (DFS) manner.
 */
export function walkTreeDfs(rootNodes, getChildren, callback) {
  for (var _iterator = _createForOfIteratorHelperLoose(rootNodes), _step; !(_step = _iterator()).done;) {
    var node = _step.value;
    callback(node);
    var children = getChildren(node);
    if (children) {
      walkTreeDfs(children, getChildren, callback);
    }
  }
}

/**
 * Flattens a tree structure to an array (deprecated).
 * @deprecated This function is considered unsafe because it mutates the `tree` argument in-place.
 *             Use the `flattenTree` function instead.
 */
export function UNSAFE_flattenTree(tree, childrenKey, executor) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }
  var flattenData = [];
  var _traverse = function traverse(data, parent) {
    if (!Array.isArray(data)) {
      return;
    }
    data.forEach(function (item, index) {
      var node = typeof executor === 'function' ? executor(item, index) : item;
      flattenData.push(attachParent(node, parent));
      if (item[childrenKey]) {
        _traverse(item[childrenKey], item);
      }
    });
  };
  _traverse(tree, null);
  return flattenData;
}