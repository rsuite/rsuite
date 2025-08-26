import type { PlainDate } from './types';

function toPlainDate(date: Date): PlainDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}

/**
 * Resembles the behavior of `Temporal.PlainDate.compare`.
 *
 * @see https://tc39.es/proposal-temporal/docs/plaindatetime.html#compare
 */
export function compare(date1: PlainDate, date2: PlainDate): -1 | 0 | 1 {
  if (date1.year < date2.year) return -1;
  if (date1.year > date2.year) return 1;
  if (date1.month < date2.month) return -1;
  if (date1.month > date2.month) return 1;
  if (date1.day < date2.day) return -1;
  if (date1.day > date2.day) return 1;
  return 0;
}

/**
 * Resembles the behavior of `Temporal.PlainDate.prototype.equals`.
 *
 * @see https://tc39.es/proposal-temporal/docs/plaindatetime.html#equals
 */
function equals(date1: PlainDate, date2: PlainDate): boolean {
  return compare(date1, date2) === 0;
}

export function isSameDay(date: PlainDate, jsDate: Date): boolean {
  // If jsDate is an invalid date, always return false
  if (Number.isNaN(jsDate.valueOf())) return false;

  return equals(date, toPlainDate(jsDate));
}

export function addDays(date: PlainDate, days: number): PlainDate {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  jsDate.setDate(jsDate.getDate() + days);
  return toPlainDate(jsDate);
}
