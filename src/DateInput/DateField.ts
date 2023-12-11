import { useReducer } from 'react';
import { type Locale } from 'date-fns';
import { modifyDate } from './utils';

export const patternMap = {
  y: 'year',
  M: 'month',
  d: 'day',
  H: 'hour',
  h: 'hour',
  m: 'minute',
  s: 'second',
  a: 'meridian'
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
  meridian: 'AM' | 'PM' | null = null;

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

    if (value) {
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.day = value.getDate();
      this.hour = value.getHours();
      this.minute = value.getMinutes();
      this.second = value.getSeconds();
      this.meridian = value.getHours() > 12 ? 'PM' : 'AM';
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

export const useDateField = (format: string, localize: Locale['localize'], date?: Date | null) => {
  const [dateField, dispatch] = useReducer((state: DateField, action: any) => {
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
      case 'setMeridian':
        return { ...state, meridian: action.value };
      default:
        return state;
    }
  }, new DateField(format, date));

  const toDateString = () => {
    let str = format;
    dateField.patternArray.forEach(item => {
      const { key, pattern } = item;
      let value = dateField[key];

      if (value !== null) {
        if (pattern === 'MMM' && typeof value === 'number') {
          value = localize?.month(value - 1, { width: 'abbreviated' });
        } else if (pattern === 'MMMM' && typeof value === 'number') {
          value = localize?.month(value - 1, { width: 'wide' });
        } else if (pattern === 'aa' && typeof value === 'number') {
          value = value === 0 ? 'AM' : 'PM';
        } else if (pattern === 'hh' && typeof value === 'number') {
          value = value === 0 ? 12 : value > 12 ? value - 12 : value;
        }
        if (typeof value === 'number') {
          value = padNumber(value, pattern.length);
        }

        str = str.replace(pattern, value);
      }
    });

    return str;
  };

  const toDate = (type: string, value: number | null): Date => {
    if (value === null) {
      return new Date('');
    }

    return modifyDate(
      new Date(
        dateField.year,
        dateField.month ? dateField.month - 1 : 0,
        dateField.day,
        dateField.hour,
        dateField.minute,
        dateField.second
      ),
      type,
      value
    );
  };

  return {
    dateField,
    dispatch,
    toDate,
    toDateString
  };
};
