'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix"];
import React from 'react';
import Grid from "./Grid/index.js";
import { getWeekStartDates, setDate } from "../internals/utils/date/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCalendar } from "./hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var CalendarBody = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-body' : _props$classPrefix,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    _useCalendar$date = _useCalendar.date,
    date = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    overrideLocale = _useCalendar.locale,
    weekStart = _useCalendar.weekStart;
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var locale = getLocale('Calendar', overrideLocale);
  var thisMonthDate = setDate(date, 1);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement(Grid, {
    rows: getWeekStartDates(thisMonthDate, {
      weekStart: weekStart,
      locale: locale === null || locale === void 0 ? void 0 : locale.dateLocale
    }),
    "aria-label": formatDate(thisMonthDate, locale.formattedMonthPattern)
  }));
});
CalendarBody.displayName = 'CalendarBody';
export default CalendarBody;