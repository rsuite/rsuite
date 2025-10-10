'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.getDefaultExpandItemValues = getDefaultExpandItemValues;
var _react = require("react");
var _isFunction = _interopRequireDefault(require("lodash/isFunction"));
var _hooks = require("../../internals/hooks");
var _Picker = require("../../internals/Picker");
var _utils = require("../utils");
function getDefaultExpandItemValues(data, options) {
  var valueKey = options.valueKey,
    defaultExpandAll = options.defaultExpandAll,
    childrenKey = options.childrenKey,
    _options$defaultExpan = options.defaultExpandItemValues,
    defaultExpandItemValues = _options$defaultExpan === void 0 ? [] : _options$defaultExpan;
  if (defaultExpandAll) {
    return (0, _utils.flattenTree)(data, function (item) {
      return item[childrenKey] || [];
    }).filter(function (item) {
      return Array.isArray(item[childrenKey]) && item[childrenKey].length > 0;
    }).map(function (item) {
      return item[valueKey];
    });
  }
  return defaultExpandItemValues;
}
/**
 * Custom hook for managing tree expansion state.
 */
function useExpandTree(data, props) {
  var defaultExpandAll = props.defaultExpandAll,
    valueKey = props.valueKey,
    childrenKey = props.childrenKey,
    defaultExpandItemValues = props.defaultExpandItemValues,
    controlledExpandItemValues = props.controlledExpandItemValues,
    onExpand = props.onExpand,
    getChildren = props.getChildren,
    appendChild = props.appendChild;
  var _useControlled = (0, _hooks.useControlled)(controlledExpandItemValues, getDefaultExpandItemValues(data, {
      defaultExpandAll: defaultExpandAll,
      valueKey: valueKey,
      childrenKey: childrenKey,
      defaultExpandItemValues: defaultExpandItemValues
    })),
    expandItemValues = _useControlled[0],
    setExpandItemValues = _useControlled[1];
  (0, _react.useEffect)(function () {
    if (Array.isArray(controlledExpandItemValues)) {
      setExpandItemValues(controlledExpandItemValues);
    }
  }, [controlledExpandItemValues, setExpandItemValues]);
  var handleExpandTreeNode = (0, _hooks.useEventCallback)(function (node, expanded) {
    var nextExpandItemValues = (0, _utils.getExpandItemValues)({
      node: node,
      isExpand: !expanded,
      expandItemValues: expandItemValues,
      valueKey: valueKey
    });
    setExpandItemValues(nextExpandItemValues);
    onExpand === null || onExpand === void 0 || onExpand(nextExpandItemValues, node, (0, _Picker.createConcatChildrenFunction)(node, node[valueKey], {
      valueKey: valueKey,
      childrenKey: childrenKey
    }));
    if ((0, _isFunction.default)(getChildren) && !node.expand && Array.isArray(node[childrenKey]) && node[childrenKey].length === 0) {
      appendChild(node, getChildren);
    }
  });
  return {
    expandItemValues: expandItemValues,
    handleExpandTreeNode: handleExpandTreeNode
  };
}
var _default = exports.default = useExpandTree;