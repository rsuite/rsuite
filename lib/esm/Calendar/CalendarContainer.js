'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "calendarDate", "dateRange", "disabledBackward", "defaultState", "disabledForward", "format", "hoverRangeValue", "inline", "isoWeek", "weekStart", "targetId", "limitEndYear", "limitStartYear", "locale", "monthDropdownProps", "showMeridiem", "showWeekNumbers", "cellClassName", "disabledDate", "onChangeMonth", "onChangeTime", "onMouseMove", "onMoveBackward", "onMoveForward", "onSelect", "onToggleMonthDropdown", "onToggleTimeDropdown", "renderCell", "renderCellOnPicker", "renderTitle", "renderToolbar"];
import React, { useMemo } from 'react';
import pick from 'lodash/pick';
import MonthDropdown from "./MonthDropdown/index.js";
import TimeDropdown from "./TimeDropdown/index.js";
import CalendarBody from "./CalendarBody.js";
import CalendarHeader from "./CalendarHeader.js";
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { startOfToday, disableTime, isSameMonth, calendarOnlyProps, omitHideDisabledProps, DateMode, useDateMode, isValid } from "../internals/utils/date/index.js";
import { CalendarProvider } from "./CalendarProvider.js";
import { useCalendarState, CalendarState } from "./hooks/index.js";
import ArrowUpIcon from '@rsuite/icons/ArrowUp';
var CalendarContainer = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar' : _props$classPrefix,
    calendarDateProp = props.calendarDate,
    dateRange = props.dateRange,
    disabledBackward = props.disabledBackward,
    defaultState = props.defaultState,
    disabledForward = props.disabledForward,
    format = props.format,
    hoverRangeValue = props.hoverRangeValue,
    inline = props.inline,
    _props$isoWeek = props.isoWeek,
    isoWeek = _props$isoWeek === void 0 ? false : _props$isoWeek,
    weekStart = props.weekStart,
    targetId = props.targetId,
    limitEndYear = props.limitEndYear,
    limitStartYear = props.limitStartYear,
    locale = props.locale,
    monthDropdownProps = props.monthDropdownProps,
    showMeridiem = props.showMeridiem,
    showWeekNumbers = props.showWeekNumbers,
    cellClassName = props.cellClassName,
    disabledDate = props.disabledDate,
    onChangeMonth = props.onChangeMonth,
    onChangeTime = props.onChangeTime,
    onMouseMove = props.onMouseMove,
    onMoveBackward = props.onMoveBackward,
    onMoveForward = props.onMoveForward,
    onSelect = props.onSelect,
    onToggleMonthDropdown = props.onToggleMonthDropdown,
    onToggleTimeDropdown = props.onToggleTimeDropdown,
    renderCell = props.renderCell,
    renderCellOnPicker = props.renderCellOnPicker,
    renderTitle = props.renderTitle,
    renderToolbar = props.renderToolbar,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var calendarDate = useMemo(function () {
    return isValid(calendarDateProp) ? calendarDateProp : startOfToday();
  }, [calendarDateProp]);
  var _useCalendarState = useCalendarState({
      defaultState: defaultState,
      calendarDate: calendarDate,
      onMoveForward: onMoveForward,
      onMoveBackward: onMoveBackward,
      onToggleTimeDropdown: onToggleTimeDropdown,
      onToggleMonthDropdown: onToggleMonthDropdown
    }),
    calendarState = _useCalendarState.calendarState,
    reset = _useCalendarState.reset,
    handlers = _useCalendarState.handlers;
  var isDateDisabled = function isDateDisabled(date) {
    var _disabledDate;
    return (_disabledDate = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)) !== null && _disabledDate !== void 0 ? _disabledDate : false;
  };
  var isTimeDisabled = function isTimeDisabled(date) {
    return disableTime(props, date);
  };
  var handleCloseDropdown = useEventCallback(function () {
    return reset();
  });
  var _useDateMode = useDateMode(format),
    mode = _useDateMode.mode,
    has = _useDateMode.has;
  var timeMode = calendarState === CalendarState.TIME || mode === DateMode.Time;
  var monthMode = calendarState === CalendarState.MONTH || mode === DateMode.Month;
  var inSameThisMonthDate = function inSameThisMonthDate(date) {
    return isSameMonth(calendarDate, date);
  };
  var calendarClasses = merge(className, withClassPrefix({
    'time-view': timeMode,
    'month-view': monthMode,
    'only-time': mode === DateMode.Time,
    'show-week-numbers': showWeekNumbers
  }));
  var timeDropdownProps = pick(rest, calendarOnlyProps);
  var handleChangeMonth = useEventCallback(function (date, event) {
    reset();
    onChangeMonth === null || onChangeMonth === void 0 || onChangeMonth(date, event);
  });
  var contextValue = {
    date: calendarDate,
    dateRange: dateRange,
    format: format,
    hoverRangeValue: hoverRangeValue,
    inline: inline,
    isoWeek: isoWeek,
    weekStart: weekStart,
    targetId: targetId,
    locale: locale,
    showWeekNumbers: showWeekNumbers,
    monthDropdownProps: monthDropdownProps,
    cellClassName: cellClassName,
    disabledDate: isDateDisabled,
    inSameMonth: inSameThisMonthDate,
    onChangeMonth: handleChangeMonth,
    onChangeTime: onChangeTime,
    onMouseMove: onMouseMove,
    onSelect: onSelect,
    renderCell: renderCell,
    renderCellOnPicker: renderCellOnPicker
  };
  return /*#__PURE__*/React.createElement(CalendarProvider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({
    "data-testid": "calendar"
  }, omitHideDisabledProps(rest), {
    className: calendarClasses,
    ref: ref
  }), mode !== DateMode.Time && /*#__PURE__*/React.createElement(CalendarHeader, _extends({}, handlers, {
    showMonth: has('month'),
    showDate: has('day'),
    showTime: has('time'),
    disabledTime: isTimeDisabled,
    renderTitle: renderTitle,
    renderToolbar: renderToolbar,
    disabledBackward: disabledBackward,
    disabledForward: disabledForward
  })), has('day') && /*#__PURE__*/React.createElement(CalendarBody, null), has('month') && /*#__PURE__*/React.createElement(MonthDropdown, {
    show: monthMode,
    limitEndYear: limitEndYear,
    limitStartYear: limitStartYear,
    disabledMonth: isDateDisabled
  }), has('time') && /*#__PURE__*/React.createElement(TimeDropdown, _extends({}, timeDropdownProps, {
    show: timeMode,
    showMeridiem: showMeridiem
  })), (monthMode || timeMode) && has('day') && /*#__PURE__*/React.createElement("button", {
    className: prefix('btn-close'),
    onClick: handleCloseDropdown,
    "aria-label": "Collapse " + (monthMode ? 'month' : 'time') + " view"
  }, /*#__PURE__*/React.createElement(ArrowUpIcon, null))));
});
CalendarContainer.displayName = 'CalendarContainer';
export default CalendarContainer;