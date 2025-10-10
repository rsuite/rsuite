'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _slice = _interopRequireDefault(require("lodash/slice"));
var _utils = require("../../Tree/utils");
/**
 * A hook for column data
 * @param flattenData
 */
function useColumnData(flattenData) {
  // The columns displayed in the cascading panel.
  var _useState = (0, _react.useState)([flattenData.filter(function (item) {
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
    setColumnData([].concat((0, _slice.default)(columnData, 0, index), [column]));
  }

  /**
   * Remove subsequent columns of the specified column
   * @param index
   */
  function removeColumnByIndex(index) {
    setColumnData([].concat((0, _slice.default)(columnData, 0, index)));
  }
  function enforceUpdateColumnData(nextData) {
    var nextFlattenData = (0, _utils.UNSAFE_flattenTree)(nextData);
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
var _default = exports.default = useColumnData;