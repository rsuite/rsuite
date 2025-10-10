'use client';
import _groupBy from "lodash/groupBy";
import { WalkTreeStrategy, flattenTree } from "../../Tree/utils/index.js";
import { RSUITE_PICKER_GROUP_KEY } from "../symbols.js";
export var KEY_GROUP_TITLE = 'groupTitle';
export function getDataGroupBy(data, key, sort) {
  var groupMap = _groupBy(data, key);
  var isSort = typeof sort === 'function';
  var groups = Object.entries(groupMap).map(function (_ref) {
    var _ref2;
    var groupTitle = _ref[0],
      children = _ref[1];
    return _ref2 = {
      children: isSort ? children.sort(sort(false)) : children
    }, _ref2[KEY_GROUP_TITLE] = groupTitle, _ref2[RSUITE_PICKER_GROUP_KEY] = true, _ref2;
  });
  if (isSort) {
    groups.sort(sort(true));
  }

  // Use DFS traverse
  // Because I want the result to be [group, child, child, group, child, child]
  // rather than [group, group, child, child, child, child]
  return flattenTree(groups, function (group) {
    return group.children;
  }, WalkTreeStrategy.DFS);
}
export default getDataGroupBy;