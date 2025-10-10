'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getCheckTreeDefaultValue = getCheckTreeDefaultValue;
exports.getDisabledState = getDisabledState;
exports.getFormattedTree = getFormattedTree;
exports.getNodeCheckState = getNodeCheckState;
exports.getSelectedItems = getSelectedItems;
exports.hasGrandchild = hasGrandchild;
exports.isAllSiblingNodeUncheckable = isAllSiblingNodeUncheckable;
exports.isEveryChildChecked = isEveryChildChecked;
exports.isEveryFirstLevelNodeUncheckable = isEveryFirstLevelNodeUncheckable;
exports.isNodeUncheckable = isNodeUncheckable;
exports.isSomeChildChecked = isSomeChildChecked;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _constants = require("../internals/constants");
var _utils = require("../internals/utils");
var _utils2 = require("../Tree/utils");
/**
 * Retrieves the children of a given parent node from a flattened node map.
 */
function getChildrenByFlattenNodes(nodes, parent) {
  if (!(0, _isNil2.default)(parent.refKey) && (0, _isNil2.default)(nodes[parent.refKey])) {
    return [];
  }
  return Object.values(nodes).filter(function (item) {
    var _item$parent;
    return (item === null || item === void 0 || (_item$parent = item.parent) === null || _item$parent === void 0 ? void 0 : _item$parent.refKey) === parent.refKey && item.refKey && !nodes[item.refKey].uncheckable;
  });
}

/**
 * Checks if every child of a given parent node is checked.
 */
function isEveryChildChecked(parent, options) {
  var nodes = options.nodes,
    childrenKey = options.childrenKey;
  if ((0, _isNil2.default)(parent.refKey) || (0, _isNil2.default)(nodes[parent.refKey])) {
    return false;
  }
  var children = getChildrenByFlattenNodes(nodes, parent);
  if (!children.length) {
    var _nodes$parent$refKey$;
    return (_nodes$parent$refKey$ = nodes[parent.refKey].check) !== null && _nodes$parent$refKey$ !== void 0 ? _nodes$parent$refKey$ : false;
  }
  return children.every(function (child) {
    var _child$childrenKey;
    if ((child === null || child === void 0 || (_child$childrenKey = child[childrenKey]) === null || _child$childrenKey === void 0 ? void 0 : _child$childrenKey.length) > 0) {
      // fix: #3559
      return isEveryChildChecked(child, {
        nodes: nodes,
        childrenKey: childrenKey
      });
    }
    return !(0, _isNil2.default)(child.refKey) && nodes[child.refKey].check;
  });
}

/**
 * Checks if any child node is checked.
 */
function isSomeChildChecked(nodes, parent, childrenKey) {
  if (!(0, _isNil2.default)(parent.refKey) && (0, _isNil2.default)(nodes[parent.refKey])) {
    return false;
  }
  var children = getChildrenByFlattenNodes(nodes, parent);
  return children.some(function (child) {
    var _child$childrenKey2;
    if ((child === null || child === void 0 || (_child$childrenKey2 = child[childrenKey]) === null || _child$childrenKey2 === void 0 ? void 0 : _child$childrenKey2.length) > 0) {
      return isSomeChildChecked(nodes, child, childrenKey);
    }
    return !(0, _isNil2.default)(child.refKey) && nodes[child.refKey].check;
  });
}

/**
 * Checks if any node in the data has a grandchild.
 */
function hasGrandchild(data, childrenKey) {
  return data.some(function (node) {
    return Array.isArray(node[childrenKey]);
  });
}

/**
 * Checks if all sibling nodes of a given node are uncheckable.
 */
function isAllSiblingNodeUncheckable(node, nodes, uncheckableItemValues, valueKey) {
  var list = [];
  var parentNodeRefKey = node.parent ? node.parent.refKey : '';
  Object.keys(nodes).forEach(function (refKey) {
    var _curNode$parent;
    var curNode = nodes[refKey];
    if ((0, _isNil2.default)(node.parent) && (0, _isNil2.default)(curNode.parent)) {
      list.push(curNode);
    } else if (((_curNode$parent = curNode.parent) === null || _curNode$parent === void 0 ? void 0 : _curNode$parent.refKey) === parentNodeRefKey) {
      list.push(curNode);
    }
  });
  return list.every(function (node) {
    return isNodeUncheckable(node, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    });
  });
}

