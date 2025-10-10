'use client';
"use strict";

exports.__esModule = true;
exports.getClockTime = getClockTime;
var _date = require("../../../internals/utils/date");
/**
 * Convert the 24-hour clock to the 12-hour clock
 * @param hours
 */
function getMeridiemHours(hours) {
  return hours >= 12 ? hours - 12 : hours;
}
function getClockTime(props) {
  var format = props.format,
    date = props.date,
    showMeridiem = props.showMeridiem;
  var clockTime = {
    hours: null,
    minutes: null,
    seconds: null,
    meridiem: null
  };
  if (!format) {
    return clockTime;
  }

  // If date is provided, extract hours and meridiem
  if (/(H|h)/.test(format) && date) {
    var hours = (0, _date.getHours)(date);
    clockTime.hours = showMeridiem ? getMeridiemHours(hours) : hours;
    clockTime.meridiem = hours >= 12 ? 'PM' : 'AM';
  }
  // Extract minutes if 'm' is present in format and date is provided
  if (/m/.test(format) && date) {
    clockTime.minutes = (0, _date.getMinutes)(date);
  }
  // // Extract seconds if 's' is present in format and date is provided
  if (/s/.test(format) && date) {
    clockTime.seconds = (0, _date.getSeconds)(date);
  }
  return clockTime;
}