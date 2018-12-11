// @flow

import moment from 'moment';

type DisabledDateFunction = (
  /** Date used to determine if disabling is required. */
  date: moment$Moment,
  /** Date selected. */
  selectValue?: Array<moment$Moment>,
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
  startDate: string | moment$Moment,
  endDate: string | moment$Moment
): DisabledDateFunction {
  return (date: moment$Moment) => {
    if (date.isBefore(moment(startDate), 'd') || date.isAfter(moment(endDate), 'd')) {
      return true;
    }
    return false;
  };
}

/**
 Disable dates after the specified date.
 */
export function before(beforeDate?: string | moment$Moment): DisabledDateFunction {
  return (date: moment$Moment) => {
    if (date.isBefore(moment(beforeDate), 'd')) {
      return true;
    }
    return false;
  };
}

/**
Disable dates before the specified date.
 */
export function after(afterDate?: string | moment$Moment) {
  return (date: moment$Moment) => {
    if (date.isAfter(moment(afterDate), 'd')) {
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
