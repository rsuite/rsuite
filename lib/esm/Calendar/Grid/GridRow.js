'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "weekendDate", "rowIndex"];
import React, { useCallback } from 'react';
import { isSameDay, addDays, isBefore, isAfter, format } from "../../internals/utils/date/index.js";
import { DATERANGE_DISABLED_TARGET } from "../../internals/constants/index.js";
import { useClassNames } from "../../internals/hooks/index.js";
import { useCalendar } from "../hooks/index.js";
import GridCell from "./GridCell.js";
var GridRow = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _locale$dateLocale$op, _locale$dateLocale;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    _props$weekendDate = props.weekendDate,
    weekendDate = _props$weekendDate === void 0 ? new Date() : _props$weekendDate,
    rowIndex = props.rowIndex,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    _useCalendar$date = _useCalendar.date,
    selected = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    dateRange = _useCalendar.dateRange,
    hoverRangeValue = _useCalendar.hoverRangeValue,
    isoWeek = _useCalendar.isoWeek,
    weekStart = _useCalendar.weekStart,
    showWeekNumbers = _useCalendar.showWeekNumbers,
    locale = _useCalendar.locale,
    inSameMonth = _useCalendar.inSameMonth,
    disabledDate = _useCalendar.disabledDate,
    onSelect = _useCalendar.onSelect;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var handleSelect = useCallback(function (date, disabled, event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(date, event);
  }, [onSelect]);
  var renderDays = function renderDays() {
    var days = [];
    var _ref = dateRange || [],
      selectedStartDate = _ref[0],
      selectedEndDate = _ref[1];
    var _ref2 = hoverRangeValue !== null && hoverRangeValue !== void 0 ? hoverRangeValue : [],
      hoverStartDate = _ref2[0],
      hoverEndDate = _ref2[1];
    var isRangeSelectionMode = typeof dateRange !== 'undefined';
    for (var i = 0; i < 7; i += 1) {
      var thisDate = addDays(weekendDate, i);
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate, dateRange, DATERANGE_DISABLED_TARGET.CALENDAR);
      var unSameMonth = !(inSameMonth !== null && inSameMonth !== void 0 && inSameMonth(thisDate));
      var rangeStart = !unSameMonth && selectedStartDate && isSameDay(thisDate, selectedStartDate);
      var rangeEnd = !unSameMonth && selectedEndDate && isSameDay(thisDate, selectedEndDate);
      var isSelected = isRangeSelectionMode ? rangeStart || rangeEnd : isSameDay(thisDate, selected);

      // TODO-Doma Move those logic that's for DatePicker/DateRangePicker to a separate component
      //           Calendar is not supposed to be reused this way
      var inRange = false;
      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if (isBefore(thisDate, selectedEndDate) && isAfter(thisDate, selectedStartDate)) {
          inRange = true;
        }
        if (isBefore(thisDate, selectedStartDate) && isAfter(thisDate, selectedEndDate)) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverStartDate && hoverEndDate) {
        if (!isAfter(thisDate, hoverEndDate) && !isBefore(thisDate, hoverStartDate)) {
          inRange = true;
        }
        if (!isAfter(thisDate, hoverStartDate) && !isBefore(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }
      days.push(/*#__PURE__*/React.createElement(GridCell, {
        key: format(thisDate, 'yyyy-MM-dd'),
        date: thisDate,
        disabled: disabled,
        selected: isSelected,
        onSelect: handleSelect,
        unSameMonth: unSameMonth,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        inRange: inRange
      }));
    }
    return days;
  };
  var classes = merge(className, prefix('row'));
  var _ref3 = (_locale$dateLocale$op = locale === null || locale === void 0 || (_locale$dateLocale = locale.dateLocale) === null || _locale$dateLocale === void 0 ? void 0 : _locale$dateLocale.options) !== null && _locale$dateLocale$op !== void 0 ? _locale$dateLocale$op : {},
    firstWeekContainsDate = _ref3.firstWeekContainsDate;

  // ISO week starts on Monday
  var date = isoWeek ? addDays(weekendDate, 1) : weekendDate;
  var week = format(date, isoWeek ? 'I' : 'w', {
    locale: locale === null || locale === void 0 ? void 0 : locale.dateLocale,
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStart
  });
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    role: "row",
    "aria-rowindex": rowIndex,
    className: classes
  }), showWeekNumbers && /*#__PURE__*/React.createElement("div", {
    role: "rowheader",
    "aria-label": "Week " + week,
    className: prefix('cell-week-number')
  }, week), renderDays());
});
GridRow.displayName = 'CalendarGridRow';
export default GridRow;