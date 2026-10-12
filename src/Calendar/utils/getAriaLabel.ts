import { useCallback, useMemo } from 'react';
import { format as formatDate } from '@/internals/utils/date';
import type { PlainYearMonth } from '@/internals/utils/date/types';
import { useCustom } from '@/internals/hooks';
import { useCalendar } from '../hooks';
import { jalaliYearMonthToGregorianDate } from '@/internals/utils/date/jalali';

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

  const locale = useMemo(() => getLocale('Calendar', overrideLocale), [getLocale, overrideLocale]);

  const { formattedMonthPattern } = locale;
  const isJalali = locale?.calendarSystem === 'jalali';

  return useCallback(
    (month: PlainYearMonth) => {
      const date = isJalali
        ? jalaliYearMonthToGregorianDate(month)
        : new Date(month.year, month.month - 1, 1);
      return formatDate(date, formattedMonthPattern);
    },
    [formatDate, formattedMonthPattern, isJalali]
  );
}
