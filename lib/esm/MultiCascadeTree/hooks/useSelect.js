'use client';
import { useState } from 'react';
import { useEventCallback, useUpdateEffect, useIsMounted } from "../../internals/hooks/index.js";
import useFlattenData from "./useFlattenData.js";
import useColumnData from "./useColumnData.js";
var useSelect = function useSelect(props) {
  var data = props.data,
    childrenKey = props.childrenKey,
    labelKey = props.labelKey,
    valueKey = props.valueKey,
    onSelect = props.onSelect,
    getChildren = props.getChildren;
  var itemKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useFlattenData = useFlattenData(data, itemKeys),
    flattenData = _useFlattenData.flattenData,
    addFlattenData = _useFlattenData.addFlattenData;

  // The columns displayed in the cascading panel.
  var _useColumnData = useColumnData(flattenData),
    columnData = _useColumnData.columnData,
    addColumn = _useColumnData.addColumn,
    setColumnData = _useColumnData.setColumnData,
    removeColumnByIndex = _useColumnData.removeColumnByIndex,
    enforceUpdateColumnData = _useColumnData.enforceUpdateColumnData;
  useUpdateEffect(function () {
    enforceUpdateColumnData(data);
  }, [data]);
  var isMounted = useIsMounted();

  // The path after cascading data selection.
  var _useState = useState(),
    selectedPaths = _useState[0],
    setSelectedPaths = _useState[1];
  var handleSelect = useEventCallback(function (node, cascadePaths, event) {
    var _node$childrenKey, _node$childrenKey2;
    setSelectedPaths(cascadePaths);
    var columnIndex = cascadePaths.length;

    // Lazy load node's children
    if (typeof getChildren === 'function' && ((_node$childrenKey = node[childrenKey]) === null || _node$childrenKey === void 0 ? void 0 : _node$childrenKey.length) === 0) {
      node.loading = true;
      var children = getChildren(node);
      if (children instanceof Promise) {
        children.then(function (data) {
          node.loading = false;
          node[childrenKey] = data;
          if (isMounted()) {
            addFlattenData(data, node);
            addColumn(data, columnIndex);
          }
        });
      } else {
        node.loading = false;
        node[childrenKey] = children;
        addFlattenData(children, node);
        addColumn(children, columnIndex);
      }
    } else if ((_node$childrenKey2 = node[childrenKey]) !== null && _node$childrenKey2 !== void 0 && _node$childrenKey2.length) {
      addColumn(node[childrenKey], columnIndex);
    } else {
      // Removes subsequent columns of the current column when the clicked node is a leaf node.
      removeColumnByIndex(columnIndex);
    }
    onSelect === null || onSelect === void 0 || onSelect(node, cascadePaths, event);
  });
  return {
    columnData: columnData,
    setColumnData: setColumnData,
    flattenData: flattenData,
    selectedPaths: selectedPaths,
    setSelectedPaths: setSelectedPaths,
    handleSelect: handleSelect
  };
};
export default useSelect;