import { useCallback } from 'react';
import startCase from 'lodash/startCase';
import {
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  addSeconds,
  format
} from '../utils/dateUtils';
import { useDateFiled, patternMap } from './DateFiled';
import type { Locale } from 'date-fns';

interface DateInputState {
  formatStr: string;
  localize: Locale['localize'];
  date?: Date | null;
  isControlledDate?: boolean;
}

function useDateInputState({ formatStr, localize, date, isControlledDate }: DateInputState) {
  const { dateFiled, dispatch, toDateString, toDate } = useDateFiled(formatStr, localize, date);

  const setDateOffset = useCallback(
    (pattern: string, offset: number, callback?: (newDate: Date) => void) => {
      const currentDate = new Date();
      const year = dateFiled.year || currentDate.getFullYear();
      const month = dateFiled.month ? dateFiled.month - 1 : currentDate.getMonth();
      const day = dateFiled.day || 0;
      const hour = dateFiled.hour || 0;
      const minute = dateFiled.minute || 0;
      const second = dateFiled.second || 0;

      let actionName;
      let value;

      switch (pattern) {
        case 'y':
          actionName = 'setYear';
          value = addYears(new Date(year, 0), offset).getFullYear();
          break;
        case 'M':
          actionName = 'setMonth';
          value = addMonths(new Date(year, month), offset).getMonth() + 1;
          break;
        case 'd':
          actionName = 'setDay';
          value = addDays(new Date(year, month, day), offset).getDate();
          break;
        case 'H':
        case 'h':
          actionName = 'setHour';
          value = addHours(new Date(year, month, day, hour), offset).getHours();
          break;
        case 'm':
          actionName = 'setMinute';
          value = addMinutes(new Date(year, month, day, hour, minute), offset).getMinutes();
          break;
        case 's':
          actionName = 'setSecond';
          value = addSeconds(new Date(year, month, day, hour, minute, second), offset).getSeconds();
        case 'a':
          actionName = 'setMeridian';
          value = dateFiled.meridian === 'AM' ? 'PM' : 'AM';
          break;
      }

      if (actionName && value) {
        dispatch({ type: actionName, value });

        const field = patternMap[pattern];

        callback?.(toDate(field, value));
      }
    },
    [dateFiled, toDate, dispatch]
  );

  const setDateField = useCallback(
    (pattern: string, value: number | null, callback?: (newDate: Date) => void) => {
      const field = patternMap[pattern];
      const actionName = `set${startCase(field)}`;

      dispatch({ type: actionName, value });

      callback?.(toDate(field, value));
    },
    [toDate, dispatch]
  );

  const getDateField = useCallback(
    (pattern: string) => {
      const fieldName = patternMap[pattern];
      return {
        name: fieldName,
        value: dateFiled[fieldName]
      };
    },
    [dateFiled]
  );

  const toControlledDateString = useCallback(() => {
    return format(date || new Date(), formatStr);
  }, [date, formatStr]);

  return {
    dateFiled,
    setDateOffset,
    setDateField,
    getDateField,
    toDateString: isControlledDate ? toControlledDateString : toDateString
  };
}

export default useDateInputState;
