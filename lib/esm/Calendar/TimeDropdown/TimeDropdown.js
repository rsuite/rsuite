'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "show", "showMeridiem"];
import React, { useEffect, useRef } from 'react';
import partial from 'lodash/partial';
import camelCase from 'lodash/camelCase';
import isNumber from 'lodash/isNumber';
import { useClassNames, useEventCallback } from "../../internals/hooks/index.js";
import { startOfToday, getHours, setHours, setMinutes, setSeconds, omitHideDisabledProps } from "../../internals/utils/date/index.js";
import { useCalendar } from "../hooks/index.js";
import TimeColumn from "./TimeColumn.js";
import { getTimeLimits, getClockTime, scrollToTime, formatWithLeadingZero } from "./utils/index.js";
var TimeDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-time-dropdown' : _props$classPrefix,
    show = props.show,
    _props$showMeridiem = props.showMeridiem,
    showMeridiem = _props$showMeridiem === void 0 ? false : _props$showMeridiem,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    locale = _useCalendar.locale,
    format = _useCalendar.format,
    date = _useCalendar.date,
    onSelect = _useCalendar.onChangeTime,
    targetId = _useCalendar.targetId;
  var rowRef = useRef(null);
  useEffect(function () {
    var time = getClockTime({
      format: format,
      date: date,
      showMeridiem: showMeridiem
    });
    // The currently selected time scrolls to the visible range.
    if (show && rowRef.current) {
      scrollToTime(time, rowRef.current);
    }
  }, [date, format, show, showMeridiem]);
  var handleClick = useEventCallback(function (type, d, event) {
    var nextDate = date || startOfToday();
    switch (type) {
      case 'hours':
        nextDate = setHours(nextDate, showMeridiem && getHours(nextDate) >= 12 ? d + 12 : d);
        break;
      case 'minutes':
        nextDate = setMinutes(nextDate, d);
        break;
      case 'seconds':
        nextDate = setSeconds(nextDate, d);
        break;
    }
    onSelect === null || onSelect === void 0 || onSelect(nextDate, event);
  });
  var handleClickMeridiem = useEventCallback(function (meridiem, event) {
    var tempDate = date || startOfToday();
    var hours = getHours(tempDate);
    var isAM = hours < 12;
    var adjustHours = function adjustHours(meridiem, hours) {
      if (meridiem === 'AM') {
        return isAM ? hours : hours - 12;
      }
      return isAM ? hours + 12 : hours;
    };
    var nextHours = adjustHours(meridiem, hours);
    var nextDate = setHours(tempDate, nextHours);
    onSelect === null || onSelect === void 0 || onSelect(nextDate, event);
  });
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    rootPrefix = _useClassNames.rootPrefix,
    merge = _useClassNames.merge;
  var renderColumn = function renderColumn(type, value) {
    if (!isNumber(value)) {
      return null;
    }
    var _getTimeLimits$type = getTimeLimits(showMeridiem)[type],
      start = _getTimeLimits$type.start,
      end = _getTimeLimits$type.end;
    var items = [];
    var hideFunc = props[camelCase("hide_" + type)];
    var disabledFunc = props[camelCase("disabled_" + type)];
    for (var i = start; i <= end; i += 1) {
      if (!(hideFunc !== null && hideFunc !== void 0 && hideFunc(i, date))) {
        var disabled = disabledFunc === null || disabledFunc === void 0 ? void 0 : disabledFunc(i, date);
        var itemClasses = prefix('cell', {
          'cell-active': value === i,
          'cell-disabled': disabled
        });
        items.push(/*#__PURE__*/React.createElement("li", {
          key: i,
          role: "option",
          tabIndex: -1,
          "aria-label": i + " " + type,
          "aria-selected": value === i,
          "aria-disabled": disabled,
          "data-key": type + "-" + i,
          onClick: !disabled ? partial(handleClick, type, i) : undefined
        }, /*#__PURE__*/React.createElement("span", {
          className: itemClasses
        }, showMeridiem && type === 'hours' && i === 0 ? 12 : formatWithLeadingZero(i))));
      }
    }
    return /*#__PURE__*/React.createElement(TimeColumn, {
      prefix: prefix,
      title: locale === null || locale === void 0 ? void 0 : locale[type],
      "data-type": type,
      "aria-label": "Select " + type
    }, items);
  };
  var renderMeridiemColumn = function renderMeridiemColumn() {
    var columns = ['AM', 'PM'];
    return /*#__PURE__*/React.createElement(TimeColumn, {
      prefix: prefix,
      title: 'AM/PM',
      "data-type": "meridiem",
      "aria-label": "Select meridiem"
    }, columns.map(function (meridiem, index) {
      var ampm = date && (getHours(date) >= 12 ? 'PM' : 'AM');
      var itemClasses = prefix('cell', {
        'cell-active': ampm === meridiem
      });
      return /*#__PURE__*/React.createElement("li", {
        key: index,
        role: "option",
        tabIndex: -1,
        "aria-label": meridiem,
        "aria-selected": ampm === meridiem,
        "data-key": "meridiem-" + meridiem,
        onClick: partial(handleClickMeridiem, meridiem)
      }, /*#__PURE__*/React.createElement("span", {
        className: itemClasses
      }, meridiem));
    }));
  };
  var time = getClockTime({
    format: format,
    date: date,
    showMeridiem: showMeridiem
  });
  var classes = merge(className, rootPrefix(classPrefix), {
    show: show
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "group",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, omitHideDisabledProps(rest), {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('content')
  }, /*#__PURE__*/React.createElement("div", {
    className: prefix('row'),
    ref: rowRef
  }, renderColumn('hours', time.hours), renderColumn('minutes', time.minutes), renderColumn('seconds', time.seconds), showMeridiem && renderMeridiemColumn())));
});
TimeDropdown.displayName = 'TimeDropdown';
export default TimeDropdown;