'use client';
"use strict";

exports.__esModule = true;
exports.getExpandItemValues = getExpandItemValues;
/**
 * Returns an array of expanded item values.
 */
function getExpandItemValues(_ref) {
  var node = _ref.node,
    isExpand = _ref.isExpand,
    expandItemValues = _ref.expandItemValues,
    valueKey = _ref.valueKey;
  var newExpandItemValues = new Set(expandItemValues);
  if (isExpand) {
    newExpandItemValues.add(node[valueKey]);
  } else {
    newExpandItemValues.delete(node[valueKey]);
  }
  return Array.from(newExpandItemValues);
}