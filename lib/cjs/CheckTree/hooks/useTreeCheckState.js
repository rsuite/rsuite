'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _hooks = require("../../internals/hooks");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
var _utils = require("../utils");
function useTreeCheckState(props) {
  var cascade = props.cascade,
    flattenedNodes = props.flattenedNodes,
    uncheckableItemValues = props.uncheckableItemValues;
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    valueKey = _useItemDataKeys.valueKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var checkParentNode = (0, _hooks.useEventCallback)(function (nodes, node, checked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (cascade && currentNode) {
      if (!checked) {
        currentNode.check = checked;
        currentNode.checkAll = checked;
      } else {
        if ((0, _utils.isEveryChildChecked)(currentNode, {
          nodes: nodes,
          childrenKey: childrenKey
        })) {
          currentNode.check = true;
          currentNode.checkAll = true;
        } else {
          currentNode.check = false;
          currentNode.checkAll = false;
        }
      }
      if (currentNode.parent) {
        checkParentNode(nodes, currentNode.parent, checked);
      }
    }
  });
  var checkChildNode = (0, _hooks.useEventCallback)(function (nodes, node, isChecked) {
    var currentNode = node.refKey ? nodes[node.refKey] : null;
    if (!currentNode) {
      return;
    }
    currentNode.check = isChecked;
    if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
      currentNode.checkAll = false;
    } else {
      currentNode.checkAll = isChecked;
      currentNode[childrenKey].forEach(function (child) {
        checkChildNode(nodes, child, isChecked);
      });
    }
  });
  var getCheckedValuesByParent = (0, _react.useCallback)(function (nodes) {
    var values = [];
    for (var key in nodes) {
      var currentNode = nodes[key];
      if (!(0, _isNil.default)(currentNode.parent) && !(0, _isNil.default)(currentNode.parent.refKey)) {
        var parentNode = nodes[currentNode.parent.refKey];
        if (currentNode.check) {
          if (!(parentNode !== null && parentNode !== void 0 && parentNode.checkAll)) {
            values.push(currentNode[valueKey]);
          } else if (parentNode !== null && parentNode !== void 0 && parentNode.uncheckable) {
            values.push(currentNode[valueKey]);
          }
        }
      } else if (currentNode.check) {
        values.push(currentNode[valueKey]);
      }
    }
    return values;
  }, [valueKey]);
  var getCheckedValues = (0, _hooks.useEventCallback)(function (node, isChecked) {
    var nodes = (0, _cloneDeep.default)(flattenedNodes);
    checkChildNode(nodes, node, isChecked);
    if (node.parent) {
      checkParentNode(nodes, node.parent, isChecked);
    }
    var values = getCheckedValuesByParent(nodes);
    return values.filter(function (v) {
      return !uncheckableItemValues.includes(v);
    });
  });
  return {
    getCheckedValues: getCheckedValues
  };
}
var _default = exports.default = useTreeCheckState;