'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "rows"];
import React from 'react';
import GridRow from "./GridRow.js";
import GridHeaderRow from "./GridHeaderRow.js";
import { useClassNames } from "../../internals/hooks/index.js";
import { useCalendar } from "../hooks/index.js";
var Grid = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    _props$rows = props.rows,
    rows = _props$rows === void 0 ? [] : _props$rows,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useCalendar = useCalendar(),
    targetId = _useCalendar.targetId;
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "grid",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/React.createElement(GridHeaderRow, null), rows.map(function (week, index) {
    return /*#__PURE__*/React.createElement(GridRow, {
      key: index,
      weekendDate: week,
      rowIndex: index + 1
    });
  }));
});
Grid.displayName = 'CalendarGrid';
export default Grid;