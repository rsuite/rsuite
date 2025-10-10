'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { useCallback, useRef, useEffect } from 'react';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import { shallowEqual } from "../../internals/utils/index.js";
import { formatNodeRefKey } from "../utils/index.js";
import useForceUpdate from "./useForceUpdate.js";
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
  var forceUpdate = useForceUpdate();
  var flattenedNodes = useRef({});
  var updateTreeNodeCheckState = useCallback(function (value) {
    if (value === void 0) {
      value = [];
    }
    // Reset values to false
    Object.keys(flattenedNodes.current).forEach(function (refKey) {
      var node = flattenedNodes.current[refKey];
      if (cascade && !isNil(node.parent) && !isNil(node.parent.refKey)) {
        node.check = flattenedNodes.current[node.parent.refKey].check;
      } else {
        node.check = false;
      }
      value.forEach(function (nodeVal) {
        if (shallowEqual(flattenedNodes.current[refKey][valueKey], nodeVal) && !uncheckableItemValues.some(function (uncheckableValue) {
          return shallowEqual(nodeVal, uncheckableValue);
        })) {
          flattenedNodes.current[refKey].check = true;
        }
      });
    });
  }, [cascade, uncheckableItemValues, valueKey]);
  var flattenTreeData = useCallback(function (treeData, parent, layer) {
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
      var refKey = formatNodeRefKey(value);
      node.refKey = refKey;
      flattenedNodes.current[refKey] = _extends((_extends2 = {
        layer: layer
      }, _extends2[labelKey] = node[labelKey], _extends2[valueKey] = node[valueKey], _extends2.uncheckable = uncheckableItemValues.some(function (value) {
        return shallowEqual(node[valueKey], value);
      }), _extends2), node);
      if (parent) {
        flattenedNodes.current[refKey].parent = omit(parent, 'parent', 'children');
      }
      flattenTreeData(node[childrenKey], node, layer + 1);
    });
    callback === null || callback === void 0 || callback(flattenedNodes.current);
    forceUpdate();
  }, [callback, forceUpdate, valueKey, labelKey, uncheckableItemValues, childrenKey]);
  useEffect(function () {
    // when data is changed, should clear the flattenedNodes, avoid duplicate keys
    flattenedNodes.current = {};
    flattenTreeData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(function () {
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
export default useFlattenTree;