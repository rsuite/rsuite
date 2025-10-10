'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.reverseDateRangeOmitTime = reverseDateRangeOmitTime;
var _copyTime = require("./copyTime");
/**
 * Swap two dates without swapping the time.
 *
 * @param dateRange - The date range to reverse.
 * @returns The reversed date range.
 */
function reverseDateRangeOmitTime(dateRange) {
  var start = dateRange[0],
    end = dateRange[1];
  if (start && end) {
    return [(0, _copyTime.copyTime)({
      from: start,
      to: end
    }), (0, _copyTime.copyTime)({
      from: end,
      to: start
    })];
  }
  return dateRange;
}
var _default = exports.default = reverseDateRangeOmitTime;