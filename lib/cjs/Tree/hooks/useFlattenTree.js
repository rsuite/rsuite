'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
var _omit = _interopRequireDefault(require("lodash/omit"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _utils = require("../../internals/utils");
var _utils2 = require("../utils");
var _useForceUpdate = _interopRequireDefault(require("./useForceUpdate"));
/**
 * Custom hook that flattens a tree data structure into a map of nodes.
 *
 */
function useFlattenTree(data, options) {
  var value = options.value,
    labelKey = options.labelKey,
    valueKey = options.valueKey,
    childrenKey = options.childrenKey,
    _options$uncheckableI = options.uncheckableItemValues,
    uncheckableItemValues = _options$uncheckableI === void 0 ? [] : _options$uncheckableI,
    cascade = options.cascade,
    multiple = options.multiple,
    callback = options.callback;
  var forceUpdate = (0, _useForceUpdate.default)();
  var flattenedNodes = (0, _react.useRef)({});
  var updateTreeNodeCheckState = (0, _react.useCallback)(function (value) {
    if (value === void 0) {
      value = [];
    }
    // Reset values to false
    Object.keys(flattenedNodes.current).forEach(function (refKey) {
      var node = flattenedNodes.current[refKey];
      if (cascade && !(0, _isNil.default)(node.parent) && !(0, _isNil.default)(node.parent.refKey)) {
        node.check = flattenedNodes.current[node.parent.refKey].check;
      } else {
        node.check = false;
      }
      value.forEach(function (nodeVal) {
        if ((0, _utils.shallowEqual)(flattenedNodes.current[refKey][valueKey], nodeVal) && !uncheckableItemValues.some(function (uncheckableValue) {
          return (0, _utils.shallowEqual)(nodeVal, uncheckableValue);
        })) {
          flattenedNodes.current[refKey].check = true;
        }
      });
    });
  }, [cascade, uncheckableItemValues, valueKey]);
  var flattenTreeData = (0, _react.useCallback)(function (treeData, parent, layer) {
    if (layer === void 0) {
      layer = 1;
    }
    if (!Array.isArray(treeData) || treeData.length === 0) {
      return [];
    }
    treeData.map(function (node) {
      var _extends2;
      var value = node[valueKey];
      /**
       * because the value of the node's type is string or number,
       * so it can used as the key of the object directly
       * to avoid number value is converted to string. 1 and '1' will be convert to '1'
       * we used `String_` or `Number_` prefix
       */
      var refKey = (0, _utils2.formatNodeRefKey)(value);
      node.refKey = refKey;
      flattenedNodes.current[refKey] = (0, _extends3.default)((_extends2 = {
        layer: layer
      }, _extends2[labelKey] = node[labelKey], _extends2[valueKey] = node[valueKey], _extends2.uncheckable = uncheckableItemValues.some(function (value) {
        return (0, _utils.shallowEqual)(node[valueKey], value);
      }), _extends2), node);
      if (parent) {
        flattenedNodes.current[refKey].parent = (0, _omit.default)(parent, 'parent', 'children');
      }
      flattenTreeData(node[childrenKey], node, layer + 1);
    });
    callback === null || callback === void 0 || callback(flattenedNodes.current);
    forceUpdate();
  }, [callback, forceUpdate, valueKey, labelKey, uncheckableItemValues, childrenKey]);
  (0, _react.useEffect)(function () {
    // when data is changed, should clear the flattenedNodes, avoid duplicate keys
    flattenedNodes.current = {};
    flattenTreeData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  (0, _react.useEffect)(function () {
    if (multiple) {
      updateTreeNodeCheckState(value);
      forceUpdate();
    }

    /**
     * Add a dependency on data, because when loading data asynchronously through getChildren,
     * data may change and the node status needs to be updated.
     * @see https://github.com/rsuite/rsuite/issues/3973
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, data]);
  return flattenedNodes.current;
}
var _default = exports.default = useFlattenTree;