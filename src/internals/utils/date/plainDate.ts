import type { PlainDate } from './types';

export function toPlainDate(date: Date): PlainDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}

export function comparePlainDates(date1: PlainDate, date2: PlainDate): -1 | 0 | 1 {
  if (date1.year < date2.year) return -1;
  if (date1.year > date2.year) return 1;
  if (date1.month < date2.month) return -1;
  if (date1.month > date2.month) return 1;
  if (date1.day < date2.day) return -1;
  if (date1.day > date2.day) return 1;
  return 0;
}
