'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _utils = require("../../Tree/utils");
var _utils2 = require("../../internals/utils");
/**
 * A hook to flatten tree structure data
 */
function useFlattenData(data, itemKeys) {
  var childrenKey = itemKeys.childrenKey;
  var _useState = (0, _react.useState)((0, _utils.UNSAFE_flattenTree)(data, itemKeys.childrenKey)),
    flattenData = _useState[0],
    setFlattenData = _useState[1];
  var addFlattenData = (0, _react.useCallback)(function (children, parent) {
    var nodes = children.map(function (child) {
      return (0, _utils2.attachParent)(child, parent);
    });
    parent[childrenKey] = nodes;
    setFlattenData([].concat(flattenData, nodes));
  }, [childrenKey, flattenData]);
  (0, _react.useEffect)(function () {
    setFlattenData((0, _utils.UNSAFE_flattenTree)(data, itemKeys.childrenKey));
  }, [data, itemKeys.childrenKey]);
  return {
    addFlattenData: addFlattenData,
    flattenData: flattenData
  };
}
var _default = exports.default = useFlattenData;