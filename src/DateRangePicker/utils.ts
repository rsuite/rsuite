import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import addMonths from 'date-fns/addMonths';
import isSameMonth from 'date-fns/isSameMonth';

import { ValueType } from './DateRangePicker.d';

import { legacyParse } from '@date-fns/upgrade/v2';

export const setTimingMargin = (date, way = 'left'): Date =>
  way === 'right' ? endOfDay(legacyParse(date)) : startOfDay(legacyParse(date));

export function getCalendarDate(value: any = []): ValueType {
  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    const sameMonth = isSameMonth(legacyParse(value[0]), legacyParse(value[1]));
    return [value[0], sameMonth ? addMonths(legacyParse(value[1]), 1) : value[1]];
  }
  return [new Date(), addMonths(legacyParse(new Date()), 1)];
}

export enum TYPE {
  CALENDAR = 'CALENDAR',
  TOOLBAR_BUTTON_OK = 'TOOLBAR_BUTTON_OK',
  TOOLBAR_SHORTCUT = 'TOOLBAR_SHORTCUT'
}
