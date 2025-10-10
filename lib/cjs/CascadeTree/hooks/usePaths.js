'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.usePaths = usePaths;
var _react = require("react");
var _utils = require("../../internals/Tree/utils");
var _utils2 = require("../utils");
/**
 * A Hook to get the selected path of Tree.
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 */
function usePaths(_ref) {
  var data = _ref.data,
    activeItem = _ref.activeItem,
    selectedItem = _ref.selectedItem,
    getParent = _ref.getParent,
    getChildren = _ref.getChildren;
  var pathTowardsSelectedItem = (0, _react.useMemo)(function () {
    return (0, _utils.getPathTowardsItem)(selectedItem, getParent);
  }, [getParent, selectedItem]);
  var _useMemo = (0, _react.useMemo)(function () {
      return (0, _utils2.getColumnsAndPaths)(data, activeItem, {
        getParent: getParent,
        getChildren: getChildren
      });
    }, [data, activeItem, getParent, getChildren]),
    columns = _useMemo.columns,
    pathTowardsActiveItem = _useMemo.path;
  return {
    columns: columns,
    pathTowardsSelectedItem: pathTowardsSelectedItem,
    pathTowardsActiveItem: pathTowardsActiveItem
  };
}
var _default = exports.default = usePaths;