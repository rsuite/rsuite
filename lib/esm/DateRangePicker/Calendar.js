'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "calendarDateRange", "format", "disabledDate", "index", "limitEndYear", "limitStartYear", "onChangeCalendarMonth", "onChangeCalendarTime", "onSelect", "renderTitle", "value"];
import React, { useCallback } from 'react';
import CalendarContainer from "../Calendar/CalendarContainer.js";
import { addMonths, startOfToday } from "../internals/utils/date/index.js";
import { DATERANGE_DISABLED_TARGET } from "../internals/constants/index.js";
import { useCalendarHandlers } from "./hooks/index.js";
var Calendar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? CalendarContainer : _props$as,
    _props$calendarDateRa = props.calendarDateRange,
    calendarDateRange = _props$calendarDateRa === void 0 ? [startOfToday(), addMonths(startOfToday(), 1)] : _props$calendarDateRa,
    _props$format = props.format,
    format = _props$format === void 0 ? 'yyyy-MM-dd' : _props$format,
    disabledDate = props.disabledDate,
    _props$index = props.index,
    index = _props$index === void 0 ? 0 : _props$index,
    limitEndYear = props.limitEndYear,
    limitStartYear = props.limitStartYear,
    onChangeCalendarMonth = props.onChangeCalendarMonth,
    onChangeCalendarTime = props.onChangeCalendarTime,
    onSelect = props.onSelect,
    renderTitle = props.renderTitle,
    _props$value = props.value,
    value = _props$value === void 0 ? [] : _props$value,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var calendarKey = index === 0 ? 'start' : 'end';
  var calendarHandlers = useCalendarHandlers({
    index: index,
    calendarDateRange: calendarDateRange,
    onChangeCalendarMonth: onChangeCalendarMonth,
    onChangeCalendarTime: onChangeCalendarTime,
    onSelect: onSelect
  });
  var disableCalendarDate = useCallback(function (date) {
    return disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, value, DATERANGE_DISABLED_TARGET.CALENDAR);
  }, [disabledDate, value]);
  var handleRenderTitle = useCallback(function (date) {
    return renderTitle === null || renderTitle === void 0 ? void 0 : renderTitle(date, calendarKey);
  }, [renderTitle, calendarKey]);
  return /*#__PURE__*/React.createElement(Component, _extends({
    "data-testid": "calendar-" + calendarKey
  }, rest, calendarHandlers, {
    index: index,
    format: format,
    dateRange: value,
    disabledDate: disableCalendarDate,
    limitEndYear: limitEndYear,
    limitStartYear: limitStartYear,
    ref: ref,
    renderTitle: handleRenderTitle
  }));
});
Calendar.displayName = 'DateRangePicker.Calendar';
export default Calendar;