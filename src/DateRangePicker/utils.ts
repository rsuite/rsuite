import { addMonths, endOfDay, isSameMonth, startOfDay } from '../utils/dateUtils';
import { ValueType } from './DateRangePicker';
import { toLocalTimeZone, toTimeZone, zonedDate } from '../utils/timeZone';
import { TimeZone, DateUtils } from '../utils';

export interface Range {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: ValueType | ((value?: ValueType) => ValueType);
}

export const setTimingMargin = (date, way = 'left'): Date =>
  way === 'right' ? endOfDay(date) : startOfDay(date);

export const toLocalValue = (value: ValueType, timeZone: string): ValueType =>
  (value ?? []).map(item => toLocalTimeZone(item, timeZone)) as ValueType;

export const toZonedValue = (value: ValueType, timeZone: string): ValueType =>
  (value ?? []).map(item => toTimeZone(item, timeZone)) as ValueType;

export function getCalendarDate({
  value,
  timeZone
}: {
  value?: ValueType;
  timeZone: string | undefined;
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

export const getDefaultRanges = (timeZone: string): Range[] => {
  const todayDate = TimeZone.zonedDate(timeZone);
  return [
    {
      label: 'today',
      value: [setTimingMargin(todayDate), setTimingMargin(todayDate, 'right')]
    },
    {
      label: 'yesterday',
      value: [
        setTimingMargin(DateUtils.addDays(todayDate, -1)),
        setTimingMargin(DateUtils.addDays(todayDate, -1), 'right')
      ]
    },
    {
      label: 'last7Days',
      value: [setTimingMargin(DateUtils.subDays(todayDate, 6)), setTimingMargin(todayDate, 'right')]
    }
  ];
};
