/**
 * Utility functions for Jalali (Persian/Solar Hijri) calendar support.
 *
 * Uses `date-fns-jalali` which provides Jalali-aware versions of all date-fns functions.
 * All functions accept/return standard JavaScript `Date` objects (Gregorian internally),
 * but interpret year/month/day values using the Jalali calendar system.
 */

import {
  getYear as jalaliGetYear,
  getMonth as jalaliGetMonth,
  getDate as jalaliGetDate,
  getDaysInMonth as jalaliGetDaysInMonth,
  addMonths as jalaliAddMonths,
  startOfMonth as jalaliStartOfMonth,
  startOfWeek as jalaliStartOfWeek,
  set as jalaliSet,
  addDays as jalaliAddDays
} from 'date-fns-jalali';

import type { PlainDate, PlainYearMonth } from './types';
import { addDays } from './plainDate';

/**
 * Returns the Jalali year for a given Gregorian Date.
 */
export function getJalaliYear(date: Date): number {
  return jalaliGetYear(date);
}

/**
 * Returns the Jalali month (1-indexed) for a given Gregorian Date.
 */
export function getJalaliMonth(date: Date): number {
  return jalaliGetMonth(date) + 1;
}

/**
 * Returns the Jalali day of month for a given Gregorian Date.
 */
export function getJalaliDay(date: Date): number {
  return jalaliGetDate(date);
}

/**
 * Adds the specified number of Jalali months to a Gregorian Date.
 */
export function addJalaliMonths(date: Date, amount: number): Date {
  return jalaliAddMonths(date, amount);
}

/**
 * Returns a `PlainYearMonth` with Jalali year and month for the given Gregorian Date.
 */
export function getJalaliYearMonth(date: Date): PlainYearMonth {
  return {
    year: getJalaliYear(date),
    month: getJalaliMonth(date)
  };
}

/**
 * Converts a Jalali `PlainYearMonth` to the corresponding Gregorian `Date`
 * (first day of the Jalali month).
 */
export function jalaliYearMonthToGregorianDate(yearMonth: PlainYearMonth): Date {
  // Use date-fns-jalali's `set` to set Jalali year/month, then get start of Jalali month
  const dateInMonth = jalaliSet(new Date(), {
    year: yearMonth.year,
    month: yearMonth.month - 1, // 0-indexed
    date: 15 // Use the middle of the month to avoid edge cases
  });
  return jalaliStartOfMonth(dateInMonth);
}

/**
 * Iterates all days in a Jalali month and calls a predicate for each.
 * Returns `true` if the predicate returns `true` for every day.
 *
 * @param jalaliYearMonth - The Jalali year/month to iterate
 * @param predicate - Called with each Gregorian `PlainDate` in the Jalali month
 */
export function isEveryJalaliDayInMonth(
  jalaliYearMonth: PlainYearMonth,
  predicate: (date: PlainDate) => boolean
): boolean {
  const firstDayGreg = jalaliYearMonthToGregorianDate(jalaliYearMonth);
  const daysInMonth = jalaliGetDaysInMonth(firstDayGreg);

  for (let day = 0; day < daysInMonth; day++) {
    const gregorianDate = jalaliAddDays(firstDayGreg, day);
    const plainDate: PlainDate = {
      year: gregorianDate.getFullYear(),
      month: gregorianDate.getMonth() + 1,
      day: gregorianDate.getDate()
    };
    if (!predicate(plainDate)) {
      return false;
    }
  }

  return true;
}

/**
 * Generates the start-of-week `PlainDate` values (in Gregorian coordinates) for
 * a Jalali month view.
 *
 * @param jalaliYearMonth - The Jalali year and month to display
 * @param weekStart - The day the week starts on (0=Sunday … 6=Saturday). Defaults to 6 (Saturday) for Iran.
 * @returns An array of up to 6 `PlainDate` values (Gregorian) representing the
 *          start of each week row in the calendar grid.
 */
export function getJalaliWeekStartDates(
  jalaliYearMonth: PlainYearMonth,
  weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 6
): PlainDate[] {
  const firstDayGreg = jalaliYearMonthToGregorianDate(jalaliYearMonth);
  const firstWeekStartJs = jalaliStartOfWeek(firstDayGreg, { weekStartsOn: weekStart });

  const firstPlainDate: PlainDate = {
    year: firstWeekStartJs.getFullYear(),
    month: firstWeekStartJs.getMonth() + 1,
    day: firstWeekStartJs.getDate()
  };

  const dates: PlainDate[] = [firstPlainDate];
  for (let i = 1; i < 6; i++) {
    dates.push(addDays(firstPlainDate, i * 7));
  }
  return dates;
}
