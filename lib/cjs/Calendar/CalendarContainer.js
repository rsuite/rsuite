'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _MonthDropdown = _interopRequireDefault(require("./MonthDropdown"));
var _TimeDropdown = _interopRequireDefault(require("./TimeDropdown"));
var _CalendarBody = _interopRequireDefault(require("./CalendarBody"));
var _CalendarHeader = _interopRequireDefault(require("./CalendarHeader"));
var _hooks = require("../internals/hooks");
var _date = require("../internals/utils/date");
var _CalendarProvider = require("./CalendarProvider");
var _hooks2 = require("./hooks");
var _ArrowUp = _interopRequireDefault(require("@rsuite/icons/ArrowUp"));
var _excluded = ["as", "className", "classPrefix", "calendarDate", "dateRange", "disabledBackward", "defaultState", "disabledForward", "format", "hoverRangeValue", "inline", "isoWeek", "weekStart", "targetId", "limitEndYear", "limitStartYear", "locale", "monthDropdownProps", "showMeridiem", "showWeekNumbers", "cellClassName", "disabledDate", "onChangeMonth", "onChangeTime", "onMouseMove", "onMoveBackward", "onMoveForward", "onSelect", "onToggleMonthDropdown", "onToggleTimeDropdown", "renderCell", "renderCellOnPicker", "renderTitle", "renderToolbar"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var CalendarContainer = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar' : _props$classPrefix,
    calendarDateProp = props.calendarDate,
    dateRange = props.dateRange,
    disabledBackward = props.disabledBackward,
    defaultState = props.defaultState,
    disabledForward = props.disabledForward,
    format = props.format,
    hoverRangeValue = props.hoverRangeValue,
    inline = props.inline,
    _props$isoWeek = props.isoWeek,
    isoWeek = _props$isoWeek === void 0 ? false : _props$isoWeek,
    weekStart = props.weekStart,
    targetId = props.targetId,
    limitEndYear = props.limitEndYear,
    limitStartYear = props.limitStartYear,
    locale = props.locale,
    monthDropdownProps = props.monthDropdownProps,
    showMeridiem = props.showMeridiem,
    showWeekNumbers = props.showWeekNumbers,
    cellClassName = props.cellClassName,
    disabledDate = props.disabledDate,
    onChangeMonth = props.onChangeMonth,
    onChangeTime = props.onChangeTime,
    onMouseMove = props.onMouseMove,
    onMoveBackward = props.onMoveBackward,
    onMoveForward = props.onMoveForward,
    onSelect = props.onSelect,
    onToggleMonthDropdown = props.onToggleMonthDropdown,
    onToggleTimeDropdown = props.onToggleTimeDropdown,
    renderCell = props.renderCell,
    renderCellOnPicker = props.renderCellOnPicker,
    renderTitle = props.renderTitle,
    renderToolbar = props.renderToolbar,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var calendarDate = (0, _react.useMemo)(function () {
    return (0, _date.isValid)(calendarDateProp) ? calendarDateProp : (0, _date.startOfToday)();
  }, [calendarDateProp]);
  var _useCalendarState = (0, _hooks2.useCalendarState)({
      defaultState: defaultState,
      calendarDate: calendarDate,
      onMoveForward: onMoveForward,
      onMoveBackward: onMoveBackward,
      onToggleTimeDropdown: onToggleTimeDropdown,
      onToggleMonthDropdown: onToggleMonthDropdown
    }),
    calendarState = _useCalendarState.calendarState,
    reset = _useCalendarState.reset,
    handlers = _useCalendarState.handlers;
  var isDateDisabled = function isDateDisabled(date) {
    var _disabledDate;
    return (_disabledDate = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)) !== null && _disabledDate !== void 0 ? _disabledDate : false;
  };
  var isTimeDisabled = function isTimeDisabled(date) {
    return (0, _date.disableTime)(props, date);
  };
  var handleCloseDropdown = (0, _hooks.useEventCallback)(function () {
    return reset();
  });
  var _useDateMode = (0, _date.useDateMode)(format),
    mode = _useDateMode.mode,
    has = _useDateMode.has;
  var timeMode = calendarState === _hooks2.CalendarState.TIME || mode === _date.DateMode.Time;
  var monthMode = calendarState === _hooks2.CalendarState.MONTH || mode === _date.DateMode.Month;
  var inSameThisMonthDate = function inSameThisMonthDate(date) {
    return (0, _date.isSameMonth)(calendarDate, date);
  };
  var calendarClasses = merge(className, withClassPrefix({
    'time-view': timeMode,
    'month-view': monthMode,
    'only-time': mode === _date.DateMode.Time,
    'show-week-numbers': showWeekNumbers
  }));
  var timeDropdownProps = (0, _pick.default)(rest, _date.calendarOnlyProps);
  var handleChangeMonth = (0, _hooks.useEventCallback)(function (date, event) {
    reset();
    onChangeMonth === null || onChangeMonth === void 0 || onChangeMonth(date, event);
  });
  var contextValue = {
    date: calendarDate,
    dateRange: dateRange,
    format: format,
    hoverRangeValue: hoverRangeValue,
    inline: inline,
    isoWeek: isoWeek,
    weekStart: weekStart,
    targetId: targetId,
    locale: locale,
    showWeekNumbers: showWeekNumbers,
    monthDropdownProps: monthDropdownProps,
    cellClassName: cellClassName,
    disabledDate: isDateDisabled,
    inSameMonth: inSameThisMonthDate,
    onChangeMonth: handleChangeMonth,
    onChangeTime: onChangeTime,
    onMouseMove: onMouseMove,
    onSelect: onSelect,
    renderCell: renderCell,
    renderCellOnPicker: renderCellOnPicker
  };
  return /*#__PURE__*/_react.default.createElement(_CalendarProvider.CalendarProvider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    "data-testid": "calendar"
  }, (0, _date.omitHideDisabledProps)(rest), {
    className: calendarClasses,
    ref: ref
  }), mode !== _date.DateMode.Time && /*#__PURE__*/_react.default.createElement(_CalendarHeader.default, (0, _extends2.default)({}, handlers, {
    showMonth: has('month'),
    showDate: has('day'),
    showTime: has('time'),
    disabledTime: isTimeDisabled,
    renderTitle: renderTitle,
    renderToolbar: renderToolbar,
    disabledBackward: disabledBackward,
    disabledForward: disabledForward
  })), has('day') && /*#__PURE__*/_react.default.createElement(_CalendarBody.default, null), has('month') && /*#__PURE__*/_react.default.createElement(_MonthDropdown.default, {
    show: monthMode,
    limitEndYear: limitEndYear,
    limitStartYear: limitStartYear,
    disabledMonth: isDateDisabled
  }), has('time') && /*#__PURE__*/_react.default.createElement(_TimeDropdown.default, (0, _extends2.default)({}, timeDropdownProps, {
    show: timeMode,
    showMeridiem: showMeridiem
  })), (monthMode || timeMode) && has('day') && /*#__PURE__*/_react.default.createElement("button", {
    className: prefix('btn-close'),
    onClick: handleCloseDropdown,
    "aria-label": "Collapse " + (monthMode ? 'month' : 'time') + " view"
  }, /*#__PURE__*/_react.default.createElement(_ArrowUp.default, null))));
});
CalendarContainer.displayName = 'CalendarContainer';
var _default = exports.default = CalendarContainer;