import { useCallback, useMemo } from 'react';
import { format as formatDate } from '@/internals/utils/date';
import type { PlainYearMonth } from '@/internals/utils/date/types';
import { useCustom } from '@/internals/hooks';
import { useCalendar } from '../hooks';

/**
 * Get aria-label for the date.
 * @param date - The date.
 * @param formatStr - The format string.
 * @param format - The format function.
 */
export function getAriaLabel(
  date: Date,
  formatStr: string,
  format: (date: Date, formatStr: string) => string
) {
  return format ? format(date, formatStr) : formatDate(date, formatStr);
}

export function useGetAriaLabelForMonth(): (month: PlainYearMonth) => string {
  const { locale: overrideLocale } = useCalendar();
  const { getLocale, formatDate } = useCustom('Calendar');

  const { formattedMonthPattern } = useMemo(
    () => getLocale('Calendar', overrideLocale),
    [getLocale, overrideLocale]
  );

  return useCallback(
    (month: PlainYearMonth) =>
      formatDate(new Date(month.year, month.month - 1, 1), formattedMonthPattern),
    [formatDate, formattedMonthPattern]
  );
}
