import { useCallback, useState } from 'react';
import { toTimeZone, zonedDate } from '../utils/timeZone';
import { ToolbarProps } from './Toolbar';
import { setTimingMargin } from '../DateRangePicker/utils';
import { subDays } from '../utils/dateUtils';
import { InnerRange, RangeType, ToolbarValue } from './types';
import { CalendarState } from '../Calendar';

export function getDefaultRanges(timeZone: string, date: Date | Date[]): InnerRange[] {
  const todayDate = zonedDate(timeZone);

  /**
   * Is Date[] type
   * If it is an array type, it returns the default shortcut key suitable for DateRangePicker Toolbar,
   * otherwise it returns the default shortcut key suitable for DatePicker Toolbar
   */
  const isRange = date instanceof Array;
  const rangeKeys = ['today', 'yesterday'];
  function rangeIterator(label: string) {
    const defaultRange = {
      today: isRange
        ? {
            value: [setTimingMargin(todayDate), setTimingMargin(todayDate, 'right')]
          }
        : {
            closeOverlay: true,
            value: todayDate
          },
      yesterday: isRange
        ? {
            value: [
              setTimingMargin(subDays(todayDate, 1)),
              setTimingMargin(subDays(todayDate, 1), 'right')
            ]
          }
        : {
            closeOverlay: true,
            value: subDays(todayDate, 1)
          },
      last7Days: {
        value: [setTimingMargin(subDays(todayDate, 6)), setTimingMargin(todayDate, 'right')]
      }
    };

    return {
      label,
      ...defaultRange[label]
    };
  }

  isRange && rangeKeys.push('last7Days');
  return rangeKeys.map(rangeIterator);
}

const generateRangesIterator = ({
  pageDate,
  timeZone
}: Pick<ToolbarProps, 'pageDate' | 'timeZone'>) => ({ value, ...rest }: RangeType): InnerRange => {
  value = typeof value === 'function' ? value(pageDate) : value;
  return {
    value:
      value instanceof Array
        ? (value.map(item => toTimeZone(item, timeZone)) as ToolbarValue)
        : toTimeZone(value, timeZone),
    ...rest
  };
};

/**
 * get Toolbar ranges from Toolbar props
 * @param ranges
 * @param timeZone
 * @param pageDate
 */
export const getRanges = ({
  ranges,
  timeZone,
  pageDate
}: Pick<ToolbarProps, 'ranges' | 'timeZone' | 'pageDate'>): InnerRange[] => {
  return typeof ranges === 'undefined'
    ? getDefaultRanges(timeZone, pageDate)
    : ranges.map(generateRangesIterator({ pageDate, timeZone }));
};

export const useCalendarState = () => {
  const [calendarState, setCalendarState] = useState<CalendarState>();

  const reset = useCallback(() => {
    setCalendarState(undefined);
  }, []);

  const openMonth = useCallback(() => {
    setCalendarState(CalendarState.DROP_MONTH);
  }, []);

  const openTime = useCallback(() => {
    setCalendarState(CalendarState.DROP_TIME);
  }, []);

  return {
    calendarState,
    reset,
    openMonth,
    openTime
  };
};
