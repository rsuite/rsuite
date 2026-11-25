import enGB from '../../locales/en_GB';
import { useContext, useCallback } from 'react';
import { format, parse, isValid } from '@/internals/utils/date';
import { CustomContext } from '@/internals/Provider/CustomContext';
import useCustomConfig from './useCustomConfig';
import type { FormatDateOptions } from '@/internals/utils/date/types';
import type { ReactSuiteComponents } from '@/internals/Provider/types';

/**
 * A hook to get custom configuration of `<CustomProvider>` and its date adapters.
 */
export function useCustom<P = any>(componentName?: keyof ReactSuiteComponents, componentProps?: P) {
  const config = useCustomConfig(componentName, componentProps);
  const { locale: globalLocale = enGB, formatDate, parseDate } = useContext(CustomContext);
  const dateLocale = globalLocale?.DateTimeFormats?.dateLocale;

  const _formatDate = useCallback(
    (date: number | Date, formatStr: string, options?: FormatDateOptions) => {
      try {
        if (formatDate) {
          return formatDate(date, formatStr, options);
        }

        return format(isValid(date) ? date : new Date(), formatStr, {
          locale: dateLocale,
          ...options
        });
      } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error: Invalid date format', error);
        }

        return 'Error: Invalid date format';
      }
    },
    [dateLocale, formatDate]
  );

  const _parseDate = useCallback(
    (dateString: string, formatString: string, referenceDate?: Date | number, options?: any) => {
      if (parseDate) {
        return parseDate(dateString, formatString, referenceDate, options);
      }

      return parse(dateString, formatString, referenceDate || new Date(), {
        locale: dateLocale,
        ...options
      });
    },
    [parseDate, dateLocale]
  );

  return {
    ...config,
    formatDate: _formatDate,
    parseDate: _parseDate
  };
}

export default useCustom;
