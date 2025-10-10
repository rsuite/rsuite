'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "disabledBackward", "disabledForward", "showDate", "showMonth", "showTime", "disabledTime", "onMoveBackward", "onMoveForward", "onToggleMonthDropdown", "onToggleTimeDropdown", "renderTitle", "renderToolbar"];
import React, { useMemo } from 'react';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import IconButton from "../IconButton/index.js";
import Button from "../Button/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { extractTimeFormat } from "../internals/utils/date/index.js";
import { FormattedDate } from "../CustomProvider/index.js";
import { useCalendar } from "./hooks/index.js";
import { useDateRangePicker } from "../DateRangePicker/hooks/index.js";
var CalendarHeader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-header' : _props$classPrefix,
    disabledBackward = props.disabledBackward,
    disabledForward = props.disabledForward,
    showDate = props.showDate,
    showMonth = props.showMonth,
    showTime = props.showTime,
    disabledTime = props.disabledTime,
    onMoveBackward = props.onMoveBackward,
    onMoveForward = props.onMoveForward,
    onToggleMonthDropdown = props.onToggleMonthDropdown,
    onToggleTimeDropdown = props.onToggleTimeDropdown,
    renderTitleProp = props.renderTitle,
    renderToolbar = props.renderToolbar,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    locale = _useCalendar.locale,
    _useCalendar$date = _useCalendar.date,
    date = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    format = _useCalendar.format,
    inline = _useCalendar.inline,
    disabledDate = _useCalendar.disabledDate,
    targetId = _useCalendar.targetId;
  var _useDateRangePicker = useDateRangePicker(),
    isSelectedIdle = _useDateRangePicker.isSelectedIdle;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var btnProps = {
    appearance: 'subtle',
    size: inline ? 'sm' : 'xs'
  };
  var timeFormat = useMemo(function () {
    var defaultTimeFormat = (locale === null || locale === void 0 ? void 0 : locale.shortTimeFormat) || 'HH:mm';
    if (!format) {
      return defaultTimeFormat;
    }
    return extractTimeFormat(format) || defaultTimeFormat;
  }, [format, locale]);
  var dateFormat = useMemo(function () {
    if (showMonth) {
      return (locale === null || locale === void 0 ? void 0 : locale.formattedMonthPattern) || 'yyyy-MM';
    }
    return 'yyyy';
  }, [locale, showMonth]);
  var renderTitle = function renderTitle() {
    var _renderTitleProp;
    return (_renderTitleProp = renderTitleProp === null || renderTitleProp === void 0 ? void 0 : renderTitleProp(date)) !== null && _renderTitleProp !== void 0 ? _renderTitleProp : date && /*#__PURE__*/React.createElement(FormattedDate, {
      date: date,
      formatStr: dateFormat
    });
  };
  var dateTitleClasses = prefix('title', 'title-date', {
    error: disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)
  });
  var timeTitleClasses = prefix('title', 'title-time', {
    error: disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(date)
  });
  var backwardClass = prefix('backward', {
    'btn-disabled': disabledBackward
  });
  var forwardClass = prefix('forward', {
    'btn-disabled': disabledForward
  });
  var monthToolbar = /*#__PURE__*/React.createElement("div", {
    className: prefix('month-toolbar')
  }, /*#__PURE__*/React.createElement(IconButton, _extends({}, btnProps, {
    // TODO: aria-label should be translated by i18n
    "aria-label": "Previous month",
    className: backwardClass,
    onClick: disabledBackward ? undefined : onMoveBackward,
    icon: /*#__PURE__*/React.createElement(PagePreviousIcon, null)
  })), /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
    "aria-label": "Select month",
    id: targetId ? targetId + "-grid-label" : undefined,
    className: dateTitleClasses,
    onClick: onToggleMonthDropdown
  }), renderTitle()), /*#__PURE__*/React.createElement(IconButton, _extends({}, btnProps, {
    "aria-label": "Next month",
    className: forwardClass,
    onClick: disabledForward ? undefined : onMoveForward,
    icon: /*#__PURE__*/React.createElement(PageNextIcon, null)
  })));
  var hasMonth = showDate || showMonth;
  var classes = merge(className, withClassPrefix({
    'has-month': hasMonth,
    'has-time': showTime
  }));

  // If the date is not selected, the time cannot be selected (it only works in DateRangePicker).
  var disableSelectTime = typeof isSelectedIdle === 'undefined' ? false : !isSelectedIdle;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), hasMonth && monthToolbar, showTime && /*#__PURE__*/React.createElement("div", {
    className: prefix('time-toolbar')
  }, /*#__PURE__*/React.createElement(Button, _extends({}, btnProps, {
    "aria-label": "Select time",
    className: timeTitleClasses,
    onClick: onToggleTimeDropdown,
    disabled: disableSelectTime
  }), date && /*#__PURE__*/React.createElement(FormattedDate, {
    date: date,
    formatStr: timeFormat
  }))), renderToolbar === null || renderToolbar === void 0 ? void 0 : renderToolbar(date));
});
CalendarHeader.displayName = 'CalendarHeader';
export default CalendarHeader;