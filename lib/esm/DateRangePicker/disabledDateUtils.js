'use client';
import { composeFunctions } from "../internals/utils/index.js";
import * as DateUtils from "../internals/utils/date/index.js";
function isAfterDay(date1, date2) {
  return DateUtils.isAfter(new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()), new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
}
function isBeforeDay(date1, date2) {
  return DateUtils.isBefore(new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()), new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
}

/**
 Allow the maximum number of days specified, other dates are disabled.
 */
export function allowedMaxDays(days) {
  return function (date, selectValue, selectedDone, target) {
    var beforeLimit = false;
    var afterLimit = false;
    if (selectValue !== null && selectValue !== void 0 && selectValue[0]) {
      var startDate = selectValue[0];
      beforeLimit = composeFunctions(function (f) {
        return DateUtils.addDays(f, -days + 1);
      }, function (f) {
        return isAfterDay(f, date);
      })(startDate);
      afterLimit = composeFunctions(function (f) {
        return DateUtils.addDays(f, days - 1);
      }, function (f) {
        return isBeforeDay(f, date);
      })(startDate);
    }
    if (target === 'CALENDAR' && !selectedDone && (beforeLimit || afterLimit)) {
      return true;
    }
    return false;
  };
}

/**
 * Only allowed days are specified, other dates are disabled.
 */
export function allowedDays(days) {
  return function (date, selectValue, selectedDone, target) {
    var beforeLimit = false;
    var afterLimit = false;
    if (selectValue !== null && selectValue !== void 0 && selectValue[0]) {
      var startDate = selectValue[0];
      beforeLimit = composeFunctions(function (f) {
        return DateUtils.addDays(f, -days + 1);
      }, function (f) {
        return !DateUtils.isSameDay(f, date);
      })(startDate);
      afterLimit = composeFunctions(function (f) {
        return DateUtils.addDays(f, days - 1);
      }, function (f) {
        return !DateUtils.isSameDay(f, date);
      })(startDate);
    }
    if (target === 'CALENDAR' && !selectedDone && beforeLimit && afterLimit) {
      return true;
    }
    return false;
  };
}

/**
 Allow specified date range, other dates are disabled.
 */
export function allowedRange(startDate, endDate) {
  return function (date) {
    if (isBeforeDay(date, new Date(startDate)) || isAfterDay(date, new Date(endDate))) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates after the specified date.
 */
export function before(beforeDate) {
  if (beforeDate === void 0) {
    beforeDate = new Date();
  }
  return function (date) {
    if (isBeforeDay(date, new Date(beforeDate))) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates before the specified date.
 */
export function after(afterDate) {
  if (afterDate === void 0) {
    afterDate = new Date();
  }
  return function (date) {
    if (isAfterDay(date, new Date(afterDate))) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates after today.
 */
export function beforeToday() {
  return before();
}

/**
 Disable dates before today.
 */
export function afterToday() {
  return after();
}

/**
 Used to combine multiple conditions.
 */
export function combine() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return function () {
    for (var _len2 = arguments.length, disabledDateArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      disabledDateArgs[_key2] = arguments[_key2];
    }
    return args.reduce(function (a, b) {
      return a.apply(void 0, disabledDateArgs) || b.apply(void 0, disabledDateArgs);
    });
  };
}