import pick from 'lodash/pick';
import omitBy from 'lodash/omitBy';
import getHours from 'date-fns/getHours';
import setHours from 'date-fns/setHours';
import getDay from 'date-fns/getDay';
import getMinutes from 'date-fns/getMinutes';
import getSeconds from 'date-fns/getSeconds';
import addDays from 'date-fns/addDays';
import set from 'date-fns/set';
import isValid from 'date-fns/isValid';

export { default as addDays } from 'date-fns/addDays';
export { default as addMonths } from 'date-fns/addMonths';
export { default as addYears } from 'date-fns/addYears';
export { default as addSeconds } from 'date-fns/addSeconds';
export { default as addMinutes } from 'date-fns/addMinutes';
export { default as addHours } from 'date-fns/addHours';
export { default as compareAsc } from 'date-fns/compareAsc';
export { default as endOfDay } from 'date-fns/endOfDay';
export { default as endOfISOWeek } from 'date-fns/endOfISOWeek';
export { default as endOfMonth } from 'date-fns/endOfMonth';
export { default as endOfWeek } from 'date-fns/endOfWeek';
export { default as format } from 'date-fns/format';
export { default as getDate } from 'date-fns/getDate';
export { default as getDay } from 'date-fns/getDay';
export { default as getDaysInMonth } from 'date-fns/getDaysInMonth';
export { default as getHours } from 'date-fns/getHours';
export { default as getMinutes } from 'date-fns/getMinutes';
export { default as getMonth } from 'date-fns/getMonth';
export { default as getSeconds } from 'date-fns/getSeconds';
export { default as getYear } from 'date-fns/getYear';
export { default as isAfter } from 'date-fns/isAfter';
export { default as isBefore } from 'date-fns/isBefore';
export { default as isEqual } from 'date-fns/isEqual';
export { default as isSameDay } from 'date-fns/isSameDay';
export { default as isSameMonth } from 'date-fns/isSameMonth';
export { default as isSameSecond } from 'date-fns/isSameSecond';
export { default as parse } from 'date-fns/parse';
export { default as parseISO } from 'date-fns/parseISO';
export { default as setDate } from 'date-fns/setDate';
export { default as setHours } from 'date-fns/setHours';
export { default as setMinutes } from 'date-fns/setMinutes';
export { default as setMonth } from 'date-fns/setMonth';
export { default as setSeconds } from 'date-fns/setSeconds';
export { default as setYear } from 'date-fns/setYear';
export { default as startOfDay } from 'date-fns/startOfDay';
export { default as startOfISOWeek } from 'date-fns/startOfISOWeek';
export { default as startOfMonth } from 'date-fns/startOfMonth';
export { default as startOfWeek } from 'date-fns/startOfWeek';
export { default as subDays } from 'date-fns/subDays';
export { default as isMatch } from 'date-fns/isMatch';
export { default as isValid } from 'date-fns/isValid';
export { default as set } from 'date-fns/set';
export { default as differenceInCalendarMonths } from 'date-fns/differenceInCalendarMonths';
export { default as isLastDayOfMonth } from 'date-fns/isLastDayOfMonth';
export { default as lastDayOfMonth } from 'date-fns/lastDayOfMonth';

enum TimeProp {
  // @deprecated
  DisabledHours = 'disabledHours',
  // @deprecated
  DisabledMinutes = 'disabledMinutes',
  // @deprecated
  DisabledSeconds = 'disabledSeconds',
  ShouldDisableHour = 'shouldDisableHour',
  ShouldDisableMinute = 'shouldDisableMinute',
  ShouldDisableSecond = 'shouldDisableSecond',
  HideHours = 'hideHours',
  HideMinutes = 'hideMinutes',
  HideSeconds = 'hideSeconds'
}

export type CalendarOnlyPropsType = TimeProp;
export const calendarOnlyProps = [
  TimeProp.DisabledHours,
  TimeProp.DisabledMinutes,
  TimeProp.DisabledSeconds,
  TimeProp.HideHours,
  TimeProp.HideMinutes,
  TimeProp.HideSeconds
] as const;

const HOURS_PATTERN = /(Hours?)/;
const MINUTES_PATTERN = /(Minutes?)/;
const SECONDS_PATTERN = /(Seconds?)/;

