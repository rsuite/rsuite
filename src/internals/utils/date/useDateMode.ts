import { useMemo, useCallback } from 'react';
import {
  shouldRenderDate,
  shouldRenderTime,
  shouldOnlyRenderMonth,
  shouldOnlyRenderTime
} from './formatCheck';

export enum DateMode {
  Date = 'date',
  Month = 'month',
  Time = 'time',
  DateTime = 'datetime'
}

/**
 * Custom hook to determine the date mode and check format parts.
 *
 * @param format - The format string.
 * @returns An object containing the resolved DateMode and a `has` method to check format parts.
 */
export const useDateMode = (format: string) => {
  const mode = useMemo(() => {
    if (shouldRenderDate(format) && shouldRenderTime(format)) {
      return DateMode.DateTime;
    }

    if (shouldOnlyRenderMonth(format)) {
      return DateMode.Month;
    }

    if (shouldOnlyRenderTime(format)) {
      return DateMode.Time;
    }

    if (shouldRenderDate(format)) {
      return DateMode.Date;
    }

    return DateMode.Date; // Default fallback
  }, [format]);

  // Use useCallback to memoize the has method
  const has = useCallback(
    (part: 'year' | 'month' | 'day' | 'time'): boolean => {
      switch (part) {
        case 'year':
          return /[Yy]/.test(format);
        case 'month':
          return /[ML]/.test(format);
        case 'day':
          return /[Dd]/.test(format);
        case 'time':
          return /([Hhms])/.test(format);
        default:
          return false;
      }
    },
    [format]
  );

  return { mode, has };
};
