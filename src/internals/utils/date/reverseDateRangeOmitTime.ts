import { copyTime } from './copyTime';
/**
 * Swap two dates without swapping the time.
 *
 * @param dateRange - The date range to reverse.
 * @returns The reversed date range.
 */
export function reverseDateRangeOmitTime(dateRange: [Date, Date]): [Date, Date] {
  const [start, end] = dateRange;
  if (start && end) {
    return [copyTime({ from: start, to: end }), copyTime({ from: end, to: start })];
  }

  return dateRange;
}

export default reverseDateRangeOmitTime;
