'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "active", "disabled", "month", "year"];
import React, { useMemo } from 'react';
import { setMonth, setYear } from "../../internals/utils/date/index.js";
import { useClassNames, useEventCallback } from "../../internals/hooks/index.js";
import { composeFunctions } from "../../internals/utils/index.js";
import { useCustom } from "../../CustomProvider/index.js";
import { useCalendar } from "../hooks/index.js";
import { getAriaLabel } from "../utils/index.js";
var MonthDropdownItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-month-dropdown-cell' : _props$classPrefix,
    active = props.active,
    disabled = props.disabled,
    _props$month = props.month,
    month = _props$month === void 0 ? 0 : _props$month,
    year = props.year,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    date = _useCalendar.date,
    onSelect = _useCalendar.onChangeMonth,
    overrideLocale = _useCalendar.locale;
  var _useCustom = useCustom('Calendar'),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var _getLocale = getLocale('Calendar', overrideLocale),
    formatStr = _getLocale.formattedMonthPattern;
  var currentMonth = useMemo(function () {
    if (year && month) {
      return composeFunctions(function (d) {
        return setYear(d, year);
      }, function (d) {
        return setMonth(d, month - 1);
      })(date);
    }
    return date;
  }, [date, month, year]);
  var handleClick = useEventCallback(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(currentMonth, event);
  });
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active
  }), {
    disabled: disabled
  });
  var ariaLabel = currentMonth ? getAriaLabel(currentMonth, formatStr, formatDate) : '';
  return /*#__PURE__*/React.createElement(Component, _extends({
    key: month,
    role: "gridcell",
    "aria-selected": active,
    "aria-disabled": disabled,
    "aria-label": ariaLabel,
    tabIndex: active ? 0 : -1,
    ref: ref,
    className: classes,
    onClick: handleClick
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: prefix('content')
  }, formatDate(currentMonth, 'MMM')));
});
MonthDropdownItem.displayName = 'MonthDropdownItem';
export default MonthDropdownItem;