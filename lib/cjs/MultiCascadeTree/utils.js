'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getNodeParents = getNodeParents;
exports.removeAllChildrenValue = exports.isSomeParentChecked = exports.isSomeChildChecked = exports.getOtherItemValuesByUnselectChild = void 0;
var _remove = _interopRequireDefault(require("lodash/remove"));
/**
 * get all ancestor nodes of given node
 * @param {*} node
 */
function getNodeParents(node, parentKey, valueKey) {
  if (parentKey === void 0) {
    parentKey = 'parent';
  }
  var parents = [];
  var _traverse = function traverse(node) {
    if (node !== null && node !== void 0 && node[parentKey]) {
      _traverse(node[parentKey]);
      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };
  _traverse(node);
  return parents;
}

/**
 * Check if any child nodes are selected.
 * @param node
 * @param value
 * @param itemKeys
 */
var _isSomeChildChecked = exports.isSomeChildChecked = function isSomeChildChecked(node, value, itemKeys) {
  var childrenKey = itemKeys.childrenKey,
    valueKey = itemKeys.valueKey;
  if (!node[childrenKey] || !value) {
    return false;
  }
  return node[childrenKey].some(function (child) {
    var _child$childrenKey;
    if (value.some(function (n) {
      return n === child[valueKey];
    })) {
      return true;
    }
    if ((_child$childrenKey = child[childrenKey]) !== null && _child$childrenKey !== void 0 && _child$childrenKey.length) {
      return _isSomeChildChecked(child, value, itemKeys);
    }
    return false;
  });
};

/**
 * Check if the parent is selected.
 * @param node
 * @param value
 * @param itemKeys
 */
var _isSomeParentChecked = exports.isSomeParentChecked = function isSomeParentChecked(node, value, itemKeys) {
  var valueKey = itemKeys.valueKey;
  if (!value) {
    return false;
  }
  if (value.some(function (n) {
    return n === node[valueKey];
  })) {
    return true;
  }
  if (node.parent) {
    return _isSomeParentChecked(node.parent, value, itemKeys);
  }
  return false;
};
var getOtherItemValuesByUnselectChild = exports.getOtherItemValuesByUnselectChild = function getOtherItemValuesByUnselectChild(itemNode, value, itemKeys) {
  var valueKey = itemKeys.valueKey,
    childrenKey = itemKeys.childrenKey;
  var parentValues = [];
  var itemValues = [];

  // Find the parent node of the current node by value
  function findParent(item) {
    parentValues.push(item[valueKey]);
    if (value.some(function (v) {
      return v === item[valueKey];
    })) {
      return item;
    }
    if (item.parent) {
      var p = findParent(item.parent);
      if (p) {
        return p;
      }
    }
    return null;
  }

  // Get child nodes through parent node
  function pushChildValue(item) {
    if (!item[childrenKey]) {
      return;
    }
    item[childrenKey].forEach(function (n) {
      // Determine whether it is a direct parent
      if (parentValues.some(function (v) {
        return v === n[valueKey];
      }) && n[childrenKey]) {
        pushChildValue(n);
      } else if (n[valueKey] !== itemNode[valueKey]) {
        itemValues.push(n[valueKey]);
      }
    });
  }
  var parent = findParent(itemNode);
  if (!parent) {
    return [];
  }
  pushChildValue(parent);
  return itemValues;
};

/**
 * Remove the values of all children.
 */
var _removeAllChildrenValue = exports.removeAllChildrenValue = function removeAllChildrenValue(value, item, itemKeys) {
  var valueKey = itemKeys.valueKey,
    childrenKey = itemKeys.childrenKey;
  var removedValue = [];
  if (!item[childrenKey]) {
    return;
  }
  item[childrenKey].forEach(function (n) {
    removedValue = removedValue.concat((0, _remove.default)(value, function (v) {
      return v === n[valueKey];
    }));
    if (n[childrenKey]) {
      _removeAllChildrenValue(value, n, itemKeys);
    }
  });
  return removedValue;
};