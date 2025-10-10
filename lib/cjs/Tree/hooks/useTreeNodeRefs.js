'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useTreeNodeRefs;
var _react = require("react");
var _isNil = _interopRequireDefault(require("lodash/isNil"));
/**
 * Custom hook that manages references to tree nodes. */
function useTreeNodeRefs() {
  var treeNodeRefs = (0, _react.useRef)({});
  var saveTreeNodeRef = function saveTreeNodeRef(ref, refKey) {
    if (!(0, _isNil.default)(refKey)) {
      treeNodeRefs.current[refKey] = ref;
    }
  };
  return {
    treeNodesRefs: treeNodeRefs.current,
    saveTreeNodeRef: saveTreeNodeRef
  };
}