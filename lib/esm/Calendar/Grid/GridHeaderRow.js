'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix"];
import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { getWeekKeys } from "../../internals/utils/date/index.js";
import { useClassNames } from "../../internals/hooks/index.js";
import { useCalendar } from "../hooks/index.js";
var GridHeaderRow = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    locale = _useCalendar.locale,
    showWeekNumbers = _useCalendar.showWeekNumbers,
    weekStart = _useCalendar.weekStart;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix('row', 'header-row'));
  var weeks = getWeekKeys(weekStart);
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "row"
  }, rest, {
    ref: ref,
    className: classes
  }), showWeekNumbers && /*#__PURE__*/React.createElement("div", {
    className: prefix('header-cell'),
    role: "columnheader"
  }), weeks.map(function (key) {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: prefix('header-cell'),
      role: "columnheader",
      "aria-label": upperFirst(key)
    }, /*#__PURE__*/React.createElement("span", {
      className: prefix('header-cell-content')
    }, locale === null || locale === void 0 ? void 0 : locale[key]));
  }));
});
GridHeaderRow.displayName = 'CalendarGridHeaderRow';
export default GridHeaderRow;