import { useCallback } from 'react';
import { DATERANGE_DISABLED_TARGET as TARGET } from '@/internals/constants';
import { DisabledDateFunction, SelectedDatesState } from '../types';

interface UseDateDisabledProps {
  shouldDisableDate?: DisabledDateFunction;
}

interface DateDisabledOptions {
  selectDate?: SelectedDatesState;
  selectedDone?: boolean;
  target?: TARGET;
}

/**
 * Returns a function that determines whether a date is disabled and is compatible with the deprecated `disabledDate` prop.
 */
export function useDateDisabled(props: UseDateDisabledProps) {
  const { shouldDisableDate } = props;

  const isDateDisabled = useCallback(
    (date: Date, options: DateDisabledOptions): boolean => {
      const { selectDate, selectedDone, target } = options;
      if (typeof shouldDisableDate === 'function') {
        return shouldDisableDate(date, selectDate, selectedDone, target);
      }
      return false;
    },
    [shouldDisableDate]
  );

  if (shouldDisableDate) {
    return isDateDisabled;
  }

  return undefined;
}

export default useDateDisabled;
