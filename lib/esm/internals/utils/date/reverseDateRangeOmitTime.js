'use client';
import { copyTime } from "./copyTime.js";
/**
 * Swap two dates without swapping the time.
 *
 * @param dateRange - The date range to reverse.
 * @returns The reversed date range.
 */
export function reverseDateRangeOmitTime(dateRange) {
  var start = dateRange[0],
    end = dateRange[1];
  if (start && end) {
    return [copyTime({
      from: start,
      to: end
    }), copyTime({
      from: end,
      to: start
    })];
  }
  return dateRange;
}
export default reverseDateRangeOmitTime;