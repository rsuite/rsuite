'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _upperFirst = _interopRequireDefault(require("lodash/upperFirst"));
var _date = require("../../internals/utils/date");
var _hooks = require("../../internals/hooks");
var _hooks2 = require("../hooks");
var _excluded = ["as", "className", "classPrefix"];
var GridHeaderRow = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    locale = _useCalendar.locale,
    showWeekNumbers = _useCalendar.showWeekNumbers,
    weekStart = _useCalendar.weekStart;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, prefix('row', 'header-row'));
  var weeks = (0, _date.getWeekKeys)(weekStart);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "row"
  }, rest, {
    ref: ref,
    className: classes
  }), showWeekNumbers && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('header-cell'),
    role: "columnheader"
  }), weeks.map(function (key) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: key,
      className: prefix('header-cell'),
      role: "columnheader",
      "aria-label": (0, _upperFirst.default)(key)
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('header-cell-content')
    }, locale === null || locale === void 0 ? void 0 : locale[key]));
  }));
});
GridHeaderRow.displayName = 'CalendarGridHeaderRow';
var _default = exports.default = GridHeaderRow;