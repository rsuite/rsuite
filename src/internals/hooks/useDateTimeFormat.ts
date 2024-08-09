import { useCallback } from 'react';
import { getDate, intlFormat, format } from '@/internals/utils/date';
import useCustom from './useCustom';

export function useDateTimeFormat() {
  const { locale, intlDateTimeFormat, formatDate } = useCustom('Calendar');
  const safeFormat = formatDate || format;

  const {
    code = 'en-GB',
    formattedYearPattern = 'yyyy',
    formattedMonthPattern = 'MMM yyyy',
    formattedDayPattern = 'dd MMM yyyy'
  } = locale;

  const formatDay = useCallback(
    (date: Date): string => {
      return intlDateTimeFormat
        ? intlFormat(date, { day: 'numeric' }, { locale: code })
        : getDate(date).toString();
    },
    [intlDateTimeFormat, code]
  );

  const formatYear = useCallback(
    (date: Date): string => {
      return intlDateTimeFormat
        ? intlFormat(date, { year: 'numeric' }, { locale: code })
        : safeFormat(date, formattedYearPattern);
    },
    [intlDateTimeFormat, code, safeFormat, formattedYearPattern]
  );

  const formatMonth = useCallback(
    (date: Date): string => {
      return intlDateTimeFormat
        ? intlFormat(date, { month: 'numeric' }, { locale: code })
        : safeFormat(date, 'MM');
    },
    [code, intlDateTimeFormat, safeFormat]
  );

  const formatYearMonth = useCallback(
    (date: Date, options?: { onlyYear: boolean }): string => {
      const { onlyYear } = options || {};
      const formatStr = onlyYear ? formattedYearPattern : formattedMonthPattern;

      return intlDateTimeFormat
        ? intlFormat(date, onlyYear ? { year: 'numeric' } : { year: 'numeric', month: 'short' }, {
            locale: code
          })
        : safeFormat(date, formatStr);
    },
    [formattedYearPattern, formattedMonthPattern, intlDateTimeFormat, code, safeFormat]
  );

  const formatFullDate = useCallback(
    (date: Date): string => {
      return intlDateTimeFormat
        ? intlFormat(date, { year: 'numeric', month: 'short', day: 'numeric' }, { locale: code })
        : safeFormat(date, formattedDayPattern);
    },
    [safeFormat, intlDateTimeFormat, code, formattedDayPattern]
  );

  return {
    formatDay,
    formatMonth,
    formatYear,
    formatYearMonth,
    formatFullDate
  };
}

export default useDateTimeFormat;
