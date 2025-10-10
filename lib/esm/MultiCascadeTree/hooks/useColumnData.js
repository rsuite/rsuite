'use client';
import { useState } from 'react';
import slice from 'lodash/slice';
import { UNSAFE_flattenTree } from "../../Tree/utils/index.js";
/**
 * A hook for column data
 * @param flattenData
 */
function useColumnData(flattenData) {
  // The columns displayed in the cascading panel.
  var _useState = useState([flattenData.filter(function (item) {
      return !item.parent;
    })]),
    columnData = _useState[0],
    setColumnData = _useState[1];

  /**
   * Add a list of options to the cascading panel. Used for lazy loading options.
   * @param column
   * @param index The index of the current column.
   */
  function addColumn(column, index) {
    setColumnData([].concat(slice(columnData, 0, index), [column]));
  }

  /**
   * Remove subsequent columns of the specified column
   * @param index
   */
  function removeColumnByIndex(index) {
    setColumnData([].concat(slice(columnData, 0, index)));
  }
  function enforceUpdateColumnData(nextData) {
    var nextFlattenData = UNSAFE_flattenTree(nextData);
    setColumnData([nextFlattenData.filter(function (item) {
      return !item.parent;
    })]);
  }
  return {
    columnData: columnData,
    addColumn: addColumn,
    removeColumnByIndex: removeColumnByIndex,
    setColumnData: setColumnData,
    enforceUpdateColumnData: enforceUpdateColumnData
  };
}
export default useColumnData;