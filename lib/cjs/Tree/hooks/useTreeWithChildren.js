'use client';
"use strict";

exports.__esModule = true;
exports.default = useTreeWithChildren;
var _react = require("react");
var _utils = require("../../internals/utils");
var _utils2 = require("../../internals/Tree/utils");
/**
 * Custom hook that provides functionality for managing a tree structure with children.
 */
function useTreeWithChildren(data, options) {
  var valueKey = options.valueKey,
    childrenKey = options.childrenKey;
  var _useState = (0, _react.useState)([]),
    loadingNodeValues = _useState[0],
    setLoadingNodeValues = _useState[1];
  var _useState2 = (0, _react.useState)(data),
    treeData = _useState2[0],
    setTreeData = _useState2[1];
  (0, _react.useEffect)(function () {
    setTreeData(data);
  }, [data]);
  var concatChildren = (0, _react.useCallback)(function (treeNode, children) {
    var value = treeNode[valueKey];
    treeNode = (0, _utils2.findNodeOfTree)(data, function (item) {
      return value === item[valueKey];
    });
    treeNode[childrenKey] = children;
    var newData = data.concat([]);
    setTreeData(newData);
    return newData;
  }, [data, valueKey, childrenKey]);
  var appendChild = (0, _react.useCallback)(function (node, getChildren) {
    setLoadingNodeValues(function (prev) {
      return prev.concat(node[valueKey]);
    });
    var children = getChildren(node);
    if (children instanceof Promise) {
      children.then(function (res) {
        var newData = concatChildren(node, res);
        setTreeData(newData);
        setLoadingNodeValues(function (prev) {
          return prev.filter(function (item) {
            return !(0, _utils.shallowEqual)(item, node[valueKey]);
          });
        });
      });
    } else {
      setTreeData(concatChildren(node, children));
      setLoadingNodeValues(function (prev) {
        return prev.filter(function (item) {
          return !(0, _utils.shallowEqual)(item, node[valueKey]);
        });
      });
    }
  }, [concatChildren, valueKey]);
  return {
    treeData: treeData,
    loadingNodeValues: loadingNodeValues,
    appendChild: appendChild
  };
}