'use client';
export function getTimeLimits(isMeridiem) {
  var HOURS_24H = {
    start: 0,
    end: 23
  };
  var HOURS_12H = {
    start: 0,
    end: 11
  };
  var MINUTES_SECONDS = {
    start: 0,
    end: 59
  };
  return {
    hours: isMeridiem ? HOURS_12H : HOURS_24H,
    minutes: MINUTES_SECONDS,
    seconds: MINUTES_SECONDS
  };
}