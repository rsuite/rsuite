'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _TableCell = _interopRequireDefault(require("./TableCell"));
var _TableHeaderCell = _interopRequireDefault(require("./TableHeaderCell"));
var _TableColumn = _interopRequireDefault(require("./TableColumn"));
var _TableColumnGroup = _interopRequireDefault(require("./TableColumnGroup"));
var _CustomProvider = require("../CustomProvider");
var _rsuiteTable = require("rsuite-table");
var _excluded = ["locale", "loadAnimation"];
var CustomTable = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Table', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl,
    getLocale = _useCustom.getLocale;
  var overrideLocale = propsWithDefaults.locale,
    _propsWithDefaults$lo = propsWithDefaults.loadAnimation,
    loadAnimation = _propsWithDefaults$lo === void 0 ? true : _propsWithDefaults$lo,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var locale = getLocale('Calendar', overrideLocale);
  return /*#__PURE__*/_react.default.createElement(_rsuiteTable.Table, (0, _extends2.default)({}, rest, {
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
  Cell: _TableCell.default,
  /**
   * The `Table.Column` component  is used to define a column in a table.
   */
  Column: _TableColumn.default,
  /**
   * The `Table.HeaderCell` component  is used to define a header cell in a table.
   */
  HeaderCell: _TableHeaderCell.default,
  /**
   * The `Table.ColumnGroup` component  is used to define a column group in a table.
   */
  ColumnGroup: _TableColumnGroup.default
});
var _default = exports.default = Table;