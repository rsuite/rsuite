"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getMonthView;

var _get_day = _interopRequireDefault(require("date-fns/get_day"));

var _add_days = _interopRequireDefault(require("date-fns/add_days"));

/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
function getMonthView(monthDate, isoWeek) {
  var firstDayOfMonth = (0, _get_day.default)(monthDate);
  var distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  var firstWeekendDate = (0, _add_days.default)(monthDate, distance);
  var weeks = [firstWeekendDate];
  var nextWeekendDate = (0, _add_days.default)(firstWeekendDate, 7);
  weeks.push(nextWeekendDate);

  while (weeks.length < 6) {
    nextWeekendDate = (0, _add_days.default)(nextWeekendDate, 7);
    weeks.push(nextWeekendDate);
  }

  return weeks;
}

module.exports = exports.default;