'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["locale", "loadAnimation"];
import React from 'react';
import TableCell from "./TableCell.js";
import TableHeaderCell from "./TableHeaderCell.js";
import TableColumn from "./TableColumn.js";
import TableColumnGroup from "./TableColumnGroup.js";
import { useCustom } from "../CustomProvider/index.js";
import { Table as RsTable } from 'rsuite-table';
var CustomTable = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Table', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl,
    getLocale = _useCustom.getLocale;
  var overrideLocale = propsWithDefaults.locale,
    _propsWithDefaults$lo = propsWithDefaults.loadAnimation,
    loadAnimation = _propsWithDefaults$lo === void 0 ? true : _propsWithDefaults$lo,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var locale = getLocale('Calendar', overrideLocale);
  return /*#__PURE__*/React.createElement(RsTable, _extends({}, rest, {
    rtl: rtl,
    ref: ref,
    locale: locale,
    loadAnimation: loadAnimation
  }));
});

/**
 * The `Table` component is used to display data in a table.
 *
 * @see https://rsuitejs.com/components/table/
 */
var Table = Object.assign(CustomTable, {
  /**
   * The `Table.Cell` component  is used to display data in a table cell.
   */
  Cell: TableCell,
  /**
   * The `Table.Column` component  is used to define a column in a table.
   */
  Column: TableColumn,
  /**
   * The `Table.HeaderCell` component  is used to define a header cell in a table.
   */
  HeaderCell: TableHeaderCell,
  /**
   * The `Table.ColumnGroup` component  is used to define a column group in a table.
   */
  ColumnGroup: TableColumnGroup
});
export default Table;