interface CalendarProps {
  [TimeProp.DisabledHours]?: (hours: number, date: Date) => boolean;
  [TimeProp.DisabledMinutes]?: (minutes: number, date: Date) => boolean;
  [TimeProp.DisabledSeconds]?: (seconds: number, date: Date) => boolean;
  [TimeProp.HideHours]?: (hours: number, date: Date) => boolean;
  [TimeProp.HideMinutes]?: (minutes: number, date: Date) => boolean;
  [TimeProp.HideSeconds]?: (seconds: number, date: Date) => boolean;
}

/**
 * Verify that the time is valid.
 *
 * @param props - The calendar props.
 * @param date - The date to check.
 * @returns Whether the time is disabled.
 */
export function disableTime(props: CalendarProps, date: Date): boolean {
  if (!date) {
    return false;
  }
  const disabledTimeProps = [
    TimeProp.DisabledHours,
    TimeProp.DisabledMinutes,
    TimeProp.DisabledSeconds,
    TimeProp.ShouldDisableHour,
    TimeProp.ShouldDisableMinute,
    TimeProp.ShouldDisableSecond
  ] as const;

  const calendarProps = pick(props, disabledTimeProps);
  const mapProps = new Map(Object.entries(calendarProps));

  return Array.from(mapProps.keys()).some(key => {
    if (HOURS_PATTERN.test(key)) {
      return mapProps.get(key)?.(getHours(date), date);
    }
    if (MINUTES_PATTERN.test(key)) {
      return mapProps.get(key)?.(getMinutes(date), date);
    }
    if (SECONDS_PATTERN.test(key)) {
      return mapProps.get(key)?.(getSeconds(date), date);
    }
    return false;
  });
}

/**
 * Omit the calendar-only props from an object.
 *
 * @param props - The object to omit props from.
 * @returns The object with calendar-only props omitted.
 */
export const omitHideDisabledProps = <T extends Record<string, any>>(
  props: T
): Partial<Omit<T, CalendarOnlyPropsType>> =>
  omitBy<T>(
    props,
    (_val, key) =>
      key.startsWith('disabled') || key.startsWith('hide') || key.startsWith('shouldDisable')
  );

/**
 * Check if the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the time should be rendered.
 */
export const shouldRenderTime = (format: string): boolean => /([Hhms])/.test(format);

/**
 * Check if the month should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the month should be rendered.
 */
export const shouldRenderMonth = (format: string): boolean =>
  /[Yy]/.test(format) && /[ML]/.test(format);

/**
 * Check if the date should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether the date should be rendered.
 */
export const shouldRenderDate = (format: string): boolean =>
  /[Yy]/.test(format) && /[ML]/.test(format) && /[Dd]/.test(format);

/**
 * Check if only the time should be rendered based on the format.
 *
 * @param format - The format string.
 * @returns Whether only the time should be rendered.
 */
export const shouldOnlyRenderTime = (format: string): boolean =>
  /([Hhms])/.test(format) && !/([YyMDd])/.test(format);

/**
 * Get all weeks of a month.
 *
 * @param monthDate - The date of the month.
 * @param isoWeek - Whether to use ISO week numbering.
 * @returns An array of weeks in the month.
 */
export function getMonthView(monthDate: Date, isoWeek: boolean): Date[] {
  const firstDayOfMonth = getDay(monthDate);
  let distance = 0 - firstDayOfMonth;

  if (isoWeek) {
    distance = 1 - firstDayOfMonth;

    if (firstDayOfMonth === 0) {
      distance = -6;
    }
  }

  const firstWeekendDate = addDays(monthDate, distance);
  const weeks = [firstWeekendDate];
  let nextWeekendDate = addDays(firstWeekendDate, 7);

  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = addDays(nextWeekendDate, 7);
    weeks.push(nextWeekendDate);
  }

  return weeks;
}

/**
 * Copy the time from one date to another.
 *
 * @param from - The source date.
 * @param to - The target date.
 * @returns The target date with the time copied from the source date.
 */
export function copyTime({ from, to }: { from: Date; to: Date }): Date {
  if (!isValid(from) || !isValid(to)) {
    return to;
  }

  return set(to, {
    hours: getHours(from),
    minutes: getMinutes(from),
    seconds: getSeconds(from)
  });
}

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

/**
 * Get the time with AM and PM reversed.
 *
 * @param date - The date to reverse the time meridian.
 * @returns The date with the time meridian reversed.
 */
export const getReversedTimeMeridian = (date: Date): Date => {
  const clonedDate = new Date(date.valueOf());
  const hours = getHours(clonedDate);
  const nextHours = hours >= 12 ? hours - 12 : hours + 12;

  return setHours(clonedDate, nextHours);
};
