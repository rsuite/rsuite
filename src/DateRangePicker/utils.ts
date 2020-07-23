import { addMonths, endOfDay, isSameMonth, startOfDay } from '../utils/dateUtils';
import { ValueType } from './DateRangePicker.d';
import { toLocalTimeZone, zonedDate } from '../utils/timeZone';

export const setTimingMargin = (date, way = 'left'): Date =>
  way === 'right' ? endOfDay(date) : startOfDay(date);

export const toLocalValue = (value: ValueType, timeZone: string): ValueType =>
  value.map(item => toLocalTimeZone(item, timeZone)) as ValueType;

export function getCalendarDate({
  value,
  timeZone
}: {
  value?: ValueType;
  timeZone: string;
}): ValueType {
  // Update calendarDate if the value is not null
  value = value ?? [];
  if (value[0] && value[1]) {
    const sameMonth = isSameMonth(value[0], value[1]);
    return [value[0], sameMonth ? addMonths(value[1], 1) : value[1]];
  }
  const todayDate = zonedDate(timeZone);
  return [todayDate, addMonths(todayDate, 1)];
}
