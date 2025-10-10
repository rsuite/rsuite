'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.KEY_GROUP_TITLE = void 0;
exports.getDataGroupBy = getDataGroupBy;
var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));
var _utils = require("../../Tree/utils");
var _symbols = require("../symbols");
var KEY_GROUP_TITLE = exports.KEY_GROUP_TITLE = 'groupTitle';
function getDataGroupBy(data, key, sort) {
  var groupMap = (0, _groupBy2.default)(data, key);
  var isSort = typeof sort === 'function';
  var groups = Object.entries(groupMap).map(function (_ref) {
    var _ref2;
    var groupTitle = _ref[0],
      children = _ref[1];
    return _ref2 = {
      children: isSort ? children.sort(sort(false)) : children
    }, _ref2[KEY_GROUP_TITLE] = groupTitle, _ref2[_symbols.RSUITE_PICKER_GROUP_KEY] = true, _ref2;
  });
  if (isSort) {
    groups.sort(sort(true));
  }

  // Use DFS traverse
  // Because I want the result to be [group, child, child, group, child, child]
  // rather than [group, group, child, child, child, child]
  return (0, _utils.flattenTree)(groups, function (group) {
    return group.children;
  }, _utils.WalkTreeStrategy.DFS);
}
var _default = exports.default = getDataGroupBy;