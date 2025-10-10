'use client';
"use strict";

exports.__esModule = true;
exports.useCalendarState = exports.CalendarState = void 0;
var _react = require("react");
var _date = require("../../internals/utils/date");
var _hooks = require("../../internals/hooks");
var CalendarState = exports.CalendarState = /*#__PURE__*/function (CalendarState) {
  CalendarState["TIME"] = "TIME";
  CalendarState["MONTH"] = "MONTH";
  return CalendarState;
}({});
var useCalendarState = exports.useCalendarState = function useCalendarState(props) {
  var _useState = (0, _react.useState)(props.defaultState),
    calendarState = _useState[0],
    setCalendarState = _useState[1];
  var reset = (0, _hooks.useEventCallback)(function () {
    setCalendarState(undefined);
    if (calendarState === CalendarState.TIME) {
      var _props$onToggleTimeDr;
      (_props$onToggleTimeDr = props.onToggleTimeDropdown) === null || _props$onToggleTimeDr === void 0 || _props$onToggleTimeDr.call(props, false);
    } else if (calendarState === CalendarState.MONTH) {
      var _props$onToggleMonthD;
      (_props$onToggleMonthD = props.onToggleMonthDropdown) === null || _props$onToggleMonthD === void 0 || _props$onToggleMonthD.call(props, false);
    }
  });
  var onMoveForward = (0, _hooks.useEventCallback)(function () {
    var _props$onMoveForward;
    (_props$onMoveForward = props.onMoveForward) === null || _props$onMoveForward === void 0 || _props$onMoveForward.call(props, (0, _date.addMonths)(props.calendarDate, 1));
  });
  var onMoveBackward = (0, _hooks.useEventCallback)(function () {
    var _props$onMoveBackward;
    (_props$onMoveBackward = props.onMoveBackward) === null || _props$onMoveBackward === void 0 || _props$onMoveBackward.call(props, (0, _date.addMonths)(props.calendarDate, -1));
  });
  var onToggleTimeDropdown = (0, _hooks.useEventCallback)(function () {
    var _props$onToggleTimeDr2;
    if (calendarState === CalendarState.TIME) {
      setCalendarState(undefined);
    } else {
      setCalendarState(CalendarState.TIME);
    }
    (_props$onToggleTimeDr2 = props.onToggleTimeDropdown) === null || _props$onToggleTimeDr2 === void 0 || _props$onToggleTimeDr2.call(props, calendarState !== CalendarState.TIME);
  });
  var onToggleMonthDropdown = (0, _hooks.useEventCallback)(function () {
    var _props$onToggleMonthD2;
    if (calendarState === CalendarState.MONTH) {
      setCalendarState(undefined);
    } else {
      setCalendarState(CalendarState.MONTH);
    }
    (_props$onToggleMonthD2 = props.onToggleMonthDropdown) === null || _props$onToggleMonthD2 === void 0 || _props$onToggleMonthD2.call(props, calendarState !== CalendarState.MONTH);
  });
  var handlers = (0, _react.useMemo)(function () {
    return {
      onMoveForward: onMoveForward,
      onMoveBackward: onMoveBackward,
      onToggleTimeDropdown: onToggleTimeDropdown,
      onToggleMonthDropdown: onToggleMonthDropdown
    };
  }, [onMoveBackward, onMoveForward, onToggleMonthDropdown, onToggleTimeDropdown]);
  return {
    calendarState: calendarState,
    handlers: handlers,
    reset: reset
  };
};