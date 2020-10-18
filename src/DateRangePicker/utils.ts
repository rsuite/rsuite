import { toLocalTimeZone, toTimeZone, zonedDate } from '../utils/timeZone';
import { RangeType, ValueType } from './types';
import { TimeZone, DateUtils } from '../utils';

export const setTimingMargin = (date, way = 'left'): Date =>
  way === 'right' ? DateUtils.endOfDay(date) : DateUtils.startOfDay(date);

export const toLocalValue = (value: ValueType, timeZone: string): ValueType => {
  if (typeof value === 'undefined') {
    return value;
  }
  return (value ?? []).map(item => toLocalTimeZone(item, timeZone)) as ValueType;
};

export const toZonedValue = (value: ValueType, timeZone: string): ValueType => {
  if (typeof value === 'undefined') {
    return value;
  }
  return (value ?? []).map(item => toTimeZone(item, timeZone)) as ValueType;
};

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
    const sameMonth = DateUtils.isSameMonth(value[0], value[1]);
    return [value[0], sameMonth ? DateUtils.addMonths(value[1], 1) : value[1]];
  }

  const todayDate = zonedDate(timeZone);
  return [todayDate, DateUtils.addMonths(todayDate, 1)];
}

export const getDefaultRanges = (timeZone: string): RangeType[] => {
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

export const isSameValueType = (source: ValueType, dest: ValueType) =>
  source?.[0]?.valueOf() === dest?.[0]?.valueOf() &&
  source?.[1]?.valueOf() === dest?.[1]?.valueOf();

export const getMonthHoverRange = (date: Date): ValueType => [
  DateUtils.startOfMonth(date),
  DateUtils.endOfMonth(date)
];

export const getWeekHoverRange = (isoWeek: boolean, date: Date): ValueType => {
  if (isoWeek) {
    // set to the first day of this week according to ISO 8601, 12:00 am
    return [DateUtils.startOfISOWeek(date), DateUtils.endOfISOWeek(date)];
  }

  return [DateUtils.startOfWeek(date), DateUtils.endOfWeek(date)];
};
