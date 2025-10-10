'use client';
import { useMemo } from 'react';
import { useEventCallback } from "../../internals/hooks/index.js";
import { addMonths } from "../../internals/utils/date/index.js";
export function useCalendarHandlers(_ref) {
  var index = _ref.index,
    calendarDateRange = _ref.calendarDateRange,
    onChangeCalendarMonth = _ref.onChangeCalendarMonth,
    onChangeCalendarTime = _ref.onChangeCalendarTime,
    onSelect = _ref.onSelect;
  var calendarDate = useMemo(function () {
    return calendarDateRange[index];
  }, [calendarDateRange, index]);
  var handleSelect = useEventCallback(function (date, event) {
    onSelect === null || onSelect === void 0 || onSelect(index, date, event);
  });
  var handleChangeMonth = useEventCallback(function (nextPageDate) {
    onChangeCalendarMonth === null || onChangeCalendarMonth === void 0 || onChangeCalendarMonth(index, nextPageDate);
  });
  var handleChangeTime = useEventCallback(function (nextPageDate) {
    onChangeCalendarTime === null || onChangeCalendarTime === void 0 || onChangeCalendarTime(index, nextPageDate);
  });
  var handleMoveForward = useEventCallback(function () {
    onChangeCalendarMonth === null || onChangeCalendarMonth === void 0 || onChangeCalendarMonth(index, addMonths(calendarDate, 1));
  });
  var handleMoveBackward = useEventCallback(function () {
    onChangeCalendarMonth === null || onChangeCalendarMonth === void 0 || onChangeCalendarMonth(index, addMonths(calendarDate, -1));
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
export default useCalendarHandlers;