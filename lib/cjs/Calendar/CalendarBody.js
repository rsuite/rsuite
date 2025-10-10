'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Grid = _interopRequireDefault(require("./Grid"));
var _date = require("../internals/utils/date");
var _hooks = require("../internals/hooks");
var _hooks2 = require("./hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "classPrefix"];
var CalendarBody = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-body' : _props$classPrefix,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    _useCalendar$date = _useCalendar.date,
    date = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    overrideLocale = _useCalendar.locale,
    weekStart = _useCalendar.weekStart;
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var locale = getLocale('Calendar', overrideLocale);
  var thisMonthDate = (0, _date.setDate)(date, 1);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    rows: (0, _date.getWeekStartDates)(thisMonthDate, {
      weekStart: weekStart,
      locale: locale === null || locale === void 0 ? void 0 : locale.dateLocale
    }),
    "aria-label": formatDate(thisMonthDate, locale.formattedMonthPattern)
  }));
});
CalendarBody.displayName = 'CalendarBody';
var _default = exports.default = CalendarBody;