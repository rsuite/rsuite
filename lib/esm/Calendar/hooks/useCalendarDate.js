'use client';
import { useState, useCallback, useRef } from 'react';
import { useUpdateEffect } from "../../internals/hooks/index.js";
import { startOfToday } from "../../internals/utils/date/index.js";
export var useCalendarDate = function useCalendarDate(value, defaultDate) {
  var _ref;
  var valueRef = useRef(value);
  var _useState = useState((_ref = value !== null && value !== void 0 ? value : defaultDate) !== null && _ref !== void 0 ? _ref : startOfToday()),
    calendarDate = _useState[0],
    setValue = _useState[1];
  var setCalendarDate = useCallback(function (date) {
    if (date && (date === null || date === void 0 ? void 0 : date.valueOf()) !== (calendarDate === null || calendarDate === void 0 ? void 0 : calendarDate.valueOf())) {
      setValue(date);
    }
  }, [calendarDate]);
  var resetCalendarDate = useCallback(function (nextValue) {
    var _ref2, _nextValue;
    if (nextValue === void 0) {
      nextValue = value;
    }
    setValue((_ref2 = (_nextValue = nextValue) !== null && _nextValue !== void 0 ? _nextValue : defaultDate) !== null && _ref2 !== void 0 ? _ref2 : startOfToday());
  }, [defaultDate, value]);
  useUpdateEffect(function () {
    var _valueRef$current;
    if ((value === null || value === void 0 ? void 0 : value.valueOf()) !== ((_valueRef$current = valueRef.current) === null || _valueRef$current === void 0 ? void 0 : _valueRef$current.valueOf())) {
      var _ref3;
      setCalendarDate((_ref3 = value !== null && value !== void 0 ? value : defaultDate) !== null && _ref3 !== void 0 ? _ref3 : startOfToday());
      valueRef.current = value;
    }
  }, [value, defaultDate]);
  return {
    calendarDate: calendarDate,
    setCalendarDate: setCalendarDate,
    resetCalendarDate: resetCalendarDate
  };
};