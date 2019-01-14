// @flow

import dayjs from 'dayjs';

type DisabledDateFunction = (
  /** Date used to determine if disabling is required. */
  date: dayjs.Dayjs,
  /** Date selected. */
  selectValue?: Array<dayjs.Dayjs>,
  /**
   Whether to choose to finish now.
   If `false`, only the start date is selected, waiting for the selection end date.
   */
  selectedDone?: boolean,
  // Call the target of the `disabledDate` function
  target?: 'CALENDAR' | 'TOOLBAR_BUTTON_OK' | 'TOOLBAR_SHORTCUT'
) => boolean;

/**
Allow the maximum number of days specified, other dates are disabled.
 */
export function allowedMaxDays(days: number): DisabledDateFunction {
  return (date, selectValue, selectedDone, target) => {
    let beforeLimit = false;
    let afterLimit = false;

    if (selectValue && selectValue[0]) {
      const startDate = selectValue[0];

      beforeLimit = startDate
        .clone()
        .add(-days + 1, 'd')
        .isAfter(date, 'd');

      afterLimit = startDate
        .clone()
        .add(days - 1, 'd')
        .isBefore(date, 'd');
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
  return (date, selectValue, selectedDone, target) => {
    let beforeLimit = false;
    let afterLimit = false;

    if (selectValue && selectValue[0]) {
      const startDate = selectValue[0];

      beforeLimit = !startDate
        .clone()
        .add(-days + 1, 'd')
        .isSame(date, 'd');

      afterLimit = !startDate
        .clone()
        .add(days - 1, 'd')
        .isSame(date, 'd');
    }

    if (target === 'CALENDAR' && !selectedDone && (beforeLimit && afterLimit)) {
      return true;
    }

    return false;
  };
}

/**
 Allow specified date range, other dates are disabled.
 */
export function allowedRange(
  startDate: string | dayjs.Dayjs,
  endDate: string | dayjs.Dayjs
): DisabledDateFunction {
  return (date: dayjs.Dayjs) => {
    if (date.isBefore(dayjs(startDate), 'd') || date.isAfter(dayjs(endDate), 'd')) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates after the specified date.
 */
export function before(beforeDate?: string | dayjs.Dayjs): DisabledDateFunction {
  return (date: dayjs.Dayjs) => {
    if (date.isBefore(dayjs(beforeDate), 'd')) {
      return true;
    }
    return false;
  };
}

/**
Disable dates before the specified date.
 */
export function after(afterDate?: string | dayjs.Dayjs) {
  return (date: dayjs.Dayjs) => {
    if (date.isAfter(dayjs(afterDate), 'd')) {
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
export function combine(...args: any) {
  return (...disabledDateArgs: any) => {
    return args.reduce(
      (a: Function, b: Function) => a(...disabledDateArgs) || b(...disabledDateArgs)
    );
  };
}
