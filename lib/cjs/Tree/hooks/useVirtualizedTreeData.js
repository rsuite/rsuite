'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
var _intersection = _interopRequireDefault(require("lodash/intersection"));
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _getNodeParentKeys = require("../utils/getNodeParentKeys");
var _isSearching = require("../utils/isSearching");
var _flattenTree = require("../utils/flattenTree");
var _utils = require("../../CheckTree/utils");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
/**
 * Determines whether a node should be shown based on the expanded state of its parent nodes.
 */
function shouldShowNodeByParentExpanded(expandItemValues, parentKeys) {
  if (expandItemValues === void 0) {
    expandItemValues = [];
  }
  if (parentKeys === void 0) {
    parentKeys = [];
  }
  var intersectionKeys = (0, _intersection.default)(expandItemValues, parentKeys);
  if (intersectionKeys.length === parentKeys.length) {
    return true;
  }
  return false;
}
function useVirtualizedTreeData(nodes, data, options) {
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    childrenKey = _useItemDataKeys.childrenKey,
    valueKey = _useItemDataKeys.valueKey;

  /**
   * Formats the virtualized tree data.
   */
  return (0, _react.useCallback)(function () {
    var cascade = options.cascade,
      searchKeyword = options.searchKeyword,
      expandItemValues = options.expandItemValues;
    return (0, _flattenTree.UNSAFE_flattenTree)(data, childrenKey, function (node) {
      var formatted = {};
      var curNode = nodes === null || nodes === void 0 ? void 0 : nodes[node.refKey];
      var parentKeys = (0, _getNodeParentKeys.getNodeParentKeys)(nodes, curNode, valueKey);
      /**
       * When using virtualized,
       * if the parent node is collapsed, the child nodes should be hidden
       * avoid component height calculation errors
       */
      var visible = curNode !== null && curNode !== void 0 && curNode.parent ? shouldShowNodeByParentExpanded(expandItemValues, parentKeys) : true;

      /**
       * when searching, every node default expand
       * the node's visible should follow the original state
       */
      if ((0, _isSearching.isSearching)(searchKeyword)) {
        visible = node.visible;
      }
      if (curNode) {
        var checkState = !(0, _isUndefined.default)(cascade) ? (0, _utils.getNodeCheckState)(curNode, {
          cascade: cascade,
          nodes: nodes,
          childrenKey: childrenKey
        }) : undefined;
        formatted = (0, _extends2.default)({}, node, {
          check: curNode.check,
          uncheckable: curNode.uncheckable,
          hasChildren: !!node[childrenKey],
          layer: curNode.layer,
          parent: curNode.parent,
          checkState: checkState,
          visible: visible
        });
      }
      return formatted;
    });
  }, [childrenKey, data, nodes, options, valueKey]);
}
var _default = exports.default = useVirtualizedTreeData;