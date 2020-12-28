import { zonedTimeToUtc, utcToZonedTime, format as dateFnsTzFormat } from 'date-fns-tz';
import { format as dateFnsFormat } from './dateUtils';

export const toTimeZone = (date: Date, timeZone: string): Date => {
  if (!(date instanceof Date) || !timeZone) {
    return date;
  }
  return utcToZonedTime(date, timeZone);
};

export const toLocalTimeZone = (date: Date, timeZone: string): Date => {
  if (!(date instanceof Date) || !timeZone) {
    return date;
  }
  return zonedTimeToUtc(date, timeZone);
};

export const format = (date: Date, formatStr: string, timeZone: string): string => {
  if (timeZone) {
    return dateFnsTzFormat(date, formatStr, { timeZone });
  }

  return dateFnsFormat(date, formatStr);
};

export function zonedDate(timeZone: string): Date {
  return toTimeZone(new Date(), timeZone);
}
