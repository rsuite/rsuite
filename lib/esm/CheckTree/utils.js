'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _isUndefined from "lodash/isUndefined";
import _isNil from "lodash/isNil";
import { CHECK_STATE } from "../internals/constants/index.js";
import { attachParent } from "../internals/utils/index.js";
import { formatNodeRefKey } from "../Tree/utils/index.js";

/**
 * Retrieves the children of a given parent node from a flattened node map.
 */
function getChildrenByFlattenNodes(nodes, parent) {
  if (!_isNil(parent.refKey) && _isNil(nodes[parent.refKey])) {
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
export function isEveryChildChecked(parent, options) {
  var nodes = options.nodes,
    childrenKey = options.childrenKey;
  if (_isNil(parent.refKey) || _isNil(nodes[parent.refKey])) {
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
    return !_isNil(child.refKey) && nodes[child.refKey].check;
  });
}

/**
 * Checks if any child node is checked.
 */
export function isSomeChildChecked(nodes, parent, childrenKey) {
  if (!_isNil(parent.refKey) && _isNil(nodes[parent.refKey])) {
    return false;
  }
  var children = getChildrenByFlattenNodes(nodes, parent);
  return children.some(function (child) {
    var _child$childrenKey2;
    if ((child === null || child === void 0 || (_child$childrenKey2 = child[childrenKey]) === null || _child$childrenKey2 === void 0 ? void 0 : _child$childrenKey2.length) > 0) {
      return isSomeChildChecked(nodes, child, childrenKey);
    }
    return !_isNil(child.refKey) && nodes[child.refKey].check;
  });
}

/**
 * Checks if any node in the data has a grandchild.
 */
export function hasGrandchild(data, childrenKey) {
  return data.some(function (node) {
    return Array.isArray(node[childrenKey]);
  });
}

/**
 * Checks if all sibling nodes of a given node are uncheckable.
 */
export function isAllSiblingNodeUncheckable(node, nodes, uncheckableItemValues, valueKey) {
  var list = [];
  var parentNodeRefKey = node.parent ? node.parent.refKey : '';
  Object.keys(nodes).forEach(function (refKey) {
    var _curNode$parent;
    var curNode = nodes[refKey];
    if (_isNil(node.parent) && _isNil(curNode.parent)) {
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
export function isEveryFirstLevelNodeUncheckable(nodes, uncheckableItemValues, valueKey) {
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
export function isNodeUncheckable(node, props) {
  var _props$uncheckableIte = props.uncheckableItemValues,
    uncheckableItemValues = _props$uncheckableIte === void 0 ? [] : _props$uncheckableIte,
    valueKey = props.valueKey;
  return uncheckableItemValues.some(function (value) {
    return node[valueKey] === value;
  });
}
export function getFormattedTree(nodes, data, props) {
  var childrenKey = props.childrenKey,
    cascade = props.cascade;
  return data.map(function (node) {
    var formatted = _extends({}, node);
    var curNode = nodes[node.refKey];
    if (curNode) {
      var _node$childrenKey;
      var checkState = !_isUndefined(cascade) ? getNodeCheckState(curNode, {
        cascade: cascade,
        nodes: nodes,
        childrenKey: childrenKey
      }) : undefined;
      formatted.check = curNode.check;
      formatted.uncheckable = curNode.uncheckable;
      attachParent(formatted, curNode.parent);
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
export function getDisabledState(nodes, node, props) {
  var _props$disabledItemVa = props.disabledItemValues,
    disabledItemValues = _props$disabledItemVa === void 0 ? [] : _props$disabledItemVa,
    valueKey = props.valueKey;
  if (!_isNil(node.refKey) && _isNil(nodes[node.refKey])) {
    return false;
  }
  return disabledItemValues.some(function (value) {
    return node.refKey && nodes[node.refKey][valueKey] === value;
  });
}

/**
 * Returns the default value for the check tree.
 */
export function getCheckTreeDefaultValue(value, uncheckableItemValues) {
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
export function getSelectedItems(nodes, values) {
  var checkedItems = [];
  values.forEach(function (value) {
    var refKey = formatNodeRefKey(value);
    var node = nodes[refKey];
    if (!_isNil(node)) {
      checkedItems.push(node);
    }
  });
  return checkedItems;
}
/**
 * Calculates the check state of a node in a check tree.
 */
export function getNodeCheckState(node, options) {
  var nodes = options.nodes,
    cascade = options.cascade,
    childrenKey = options.childrenKey;
  if (node.refKey === undefined) {
    return CHECK_STATE.UNCHECK;
  }
  if (_isNil(nodes[node.refKey])) {
    return CHECK_STATE.UNCHECK;
  }
  if (!node[childrenKey] || !node[childrenKey].length || !cascade) {
    nodes[node.refKey].checkAll = false;
    return node.check ? CHECK_STATE.CHECK : CHECK_STATE.UNCHECK;
  }
  if (isEveryChildChecked(node, {
    nodes: nodes,
    childrenKey: childrenKey
  })) {
    nodes[node.refKey].checkAll = true;
    nodes[node.refKey].check = true;
    return CHECK_STATE.CHECK;
  }
  if (isSomeChildChecked(nodes, node, childrenKey)) {
    nodes[node.refKey].checkAll = false;
    return CHECK_STATE.INDETERMINATE;
  }
  return CHECK_STATE.UNCHECK;
}