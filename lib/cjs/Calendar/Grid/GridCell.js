'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _partial = _interopRequireDefault(require("lodash/partial"));
var _date = require("../../internals/utils/date");
var _hooks = require("../../internals/hooks");
var _CustomProvider = require("../../CustomProvider");
var _hooks2 = require("../hooks");
var _utils = require("../utils");
var _excluded = ["as", "classPrefix", "disabled", "selected", "date", "onSelect", "unSameMonth", "rangeStart", "rangeEnd", "inRange"];
var GridCell = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    disabled = props.disabled,
    selected = props.selected,
    date = props.date,
    onSelect = props.onSelect,
    unSameMonth = props.unSameMonth,
    rangeStart = props.rangeStart,
    rangeEnd = props.rangeEnd,
    inRange = props.inRange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    onMouseMove = _useCalendar.onMouseMove,
    cellClassName = _useCalendar.cellClassName,
    renderCell = _useCalendar.renderCell,
    renderCellOnPicker = _useCalendar.renderCellOnPicker,
    overrideLocale = _useCalendar.locale;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var _getLocale = getLocale('Calendar', overrideLocale),
    formattedDayPattern = _getLocale.formattedDayPattern,
    today = _getLocale.today;
  var formatStr = formattedDayPattern;
  var ariaLabel = (0, _utils.getAriaLabel)(date, formatStr, formatDate);
  var todayDate = new Date();
  var isToday = (0, _date.isSameDay)(date, todayDate);
  var classes = merge(prefix('cell', {
    'cell-un-same-month': unSameMonth,
    'cell-is-today': isToday,
    'cell-selected': selected,
    'cell-selected-start': rangeStart,
    'cell-selected-end': rangeEnd,
    'cell-in-range': !unSameMonth && inRange,
    'cell-disabled': disabled
  }), cellClassName === null || cellClassName === void 0 ? void 0 : cellClassName(date));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    role: "gridcell",
    "aria-label": ariaLabel,
    "aria-selected": selected || undefined,
    "aria-disabled": disabled || undefined,
    tabIndex: selected ? 0 : -1,
    title: isToday ? ariaLabel + " (" + today + ")" : ariaLabel,
    className: classes,
    onMouseEnter: !disabled && onMouseMove ? onMouseMove.bind(null, date) : undefined,
    onClick: onSelect ? (0, _partial.default)(onSelect, date, disabled) : undefined
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('cell-content')
  }, renderCellOnPicker ? renderCellOnPicker(date) : /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('cell-day')
  }, (0, _date.getDate)(date)), renderCell === null || renderCell === void 0 ? void 0 : renderCell(date)));
});
GridCell.displayName = 'CalendarGridCell';
var _default = exports.default = GridCell;