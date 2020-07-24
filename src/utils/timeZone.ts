import { convertToLocalTime, convertToTimeZone } from 'date-fns-timezone';
import { format as dateFnsFormat } from './dateUtils';

export const toTimeZone = (date: Date, timeZone: string): Date => {
  if (!(date instanceof Date) || !timeZone) {
    return date;
  }
  return convertToTimeZone(date, { timeZone });
};

export const toLocalTimeZone = (date: Date, timeZone: string): Date => {
  if (!(date instanceof Date) || !timeZone) {
    return date;
  }
  return convertToLocalTime(date, { timeZone });
};

export const format = (date: Date, template: string, timeZone: string): string => {
  if (!template) {
    return '--';
  }
  if (!timeZone) {
    return dateFnsFormat(date, template);
  }

  return dateFnsFormat(toTimeZone(date, timeZone), template);
};

export function zonedDate(timeZone: string): Date {
  return toTimeZone(new Date(), timeZone);
}
