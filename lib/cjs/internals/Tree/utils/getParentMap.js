'use client';
"use strict";

exports.__esModule = true;
exports.getKeyParentMap = getKeyParentMap;
exports.getParentMap = getParentMap;
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Returns a WeakMap that maps each item in `items` to its parent
 * indicated by `getChildren` function
 */
function getParentMap(items, getChildren) {
  var map = new WeakMap();
  for (var queue = [].concat(items); queue.length > 0;) {
    var item = queue.shift();
    var children = getChildren(item);
    if (children) {
      for (var _iterator = _createForOfIteratorHelperLoose(children), _step; !(_step = _iterator()).done;) {
        var child = _step.value;
        map.set(child, item);
        queue.push(child);
      }
    }
  }
  return map;
}

/**
 * Returns a Map that maps each item's "key", indicated by `getKey` function,
 * to its parent indicated by `getChildren` function
 *
 * NOTICE:
 * Using this function is discouraged.
 * Use {@link getParentMap} whenever possible.
 */
function getKeyParentMap(items, getKey, getChildren) {
  var map = new Map();
  for (var queue = [].concat(items); queue.length > 0;) {
    var item = queue.shift();
    var children = getChildren(item);
    if (children) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done;) {
        var child = _step2.value;
        map.set(getKey(child), item);
        queue.push(child);
      }
    }
  }
  return map;
}