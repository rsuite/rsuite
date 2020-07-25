import { addDays, isAfter, isBefore, isSameDay } from 'date-fns';
import composeFunctions from '../utils/composeFunctions';
import { DisabledDateFunction } from './DateRangePicker.d';

function isAfterDay(date1: Date, date2: Date): boolean {
  return isAfter(
    new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()),
    new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  );
}

function isBeforeDay(date1: Date, date2: Date): boolean {
  return isBefore(
    new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()),
    new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  );
}

/**
Allow the maximum number of days specified, other dates are disabled.
 */
export function allowedMaxDays(days: number): DisabledDateFunction {
  return (date, selectValue, selectedDone, target): boolean => {
    let beforeLimit = false;
    let afterLimit = false;

    if (selectValue?.[0]) {
      const startDate = selectValue[0];

      beforeLimit = composeFunctions(
        f => addDays(f, -days + 1),
        f => isAfterDay(f, date)
      )(startDate);

      afterLimit = composeFunctions(
        f => addDays(f, days - 1),
        f => isBeforeDay(f, date)
      )(startDate);
    }

    if (target === 'CALENDAR' && !selectedDone && (beforeLimit || afterLimit)) {
      return true;
    }

    return false;
  };
}

/**
Only allowed days are specified, other dates are disabled.
 */
export function allowedDays(days: number): DisabledDateFunction {
  return (date, selectValue, selectedDone, target): boolean => {
    let beforeLimit = false;
    let afterLimit = false;

    if (selectValue?.[0]) {
      const startDate = selectValue[0];

      beforeLimit = composeFunctions(
        f => addDays(f, -days + 1),
        f => !isSameDay(f, date)
      )(startDate);

      afterLimit = composeFunctions(
        f => addDays(f, days - 1),
        f => !isSameDay(f, date)
      )(startDate);
    }

    if (target === 'CALENDAR' && !selectedDone && beforeLimit && afterLimit) {
      return true;
    }

    return false;
  };
}

/**
 Allow specified date range, other dates are disabled.
 */
export function allowedRange(
  startDate: string | Date,
  endDate: string | Date
): DisabledDateFunction {
  return (date: Date): boolean => {
    if (isBeforeDay(date, new Date(startDate)) || isAfterDay(date, new Date(endDate))) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates after the specified date.
 */
export function before(beforeDate: string | Date = new Date()): DisabledDateFunction {
  return (date: Date): boolean => {
    if (isBeforeDay(date, new Date(beforeDate))) {
      return true;
    }
    return false;
  };
}

/**
Disable dates before the specified date.
 */
export function after(afterDate: string | Date = new Date()): DisabledDateFunction {
  return (date: Date): boolean => {
    if (isAfterDay(date, new Date(afterDate))) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates after today.
 */
export function beforeToday(): DisabledDateFunction {
  return before();
}

/**
 Disable dates before today.
 */
export function afterToday(): DisabledDateFunction {
  return after();
}

/**
Used to combine multiple conditions.
 */
export function combine(...args: any): DisabledDateFunction {
  return (...disabledDateArgs: any): boolean => {
    return args.reduce(
      (a: Function, b: Function) => a(...disabledDateArgs) || b(...disabledDateArgs)
    );
  };
}
