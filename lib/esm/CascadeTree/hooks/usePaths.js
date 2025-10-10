'use client';
import { useMemo } from 'react';
import { getPathTowardsItem } from "../../internals/Tree/utils/index.js";
import { getColumnsAndPaths } from "../utils.js";
/**
 * A Hook to get the selected path of Tree.
 *
 * - The columns of items to be displayed
 * - The path towards the current focused item
 * - The path towards the current selected item (referred to by Cascader's value)
 *
 */
export function usePaths(_ref) {
  var data = _ref.data,
    activeItem = _ref.activeItem,
    selectedItem = _ref.selectedItem,
    getParent = _ref.getParent,
    getChildren = _ref.getChildren;
  var pathTowardsSelectedItem = useMemo(function () {
    return getPathTowardsItem(selectedItem, getParent);
  }, [getParent, selectedItem]);
  var _useMemo = useMemo(function () {
      return getColumnsAndPaths(data, activeItem, {
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
export default usePaths;