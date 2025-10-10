'use client';
"use strict";

exports.__esModule = true;
exports.useDateMode = exports.DateMode = void 0;
var _react = require("react");
var _formatCheck = require("./formatCheck");
var DateMode = exports.DateMode = /*#__PURE__*/function (DateMode) {
  DateMode["Date"] = "date";
  DateMode["Month"] = "month";
  DateMode["Time"] = "time";
  DateMode["DateTime"] = "datetime";
  return DateMode;
}({});
/**
 * Custom hook to determine the date mode and check format parts.
 *
 * @param format - The format string.
 * @returns An object containing the resolved DateMode and a `has` method to check format parts.
 */
var useDateMode = exports.useDateMode = function useDateMode(format) {
  var mode = (0, _react.useMemo)(function () {
    if ((0, _formatCheck.shouldRenderDate)(format) && (0, _formatCheck.shouldRenderTime)(format)) {
      return DateMode.DateTime;
    }
    if ((0, _formatCheck.shouldOnlyRenderMonth)(format)) {
      return DateMode.Month;
    }
    if ((0, _formatCheck.shouldOnlyRenderTime)(format)) {
      return DateMode.Time;
    }
    if ((0, _formatCheck.shouldRenderDate)(format)) {
      return DateMode.Date;
    }
    return DateMode.Date; // Default fallback
  }, [format]);

  // Use useCallback to memoize the has method
  var has = (0, _react.useCallback)(function (part) {
    switch (part) {
      case 'year':
        return /[Yy]/.test(format);
      case 'month':
        return /[ML]/.test(format);
      case 'day':
        return /[Dd]/.test(format);
      case 'time':
        return /([Hhms])/.test(format);
      default:
        return false;
    }
  }, [format]);
  return {
    mode: mode,
    has: has
  };
};