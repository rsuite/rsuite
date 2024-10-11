import { useCallback } from 'react';
import { DATERANGE_DISABLED_TARGET as TARGET } from '@/internals/constants';
import { DisabledDateFunction, SelectedDatesState } from '../types';

interface UseDateDisabledProps {
  shouldDisableDate?: DisabledDateFunction;
  DEPRECATED_disabledDate?: DisabledDateFunction;
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
  const { shouldDisableDate, DEPRECATED_disabledDate } = props;

  const isDateDisabled = useCallback(
    (date: Date, options: DateDisabledOptions): boolean => {
      const { selectDate, selectedDone, target } = options;
      if (typeof shouldDisableDate === 'function') {
        return shouldDisableDate(date, selectDate, selectedDone, target);
      }
      if (typeof DEPRECATED_disabledDate === 'function') {
        return DEPRECATED_disabledDate(date, selectDate, selectedDone, target);
      }
      return false;
    },
    [shouldDisableDate, DEPRECATED_disabledDate]
  );

  if (shouldDisableDate || DEPRECATED_disabledDate) {
    return isDateDisabled;
  }

  return undefined;
}

export default useDateDisabled;
