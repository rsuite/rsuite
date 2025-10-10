'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.getWeekStartDates = getWeekStartDates;
var _addDays = _interopRequireDefault(require("date-fns/addDays"));
var _startOfWeek = _interopRequireDefault(require("date-fns/startOfWeek"));
/**
 * Get the first days of weeks in a month。
 * @param firstDayOfMonth The first day of the month
 * @param options.weekStart the index of the first day of the week (0 - Sunday)
 * @param options.isoWeek Whether to use ISO week
 * @returns A list of first days of weeks in a month
 */
function getWeekStartDates(firstDayOfMonth, options) {
  var weekStart = options.weekStart,
    locale = options.locale;
  var firstDay = (0, _startOfWeek.default)(firstDayOfMonth, {
    weekStartsOn: weekStart,
    locale: locale
  });
  var days = [firstDay];
  for (var i = 1; i < 6; i++) {
    days.push((0, _addDays.default)(firstDay, i * 7));
  }
  return days;
}
var _default = exports.default = getWeekStartDates;