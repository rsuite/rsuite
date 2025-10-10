'use client';
import { useCallback } from 'react';
/**
 * Returns a function that determines whether a date is disabled and is compatible with the deprecated `disabledDate` prop.
 */
export function useDateDisabled(props) {
  var shouldDisableDate = props.shouldDisableDate,
    DEPRECATED_disabledDate = props.DEPRECATED_disabledDate;
  var isDateDisabled = useCallback(function (date, options) {
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
export default useDateDisabled;