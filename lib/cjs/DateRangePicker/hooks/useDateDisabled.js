'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useDateDisabled = useDateDisabled;
var _react = require("react");
/**
 * Returns a function that determines whether a date is disabled and is compatible with the deprecated `disabledDate` prop.
 */
function useDateDisabled(props) {
  var shouldDisableDate = props.shouldDisableDate,
    DEPRECATED_disabledDate = props.DEPRECATED_disabledDate;
  var isDateDisabled = (0, _react.useCallback)(function (date, options) {
    var selectDate = options.selectDate,
      selectedDone = options.selectedDone,
      target = options.target;
    if (typeof shouldDisableDate === 'function') {
      return shouldDisableDate(date, selectDate, selectedDone, target);
    }
    if (typeof DEPRECATED_disabledDate === 'function') {
      return DEPRECATED_disabledDate(date, selectDate, selectedDone, target);
    }
    return false;
  }, [shouldDisableDate, DEPRECATED_disabledDate]);
  if (shouldDisableDate || DEPRECATED_disabledDate) {
    return isDateDisabled;
  }
  return undefined;
}
var _default = exports.default = useDateDisabled;