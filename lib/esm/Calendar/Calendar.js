'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "bordered", "className", "classPrefix", "compact", "defaultValue", "isoWeek", "weekStart", "locale", "onChange", "onMonthChange", "onSelect", "renderCell", "value", "cellClassName"];
import React from 'react';
import PropTypes from 'prop-types';
import CalendarContainer from "./CalendarContainer.js";
import Button from "../Button/index.js";
import { isSameMonth, startOfDay } from "../internals/utils/date/index.js";
import { FormattedDate } from "../CustomProvider/index.js";
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { useCalendarDate } from "./hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
var Calendar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Calendar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? CalendarContainer : _propsWithDefaults$as,
    bordered = propsWithDefaults.bordered,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'calendar' : _propsWithDefaults$cl,
    compact = propsWithDefaults.compact,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? startOfDay(new Date()) : _propsWithDefaults$de,
    isoWeek = propsWithDefaults.isoWeek,
    weekStart = propsWithDefaults.weekStart,
    locale = propsWithDefaults.locale,
    onChange = propsWithDefaults.onChange,
    onMonthChange = propsWithDefaults.onMonthChange,
    onSelect = propsWithDefaults.onSelect,
    renderCell = propsWithDefaults.renderCell,
    value = propsWithDefaults.value,
    cellClassName = propsWithDefaults.cellClassName,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useCalendarDate = useCalendarDate(value, defaultValue),
    calendarDate = _useCalendarDate.calendarDate,
    setCalendarDate = _useCalendarDate.setCalendarDate;
  var handleChange = useEventCallback(function (nextValue) {
    setCalendarDate(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue);
    if (!isSameMonth(nextValue, calendarDate)) {
      onMonthChange === null || onMonthChange === void 0 || onMonthChange(nextValue);
    }
  });
  var handleClickToday = useEventCallback(function () {
    handleChange(new Date());
  });
  var handleSelect = useEventCallback(function (nextValue) {
    onSelect === null || onSelect === void 0 || onSelect(nextValue);
    handleChange(nextValue);
  });
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var renderToolbar = function renderToolbar() {
    return /*#__PURE__*/React.createElement(Button, {
      className: prefix('btn-today'),
      size: "sm",
      onClick: handleClickToday
    }, (locale === null || locale === void 0 ? void 0 : locale.today) || 'Today');
  };
  var renderTitle = function renderTitle(date) {
    return /*#__PURE__*/React.createElement(FormattedDate, {
      date: date,
      formatStr: (locale === null || locale === void 0 ? void 0 : locale.formattedMonthPattern) || 'MMMM  yyyy'
    });
  };
  var classes = merge(className, withClassPrefix('panel', {
    bordered: bordered,
    compact: compact
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    inline: true,
    className: classes,
    ref: ref,
    isoWeek: isoWeek,
    weekStart: weekStart,
    format: "yyyy-MM-dd",
    calendarDate: calendarDate,
    limitEndYear: 1000,
    locale: locale,
    renderTitle: renderTitle,
    renderToolbar: renderToolbar,
    renderCell: renderCell,
    cellClassName: cellClassName,
    onMoveForward: handleChange,
    onMoveBackward: handleChange,
    onChangeMonth: handleChange,
    onSelect: handleSelect
  }));
});
Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  isoWeek: PropTypes.bool,
  weekStart: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  renderCell: PropTypes.func
};
export default Calendar;