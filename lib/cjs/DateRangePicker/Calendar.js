'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _CalendarContainer = _interopRequireDefault(require("../Calendar/CalendarContainer"));
var _date = require("../internals/utils/date");
var _constants = require("../internals/constants");
var _hooks = require("./hooks");
var _excluded = ["as", "calendarDateRange", "format", "disabledDate", "index", "limitEndYear", "limitStartYear", "onChangeCalendarMonth", "onChangeCalendarTime", "onSelect", "renderTitle", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var Calendar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? _CalendarContainer.default : _props$as,
    _props$calendarDateRa = props.calendarDateRange,
    calendarDateRange = _props$calendarDateRa === void 0 ? [(0, _date.startOfToday)(), (0, _date.addMonths)((0, _date.startOfToday)(), 1)] : _props$calendarDateRa,
    _props$format = props.format,
    format = _props$format === void 0 ? 'yyyy-MM-dd' : _props$format,
    disabledDate = props.disabledDate,
    _props$index = props.index,
    index = _props$index === void 0 ? 0 : _props$index,
    limitEndYear = props.limitEndYear,
    limitStartYear = props.limitStartYear,
    onChangeCalendarMonth = props.onChangeCalendarMonth,
    onChangeCalendarTime = props.onChangeCalendarTime,
    onSelect = props.onSelect,
    renderTitle = props.renderTitle,
    _props$value = props.value,
    value = _props$value === void 0 ? [] : _props$value,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var calendarKey = index === 0 ? 'start' : 'end';
  var calendarHandlers = (0, _hooks.useCalendarHandlers)({
    index: index,
    calendarDateRange: calendarDateRange,
    onChangeCalendarMonth: onChangeCalendarMonth,
    onChangeCalendarTime: onChangeCalendarTime,
    onSelect: onSelect
  });
  var disableCalendarDate = (0, _react.useCallback)(function (date) {
    return disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date, value, _constants.DATERANGE_DISABLED_TARGET.CALENDAR);
  }, [disabledDate, value]);
  var handleRenderTitle = (0, _react.useCallback)(function (date) {
    return renderTitle === null || renderTitle === void 0 ? void 0 : renderTitle(date, calendarKey);
  }, [renderTitle, calendarKey]);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    "data-testid": "calendar-" + calendarKey
  }, rest, calendarHandlers, {
    index: index,
    format: format,
    dateRange: value,
    disabledDate: disableCalendarDate,
    limitEndYear: limitEndYear,
    limitStartYear: limitStartYear,
    ref: ref,
    renderTitle: handleRenderTitle
  }));
});
Calendar.displayName = 'DateRangePicker.Calendar';
var _default = exports.default = Calendar;