'use client';
"use strict";

exports.__esModule = true;
exports.getMonthHoverRange = void 0;
exports.getSafeCalendarDate = getSafeCalendarDate;
exports.isSameRange = exports.getWeekHoverRange = void 0;
var _date = require("../internals/utils/date");
function getSafeCalendarDate(_ref) {
  var _value;
  var value = _ref.value,
    _ref$calendarKey = _ref.calendarKey,
    calendarKey = _ref$calendarKey === void 0 ? 'start' : _ref$calendarKey,
    allowSameMonth = _ref.allowSameMonth;
  // Update calendarDate if the value is not null
  value = (_value = value) !== null && _value !== void 0 ? _value : [];
  var gap = allowSameMonth ? 0 : 1;
  if (value[0] && value[1]) {
    var diffMonth = (0, _date.differenceInCalendarMonths)(value[1], value[0]);
    if (calendarKey === 'start') {
      return [value[0], diffMonth <= 0 ? (0, _date.copyTime)({
        from: value[1],
        to: (0, _date.addMonths)(value[0], gap)
      }) : value[1]];
    } else if (calendarKey === 'end') {
      return [diffMonth <= 0 ? (0, _date.copyTime)({
        from: value[0],
        to: (0, _date.addMonths)(value[1], -gap)
      }) : value[0], value[1]];
    }

    // If only the start date
  } else if (value[0]) {
    return [value[0], (0, _date.addMonths)(value[0], gap)];
  }
  var todayDate = (0, _date.startOfToday)();
  return [todayDate, (0, _date.addMonths)(todayDate, gap)];
}
var isSameRange = exports.isSameRange = function isSameRange(source, dest, format) {
  // If both are null, reguard as same
  if (null === source && null === dest) return true;
  // If only one is null, regard as different
  if (null === source || null === dest) return false;
  var result = (0, _date.isSameDay)(source[0], dest[0]) && (0, _date.isSameDay)(source[1], dest[1]);
  if ((0, _date.shouldRenderTime)(format)) {
    result && (result = (0, _date.isSameSecond)(source[0], dest[0]) && (0, _date.isSameSecond)(source[1], dest[1]));
  }
  return result;
};
var getMonthHoverRange = exports.getMonthHoverRange = function getMonthHoverRange(date) {
  return [(0, _date.startOfMonth)(date), (0, _date.endOfMonth)(date)];
};
var getWeekHoverRange = exports.getWeekHoverRange = function getWeekHoverRange(date, options) {
  var isoWeek = options.isoWeek,
    _options$weekStart = options.weekStart,
    weekStart = _options$weekStart === void 0 ? 0 : _options$weekStart,
    locale = options.locale;
  if (isoWeek) {
    // set to the first day of this week according to ISO 8601, 12:00 am
    return [(0, _date.startOfISOWeek)(date), (0, _date.endOfISOWeek)(date)];
  }
  return [(0, _date.startOfWeek)(date, {
    weekStartsOn: weekStart,
    locale: locale
  }), (0, _date.endOfWeek)(date, {
    weekStartsOn: weekStart,
    locale: locale
  })];
};