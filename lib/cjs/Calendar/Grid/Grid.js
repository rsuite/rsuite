'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _GridRow = _interopRequireDefault(require("./GridRow"));
var _GridHeaderRow = _interopRequireDefault(require("./GridHeaderRow"));
var _hooks = require("../../internals/hooks");
var _hooks2 = require("../hooks");
var _excluded = ["as", "className", "classPrefix", "rows"];
var Grid = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    _props$rows = props.rows,
    rows = _props$rows === void 0 ? [] : _props$rows,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useCalendar = (0, _hooks2.useCalendar)(),
    targetId = _useCalendar.targetId;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "grid",
    tabIndex: -1,
    id: targetId ? targetId + "-" + classPrefix : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_GridHeaderRow.default, null), rows.map(function (week, index) {
    return /*#__PURE__*/_react.default.createElement(_GridRow.default, {
      key: index,
      weekendDate: week,
      rowIndex: index + 1
    });
  }));
});
Grid.displayName = 'CalendarGrid';
var _default = exports.default = Grid;