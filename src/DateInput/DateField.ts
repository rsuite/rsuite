import { useReducer } from 'react';
import type { Locale, Month } from 'date-fns';
import { isValid } from 'date-fns/isValid';
import { modifyDate } from './utils';

export const patternMap = {
  y: 'year',
  M: 'month',
  d: 'day',
  H: 'hour',
  h: 'hour',
  m: 'minute',
  s: 'second',
  a: 'meridiem'
};

export class DateField extends Object {
  format: string;
  patternArray: { pattern: string; key: string }[] = [];
  year: number | null = null;
  month: number | null = null;
  day: number | null = null;
  hour: number | null = null;
  minute: number | null = null;
  second: number | null = null;

  constructor(format: string, value?: Date | null) {
    super();
    this.format = format;

    const formatArray = format.match(new RegExp('([y|d|M|H|h|m|s|a])+', 'ig')) || [];

    this.patternArray = formatArray.map((pattern: string) => {
      return {
        pattern,
        key: patternMap[pattern[0]]
      };
    });

    if (value && isValid(value)) {
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.day = value.getDate();
      this.hour = value.getHours();
      this.minute = value.getMinutes();
      this.second = value.getSeconds();
    }
  }
}

/**
 * Pad a number with zeros to the left.
 */
function padNumber(number: number, length: number) {
  let numberString = String(number);

  if (numberString.length >= length) {
    return numberString;
  }

  const paddingCount = length - numberString.length;

  for (let i = 0; i < paddingCount; i++) {
    numberString = '0' + numberString;
  }

  return numberString;
}

interface Action {
  type: string;
  value: any;
}

export const useDateField = (format: string, localize: Locale['localize'], date?: Date | null) => {
  const [dateField, dispatch] = useReducer(
    (state: DateField, action: Action) => {
      switch (action.type) {
        case 'setYear':
          return { ...state, year: action.value };
        case 'setMonth':
          return { ...state, month: action.value };
        case 'setDay':
          return { ...state, day: action.value };
        case 'setHour':
          return { ...state, hour: action.value };
        case 'setMinute':
          return { ...state, minute: action.value };
        case 'setSecond':
          return { ...state, second: action.value };
        case 'setNewDate':
          return new DateField(format, action.value);
        default:
          return state;
      }
    },
    new DateField(format, date)
  );

  const toDateString = () => {
    let str = format;

    dateField.patternArray.forEach(item => {
      const { key, pattern } = item;
      const hour = dateField.hour;

      let value = dateField[key];

      if (value !== null) {
        if (pattern === 'MMM' && typeof value === 'number') {
          value = localize?.month((value - 1) as Month, { width: 'abbreviated' });
        } else if (pattern === 'MMMM' && typeof value === 'number') {
          value = localize?.month((value - 1) as Month, { width: 'wide' });
        } else if (pattern === 'aa') {
          if (typeof hour === 'number') {
            value = hour > 12 ? 'PM' : 'AM';
          } else {
            value = 'aa';
          }
        } else if (pattern === 'hh' && typeof value === 'number') {
          value = value === 0 ? 12 : value > 12 ? value - 12 : value;
        }
        if (typeof value === 'number') {
          value = padNumber(value, pattern.length);
        }

        if (typeof value !== 'undefined') {
          str = str.replace(pattern, value);
        }
      }
    });

    return str;
  };

  // Check if the field value is valid.
  const validFieldValue = (type: string, value: number | null) => {
    let isValid = true;

    format.match(new RegExp('([y|d|M|H|h|m|s])+', 'ig'))?.forEach((pattern: string) => {
      const key = patternMap[pattern[0]];
      const fieldValue = type === key ? value : dateField[key];

      if (fieldValue === null) {
        isValid = false;
        return;
      }
    });

    return isValid;
  };

  const isEmptyValue = (type?: string, value?: number | null) => {
    const checkValueArray = format
      .match(new RegExp('([y|d|M|H|h|m|s])+', 'ig'))
      ?.map((pattern: string) => {
        const key = patternMap[pattern[0]];
        const fieldValue = type === key ? value : dateField[key];

        return fieldValue !== null;
      });

    return checkValueArray?.every(item => item === false);
  };

  const toDate = (type?: string, value?: number | null): Date | null => {
    const { year, month, day, hour, minute, second } = dateField;
    const date = new Date(
      year || 0,
      typeof month === 'number' ? Math.max(month - 1, 0) : 0,
      // The default day is 1 when the value is null, otherwise it becomes the last day of the month.
      day || 1,
      hour || 0,
      minute || 0,
      second || 0
    );

    if (typeof type === 'undefined' || typeof value === 'undefined') {
      return date;
    }

    if (value === null || !validFieldValue(type, value)) {
      if (isEmptyValue(type, value)) {
        return null;
      }

      // Invalid Date
      return new Date('');
    } else if ((type === 'day' || type === 'month') && value === 0) {
      // Invalid Date. If the type is day and the value is 0, it is considered an invalid date.
      return new Date('');
    }

    if (type === 'meridiem' && typeof hour === 'number') {
      const newHour = hour > 12 ? hour - 12 : hour + 12;
      type = 'hour';
      value = newHour as number;
    }

    return modifyDate(date, type, value);
  };

  return {
    dateField,
    dispatch,
    toDate,
    toDateString,
    isEmptyValue
  };
};
