'use client';
import { useMemo, useState } from 'react';
import { addMonths } from "../../internals/utils/date/index.js";
import { useEventCallback } from "../../internals/hooks/index.js";
export var CalendarState = /*#__PURE__*/function (CalendarState) {
  CalendarState["TIME"] = "TIME";
  CalendarState["MONTH"] = "MONTH";
  return CalendarState;
}({});
export var useCalendarState = function useCalendarState(props) {
  var _useState = useState(props.defaultState),
    calendarState = _useState[0],
    setCalendarState = _useState[1];
  var reset = useEventCallback(function () {
    setCalendarState(undefined);
    if (calendarState === CalendarState.TIME) {
      var _props$onToggleTimeDr;
      (_props$onToggleTimeDr = props.onToggleTimeDropdown) === null || _props$onToggleTimeDr === void 0 || _props$onToggleTimeDr.call(props, false);
    } else if (calendarState === CalendarState.MONTH) {
      var _props$onToggleMonthD;
      (_props$onToggleMonthD = props.onToggleMonthDropdown) === null || _props$onToggleMonthD === void 0 || _props$onToggleMonthD.call(props, false);
    }
  });
  var onMoveForward = useEventCallback(function () {
    var _props$onMoveForward;
    (_props$onMoveForward = props.onMoveForward) === null || _props$onMoveForward === void 0 || _props$onMoveForward.call(props, addMonths(props.calendarDate, 1));
  });
  var onMoveBackward = useEventCallback(function () {
    var _props$onMoveBackward;
    (_props$onMoveBackward = props.onMoveBackward) === null || _props$onMoveBackward === void 0 || _props$onMoveBackward.call(props, addMonths(props.calendarDate, -1));
  });
  var onToggleTimeDropdown = useEventCallback(function () {
    var _props$onToggleTimeDr2;
    if (calendarState === CalendarState.TIME) {
      setCalendarState(undefined);
    } else {
      setCalendarState(CalendarState.TIME);
    }
    (_props$onToggleTimeDr2 = props.onToggleTimeDropdown) === null || _props$onToggleTimeDr2 === void 0 || _props$onToggleTimeDr2.call(props, calendarState !== CalendarState.TIME);
  });
  var onToggleMonthDropdown = useEventCallback(function () {
    var _props$onToggleMonthD2;
    if (calendarState === CalendarState.MONTH) {
      setCalendarState(undefined);
    } else {
      setCalendarState(CalendarState.MONTH);
    }
    (_props$onToggleMonthD2 = props.onToggleMonthDropdown) === null || _props$onToggleMonthD2 === void 0 || _props$onToggleMonthD2.call(props, calendarState !== CalendarState.MONTH);
  });
  var handlers = useMemo(function () {
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