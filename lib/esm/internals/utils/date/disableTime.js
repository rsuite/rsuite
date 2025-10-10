'use client';
import pick from 'lodash/pick';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import getSeconds from 'date-fns/getSeconds';
import { TimeProp } from "./types.js";
var HOURS_PATTERN = /(Hours?)/;
var MINUTES_PATTERN = /(Minutes?)/;
var SECONDS_PATTERN = /(Seconds?)/;

/**
 * Verify that the time is valid.
 *
 * @param props - The calendar props.
 * @param date - The date to check.
 * @returns Whether the time is disabled.
 */
export function disableTime(props, date) {
  if (!date) {
    return false;
  }
  var disabledTimeProps = [TimeProp.DisabledHours, TimeProp.DisabledMinutes, TimeProp.DisabledSeconds, TimeProp.ShouldDisableHour, TimeProp.ShouldDisableMinute, TimeProp.ShouldDisableSecond];
  var calendarProps = pick(props, disabledTimeProps);
  var mapProps = new Map(Object.entries(calendarProps));
  return Array.from(mapProps.keys()).some(function (key) {
    if (HOURS_PATTERN.test(key)) {
      var _mapProps$get;
      return (_mapProps$get = mapProps.get(key)) === null || _mapProps$get === void 0 ? void 0 : _mapProps$get(getHours(date), date);
    }
    if (MINUTES_PATTERN.test(key)) {
      var _mapProps$get2;
      return (_mapProps$get2 = mapProps.get(key)) === null || _mapProps$get2 === void 0 ? void 0 : _mapProps$get2(getMinutes(date), date);
    }
    if (SECONDS_PATTERN.test(key)) {
      var _mapProps$get3;
      return (_mapProps$get3 = mapProps.get(key)) === null || _mapProps$get3 === void 0 ? void 0 : _mapProps$get3(getSeconds(date), date);
    }
    return false;
  });
}
export default disableTime;