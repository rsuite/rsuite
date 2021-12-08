import { DateRange, RangeType } from './types';
import { DateUtils } from '../utils';

export const setTimingMargin = (date, way = 'left'): Date =>
  way === 'right' ? DateUtils.endOfDay(date) : DateUtils.startOfDay(date);

export function getCalendarDate({
  value
}: {
  value: [] | [Date] | [Date, Date] | null;
}): DateRange {
  // Update calendarDate if the value is not null
  value = value ?? [];
  if (value[0] && value[1]) {
    const sameMonth = DateUtils.isSameMonth(value[0], value[1]);
    return [value[0], sameMonth ? DateUtils.addMonths(value[1], 1) : value[1]];

    // If only the start date
  } else if (value[0]) {
    return [value[0], DateUtils.addMonths(value[0], 1)];
  }

  const todayDate = new Date();
  return [todayDate, DateUtils.addMonths(todayDate, 1)];
}

export const getDefaultRanges = (): RangeType[] => {
  const todayDate = new Date();
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

export const isSameRange = (source: DateRange | null, dest: DateRange | null, format: string) => {
  // If both are null, reguard as same
  if (null === source && null === dest) return true;
  // If only one is null, regard as different
  if (null === source || null === dest) return false;

  let result = DateUtils.isSameDay(source[0], dest[0]) && DateUtils.isSameDay(source[1], dest[1]);

  if (DateUtils.shouldTime(format)) {
    result &&=
      DateUtils.isSameSecond(source[0], dest[0]) && DateUtils.isSameSecond(source[1], dest[1]);
  }

  return result;
};

export const getMonthHoverRange = (date: Date): DateRange => [
  DateUtils.startOfMonth(date),
  DateUtils.endOfMonth(date)
];

export const getWeekHoverRange = (isoWeek: boolean, date: Date): DateRange => {
  if (isoWeek) {
    // set to the first day of this week according to ISO 8601, 12:00 am
    return [DateUtils.startOfISOWeek(date), DateUtils.endOfISOWeek(date)];
  }

  return [DateUtils.startOfWeek(date), DateUtils.endOfWeek(date)];
};
