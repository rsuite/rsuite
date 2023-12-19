import { useContext, useCallback } from 'react';
import defaultLocale from '../locales/default';
import { CustomContext, CustomValue } from '../CustomProvider/CustomProvider';
import { format, parse, isValid } from '../utils/dateUtils';

const mergeObject = (list: any[]) =>
  list.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});

const getDefaultRTL = () =>
  typeof window !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl';

/**
 * A hook to get custom configuration of `<CustomProvider>`
 * @param keys
 */
function useCustom<T = any>(keys?: string | string[], overrideLocale?): CustomValue<T> {
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

  const defaultFormatDate = useCallback(
    (date: number | Date, formatStr: string) =>
      format(isValid(date) ? date : new Date(), formatStr, {
        locale: locale?.Calendar?.dateLocale
      }),
    [locale.Calendar?.dateLocale]
  );

  const defaultParseDate = useCallback(
    (dateString: string, formatString: string) =>
      parse(dateString, formatString, new Date(), { locale: locale?.Calendar?.dateLocale }),
    [locale.Calendar?.dateLocale]
  );

  return {
    locale: componentLocale,
    rtl,
    toasters,
    disableRipple,
    formatDate: formatDate || defaultFormatDate,
    parseDate: parseDate || defaultParseDate
  };
}

export default useCustom;
