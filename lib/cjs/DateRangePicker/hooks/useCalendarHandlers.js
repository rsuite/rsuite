'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useCalendarHandlers = useCalendarHandlers;
var _react = require("react");
var _hooks = require("../../internals/hooks");
var _date = require("../../internals/utils/date");
function useCalendarHandlers(_ref) {
  var index = _ref.index,
    calendarDateRange = _ref.calendarDateRange,
    onChangeCalendarMonth = _ref.onChangeCalendarMonth,
    onChangeCalendarTime = _ref.onChangeCalendarTime,
    onSelect = _ref.onSelect;
  var calendarDate = (0, _react.useMemo)(function () {
    return calendarDateRange[index];
  }, [calendarDateRange, index]);
  var handleSelect = (0, _hooks.useEventCallback)(function (date, event) {
    onSelect === null || onSelect === void 0 || onSelect(index, date, event);
  });
  var handleChangeMonth = (0, _hooks.useEventCallback)(function (nextPageDate) {
    onChangeCalendarMonth === null || onChangeCalendarMonth === void 0 || onChangeCalendarMonth(index, nextPageDate);
  });
  var handleChangeTime = (0, _hooks.useEventCallback)(function (nextPageDate) {
    onChangeCalendarTime === null || onChangeCalendarTime === void 0 || onChangeCalendarTime(index, nextPageDate);
  });
  var handleMoveForward = (0, _hooks.useEventCallback)(function () {
    onChangeCalendarMonth === null || onChangeCalendarMonth === void 0 || onChangeCalendarMonth(index, (0, _date.addMonths)(calendarDate, 1));
  });
  var handleMoveBackward = (0, _hooks.useEventCallback)(function () {
    onChangeCalendarMonth === null || onChangeCalendarMonth === void 0 || onChangeCalendarMonth(index, (0, _date.addMonths)(calendarDate, -1));
  });
  return {
    calendarDate: calendarDate,
    onSelect: handleSelect,
    onChangeMonth: handleChangeMonth,
    onChangeTime: handleChangeTime,
    onMoveForward: handleMoveForward,
    onMoveBackward: handleMoveBackward
  };
}
var _default = exports.default = useCalendarHandlers;