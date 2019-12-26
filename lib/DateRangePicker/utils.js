"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getCalendarDate = getCalendarDate;
exports.TYPE = exports.setTimingMargin = void 0;

var _is_same_month = _interopRequireDefault(require("date-fns/is_same_month"));

var _add_months = _interopRequireDefault(require("date-fns/add_months"));

var _end_of_day = _interopRequireDefault(require("date-fns/end_of_day"));

var _start_of_day = _interopRequireDefault(require("date-fns/start_of_day"));

var setTimingMargin = function setTimingMargin(date, way) {
  if (way === void 0) {
    way = 'left';
  }

  return way === 'right' ? (0, _end_of_day.default)(date) : (0, _start_of_day.default)(date);
};

exports.setTimingMargin = setTimingMargin;

function getCalendarDate(value) {
  if (value === void 0) {
    value = [];
  }

  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    var sameMonth = (0, _is_same_month.default)(value[0], value[1]);
    return [value[0], sameMonth ? (0, _add_months.default)(value[1], 1) : value[1]];
  }

  return [new Date(), (0, _add_months.default)(new Date(), 1)];
}

var TYPE;
exports.TYPE = TYPE;

(function (TYPE) {
  TYPE["CALENDAR"] = "CALENDAR";
  TYPE["TOOLBAR_BUTTON_OK"] = "TOOLBAR_BUTTON_OK";
  TYPE["TOOLBAR_SHORTCUT"] = "TOOLBAR_SHORTCUT";
})(TYPE || (exports.TYPE = TYPE = {}));