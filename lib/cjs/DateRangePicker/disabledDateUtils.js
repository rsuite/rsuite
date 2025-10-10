'use client';
"use strict";

exports.__esModule = true;
exports.after = after;
exports.afterToday = afterToday;
exports.allowedDays = allowedDays;
exports.allowedMaxDays = allowedMaxDays;
exports.allowedRange = allowedRange;
exports.before = before;
exports.beforeToday = beforeToday;
exports.combine = combine;
var _utils = require("../internals/utils");
var DateUtils = _interopRequireWildcard(require("../internals/utils/date"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function isAfterDay(date1, date2) {
  return DateUtils.isAfter(new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()), new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
}
function isBeforeDay(date1, date2) {
  return DateUtils.isBefore(new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()), new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()));
}

/**
 Allow the maximum number of days specified, other dates are disabled.
 */
function allowedMaxDays(days) {
  return function (date, selectValue, selectedDone, target) {
    var beforeLimit = false;
    var afterLimit = false;
    if (selectValue !== null && selectValue !== void 0 && selectValue[0]) {
      var startDate = selectValue[0];
      beforeLimit = (0, _utils.composeFunctions)(function (f) {
        return DateUtils.addDays(f, -days + 1);
      }, function (f) {
        return isAfterDay(f, date);
      })(startDate);
      afterLimit = (0, _utils.composeFunctions)(function (f) {
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
function allowedDays(days) {
  return function (date, selectValue, selectedDone, target) {
    var beforeLimit = false;
    var afterLimit = false;
    if (selectValue !== null && selectValue !== void 0 && selectValue[0]) {
      var startDate = selectValue[0];
      beforeLimit = (0, _utils.composeFunctions)(function (f) {
        return DateUtils.addDays(f, -days + 1);
      }, function (f) {
        return !DateUtils.isSameDay(f, date);
      })(startDate);
      afterLimit = (0, _utils.composeFunctions)(function (f) {
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
function allowedRange(startDate, endDate) {
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
function before(beforeDate) {
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
function after(afterDate) {
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
function beforeToday() {
  return before();
}

/**
 Disable dates before today.
 */
function afterToday() {
  return after();
}

/**
 Used to combine multiple conditions.
 */
function combine() {
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