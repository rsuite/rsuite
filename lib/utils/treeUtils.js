"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.shouldShowNodeByExpanded = shouldShowNodeByExpanded;
exports.flattenTree = flattenTree;
exports.getNodeParents = getNodeParents;
exports.shouldDisplay = shouldDisplay;
exports.getVirtualLisHeight = getVirtualLisHeight;
exports.hasVisibleChildren = hasVisibleChildren;
exports.treeDeprecatedWarning = treeDeprecatedWarning;
exports.compareArray = compareArray;
exports.getExpandAll = getExpandAll;
exports.getExpandItemValues = getExpandItemValues;
exports.getExpandState = getExpandState;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _intersection2 = _interopRequireDefault(require("lodash/intersection"));

var React = _interopRequireWildcard(require("react"));

var _utils = require("rsuite-utils/lib/utils");

var SEARCH_BAR_HEIGHT = 48;
var MENU_PADDING = 12;
/**
 * 判断当前节点是否应该显示
 * @param {*} expandItemValues
 * @param {*} parentKeys
 */

function shouldShowNodeByExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }

  if (parentKeys === void 0) {
    parentKeys = [];
  }

  var intersectionKeys = (0, _intersection2.default)(expandItemValues, parentKeys);

  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }

  return false;
}
/**
 * 拍平树结构为数组
 * @param {*} tree
 * @param {*} childrenKey
 * @param {*} executor
 */


function flattenTree(tree, childrenKey, executor) {
  if (childrenKey === void 0) {
    childrenKey = 'children';
  }

  var flattenData = [];

  var traverse = function traverse(data, parent) {
    if (!(0, _isArray2.default)(data)) {
      return;
    }

    data.forEach(function (item, index) {
      var node = typeof executor === 'function' ? executor(item, index) : item;
      node.parent = parent;
      flattenData.push((0, _extends2.default)({}, node));

      if (item[childrenKey]) {
        traverse(item[childrenKey], item);
      }
    });
  };

  traverse(tree, null);
  return flattenData;
}
/**
 * 获取树节点所有的祖先节点
 * @param {*} node
 */


function getNodeParents(node, parentKey, valueKey) {
  if (parentKey === void 0) {
    parentKey = 'parent';
  }

  var parents = [];

  var traverse = function traverse(node) {
    if (node === null || node === void 0 ? void 0 : node[parentKey]) {
      traverse(node[parentKey]);

      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };

  traverse(node);
  return parents;
}
/**
 * 判断当前节点是否显示
 * @param {*} label
 * @param {*} searchKeyword
 */


function shouldDisplay(label, searchKeyword) {
  if (!(0, _trim2.default)(searchKeyword)) {
    return true;
  }

  var keyword = searchKeyword.toLocaleLowerCase();

  if (typeof label === 'string') {
    return label.toLocaleLowerCase().indexOf(keyword) >= 0;
  } else if (React.isValidElement(label)) {
    var nodes = (0, _utils.reactToString)(label);
    return nodes.join('').toLocaleLowerCase().indexOf(keyword) >= 0;
  }

  return false;
}
/**
 * 获取 VirtualList 的高度
 * @param {*} inline
 * @param {*} height
 */


function getVirtualLisHeight(inline, height) {
  if (height === void 0) {
    height = 0;
  }

  return inline ? height - MENU_PADDING * 2 : height - SEARCH_BAR_HEIGHT - MENU_PADDING * 2;
}
/**
 * 判断节点是否存在可见的子节点。
 * @param node
 */


function hasVisibleChildren(node, childrenKey) {
  if (!Array.isArray(node[childrenKey])) {
    return false;
  }

  return node[childrenKey].some(function (child) {
    return child.visible;
  });
}
/**
 * 废弃 prop warning
 * @param prop
 */


function treeDeprecatedWarning(props, keys) {
  if (keys === void 0) {
    keys = [];
  }

  keys.forEach(function (key) {
    if (!(0, _isUndefined2.default)(props[key])) {
      console.warn("'Warning: " + key + " is deprecated and will be removed in a future release.'");
    }
  });
}
/**
 * 浅比较两个数组是否不一样
 * @param a
 * @param b
 */


function compareArray(a, b) {
  return (0, _isArray2.default)(a) && (0, _isArray2.default)(b) && !(0, _utils.shallowEqualArray)(a, b);
}
/**
 * 获取 expandAll 的 value
 * @param props
 */


function getExpandAll(props) {
  var expandAll = props.expandAll,
      defaultExpandAll = props.defaultExpandAll;
  return !(0, _isUndefined2.default)(expandAll) ? expandAll : defaultExpandAll;
}
/**
 * 获取 expandItemValues 的 value
 * @param props
 */


function getExpandItemValues(props) {
  var expandItemValues = props.expandItemValues,
      defaultExpandItemValues = props.defaultExpandItemValues;

  if (!(0, _isUndefined2.default)(expandItemValues) && Array.isArray(expandItemValues)) {
    return expandItemValues;
  }

  if (!(0, _isUndefined2.default)(defaultExpandItemValues) && Array.isArray(defaultExpandItemValues)) {
    return defaultExpandItemValues;
  }

  return [];
}
/**
 * 获取节点展开状态
 * @param node
 * @param props
 */


function getExpandState(node, props) {
  var _node$childrenKey;

  var valueKey = props.valueKey,
      childrenKey = props.childrenKey,
      expandItemValues = props.expandItemValues;
  var expandAll = getExpandAll(props);
  var expand = getExpandItemValues(props).some(function (value) {
    return (0, _utils.shallowEqual)(node[valueKey], value);
  });

  if (!(0, _isUndefined2.default)(expandItemValues)) {
    return expand;
  } else if ((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) {
    if (!(0, _isNil2.default)(node.expand)) {
      return !!node.expand;
    } else if (expandAll) {
      return true;
    }

    return false;
  }

  return false;
}