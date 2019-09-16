import { startOfDay, endOfDay, addMonths, isSameMonth } from 'date-fns';
import { ValueType } from './DateRangePicker.d';

export const setTimingMargin = (date, way = 'left'): Date =>
  way === 'right' ? endOfDay(date) : startOfDay(date);

export function getCalendarDate(value: any = []): ValueType {
  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    let sameMonth = isSameMonth(value[0], value[1]);
    return [value[0], sameMonth ? addMonths(value[1], 1) : value[1]];
  }
  return [new Date(), addMonths(new Date(), 1)];
}

export enum TYPE {
  CALENDAR = 'CALENDAR',
  TOOLBAR_BUTTON_OK = 'TOOLBAR_BUTTON_OK',
  TOOLBAR_SHORTCUT = 'TOOLBAR_SHORTCUT'
}
