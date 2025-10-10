'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "disabled", "selected", "date", "onSelect", "unSameMonth", "rangeStart", "rangeEnd", "inRange"];
import React from 'react';
import partial from 'lodash/partial';
import { isSameDay, getDate } from "../../internals/utils/date/index.js";
import { useClassNames } from "../../internals/hooks/index.js";
import { useCustom } from "../../CustomProvider/index.js";
import { useCalendar } from "../hooks/index.js";
import { getAriaLabel } from "../utils/index.js";
var GridCell = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    onMouseMove = _useCalendar.onMouseMove,
    cellClassName = _useCalendar.cellClassName,
    renderCell = _useCalendar.renderCell,
    renderCellOnPicker = _useCalendar.renderCellOnPicker,
    overrideLocale = _useCalendar.locale;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var _getLocale = getLocale('Calendar', overrideLocale),
    formattedDayPattern = _getLocale.formattedDayPattern,
    today = _getLocale.today;
  var formatStr = formattedDayPattern;
  var ariaLabel = getAriaLabel(date, formatStr, formatDate);
  var todayDate = new Date();
  var isToday = isSameDay(date, todayDate);
  var classes = merge(prefix('cell', {
    'cell-un-same-month': unSameMonth,
    'cell-is-today': isToday,
    'cell-selected': selected,
    'cell-selected-start': rangeStart,
    'cell-selected-end': rangeEnd,
    'cell-in-range': !unSameMonth && inRange,
    'cell-disabled': disabled
  }), cellClassName === null || cellClassName === void 0 ? void 0 : cellClassName(date));
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    role: "gridcell",
    "aria-label": ariaLabel,
    "aria-selected": selected || undefined,
    "aria-disabled": disabled || undefined,
    tabIndex: selected ? 0 : -1,
    title: isToday ? ariaLabel + " (" + today + ")" : ariaLabel,
    className: classes,
    onMouseEnter: !disabled && onMouseMove ? onMouseMove.bind(null, date) : undefined,
    onClick: onSelect ? partial(onSelect, date, disabled) : undefined
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: prefix('cell-content')
  }, renderCellOnPicker ? renderCellOnPicker(date) : /*#__PURE__*/React.createElement("span", {
    className: prefix('cell-day')
  }, getDate(date)), renderCell === null || renderCell === void 0 ? void 0 : renderCell(date)));
});
GridCell.displayName = 'CalendarGridCell';
export default GridCell;