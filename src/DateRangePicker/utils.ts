import { DateRange } from './types';
import {
  addMonths,
  isSameDay,
  shouldRenderTime,
  isSameSecond,
  startOfMonth,
  endOfMonth,
  startOfISOWeek,
  endOfISOWeek,
  startOfWeek,
  endOfWeek,
  differenceInCalendarMonths,
  copyTime
} from '../utils/dateUtils';

export function getSafeCalendarDate({
  value,
  calendarKey = 'start'
}: {
  value: [] | [Date] | [Date, Date] | null;
  calendarKey?: 'start' | 'end';
}): DateRange {
  // Update calendarDate if the value is not null
  value = value ?? [];

  if (value[0] && value[1]) {
    const diffMonth = differenceInCalendarMonths(value[1], value[0]);

    if (calendarKey === 'start') {
      return [
        value[0],
        diffMonth <= 0 ? copyTime({ from: value[1], to: addMonths(value[0], 1) }) : value[1]
      ];
    } else if (calendarKey === 'end') {
      return [
        diffMonth <= 0 ? copyTime({ from: value[0], to: addMonths(value[1], -1) }) : value[0],
        value[1]
      ];
    }

    // If only the start date
  } else if (value[0]) {
    return [value[0], addMonths(value[0], 1)];
  }

  const todayDate = new Date();
  return [todayDate, addMonths(todayDate, 1)];
}

export const isSameRange = (source: DateRange | null, dest: DateRange | null, format: string) => {
  // If both are null, reguard as same
  if (null === source && null === dest) return true;
  // If only one is null, regard as different
  if (null === source || null === dest) return false;

  let result = isSameDay(source[0], dest[0]) && isSameDay(source[1], dest[1]);

  if (shouldRenderTime(format)) {
    result &&= isSameSecond(source[0], dest[0]) && isSameSecond(source[1], dest[1]);
  }

  return result;
};

export const getMonthHoverRange = (date: Date): DateRange => [startOfMonth(date), endOfMonth(date)];

export const getWeekHoverRange = (isoWeek: boolean, date: Date): DateRange => {
  if (isoWeek) {
    // set to the first day of this week according to ISO 8601, 12:00 am
    return [startOfISOWeek(date), endOfISOWeek(date)];
  }

  return [startOfWeek(date), endOfWeek(date)];
};
