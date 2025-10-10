'use client';
/**
 * Calculate columns to be displayed:
 *
 * - Every ancestor level of activeItem should be displayed
 * - The level that activeItem is at should be displayed
 * - If activeItem is a parent node, its child level should be displayed
 *
 * @param items
 * @param value
 * @param options
 * @returns
 */
export function getColumnsAndPaths(items, pathTarget, options) {
  var getParent = options.getParent,
    getChildren = options.getChildren;
  if (!pathTarget) {
    return {
      columns: [items],
      path: []
    };
  }
  var columns = [];
  var path = [pathTarget];
  var children = getChildren(pathTarget);
  if (children && children.length > 0) {
    columns.unshift(children);
  }
  for (var parent = getParent(pathTarget); !!parent; parent = getParent(parent)) {
    var _getChildren;
    columns.unshift((_getChildren = getChildren(parent)) !== null && _getChildren !== void 0 ? _getChildren : []);
    path.unshift(parent);
  }
  columns.unshift(items);
  return {
    columns: columns,
    path: path
  };
}