/**
 * Checks if every first-level node is uncheckable based on the provided criteria.
 */
function isEveryFirstLevelNodeUncheckable(nodes, uncheckableItemValues, valueKey) {
  var list = [];
  Object.keys(nodes).forEach(function (refKey) {
    var curNode = nodes[refKey];
    if (!curNode.parent) {
      list.push(curNode);
    }
  });
  return list.every(function (node) {
    return isNodeUncheckable(node, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    });
  });
}

/**
 * Checks if a node is uncheckable.
 */
function isNodeUncheckable(node, props) {
  var _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? [] : _props$uncheckableIte,
    valueKey = props.valueKey;
  return uncheckableItemValues.some(function (value) {
    return node[valueKey] === value;
  });
}
function getFormattedTree(nodes, data, props) {
  var childrenKey = props.childrenKey,
    cascade = props.cascade;
  return data.map(function (node) {
    var formatted = (0, _extends2.default)({}, node);
    var curNode = nodes[node.refKey];
    if (curNode) {
      var _node$childrenKey;
      var checkState = !(0, _isUndefined2.default)(cascade) ? getNodeCheckState(curNode, {
        cascade: cascade,
        nodes: nodes,
        childrenKey: childrenKey
      }) : undefined;
      formatted.check = curNode.check;
      formatted.uncheckable = curNode.uncheckable;
      (0, _utils.attachParent)(formatted, curNode.parent);
      formatted.checkState = checkState;
      if (((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) > 0) {
        formatted[childrenKey] = getFormattedTree(nodes, formatted[childrenKey], props);
      }
    }
    return formatted;
  });
}

/**
 * Determines the disabled state of a tree node.
 */
function getDisabledState(nodes, node, props) {
  var _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    valueKey = props.valueKey;
  if (!(0, _isNil2.default)(node.refKey) && (0, _isNil2.default)(nodes[node.refKey])) {
    return false;
  }
  return disabledItemValues.some(function (value) {
    return node.refKey && nodes[node.refKey][valueKey] === value;
  });
}

/**
 * Returns the default value for the check tree.
 */
function getCheckTreeDefaultValue(value, uncheckableItemValues) {
  if (Array.isArray(value) && Array.isArray(uncheckableItemValues)) {
    return value.filter(function (v) {
      return !uncheckableItemValues.includes(v);
    });
  }
  return value;
}

/**
 * Retrieves the selected items from the given nodes.
 */
function getSelectedItems(nodes, values) {
  var checkedItems = [];
  values.forEach(function (value) {
    var refKey = (0, _utils2.formatNodeRefKey)(value);
    var node = nodes[refKey];
    if (!(0, _isNil2.default)(node)) {
      checkedItems.push(node);
    }
  });
  return checkedItems;
}
/**
 * Calculates the check state of a node in a check tree.
 */
function getNodeCheckState(node, options) {
  var nodes = options.nodes,
    cascade = options.cascade,
    childrenKey = options.childrenKey;
  if (node.refKey === undefined) {
    return _constants.CHECK_STATE.UNCHECK;
  }
  if ((0, _isNil2.default)(nodes[node.refKey])) {
    return _constants.CHECK_STATE.UNCHECK;
  }
  if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
    nodes[node.refKey].checkAll = false;
    return node.check ? _constants.CHECK_STATE.CHECK : _constants.CHECK_STATE.UNCHECK;
  }
  if (isEveryChildChecked(node, {
    nodes: nodes,
    childrenKey: childrenKey
  })) {
    nodes[node.refKey].checkAll = true;
    nodes[node.refKey].check = true;
    return _constants.CHECK_STATE.CHECK;
  }
  if (isSomeChildChecked(nodes, node, childrenKey)) {
    nodes[node.refKey].checkAll = false;
    return _constants.CHECK_STATE.INDETERMINATE;
  }
  return _constants.CHECK_STATE.UNCHECK;
}