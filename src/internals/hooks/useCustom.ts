import { useContext, useCallback } from 'react';
import { format, parse, isValid } from '@/internals/utils/date';
import defaultLocale from '../../locales/default';
import { CustomContext, CustomValue, FormatDateOptions } from '../../CustomProvider/CustomProvider';

const mergeObject = (list: any[]) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

const getDefaultRTL = () =>
  typeof document !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl';

/**
 * A hook to get custom configuration of `<CustomProvider>`
 * @param keys
 */
export function useCustom<T = any>(keys?: string | string[], overrideLocale?): CustomValue<T> {
  const {
    locale = defaultLocale,
    rtl = getDefaultRTL(),
    formatDate,
    parseDate,
    toasters,
    disableRipple
  } = useContext(CustomContext);

  let componentLocale: T = {
    // Public part locale
    ...locale?.common,
    // Part of the locale of the component itself
    ...(typeof keys === 'string'
      ? locale?.[keys]
      : typeof keys === 'object'
      ? mergeObject(keys.map(key => locale?.[key]))
      : {})
  };

  // Component custom locale
  if (overrideLocale) {
    componentLocale = mergeObject([componentLocale, overrideLocale]);
  }

  const _formatDate = useCallback(
    (date: number | Date, formatStr: string, options?: FormatDateOptions) => {
      try {
        if (formatDate) {
          return formatDate(date, formatStr, options);
        }

        return format(isValid(date) ? date : new Date(), formatStr, {
          locale: locale?.Calendar?.dateLocale,
          ...options
        });
      } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error: Invalid date format', error);
        }

        return 'Error: Invalid date format';
      }
    },
    [formatDate, locale?.Calendar?.dateLocale]
  );

  const _parseDate = useCallback(
    (dateString: string, formatString: string, referenceDate?: Date | number, options?: any) => {
      if (parseDate) {
        return parseDate(dateString, formatString, referenceDate, options);
      }

      return parse(dateString, formatString, referenceDate || new Date(), {
        locale: locale?.Calendar?.dateLocale,
        ...options
      });
    },
    [parseDate, locale?.Calendar?.dateLocale]
  );

  return {
    locale: componentLocale,
    rtl,
    toasters,
    disableRipple,
    formatDate: _formatDate,
    parseDate: _parseDate
  };
}

export default useCustom;
