import { useContext, useCallback, useMemo } from 'react';
import assign from 'lodash/assign';
import enGB from '../locales/en_GB';
import { format, parse, isValid } from '@/internals/utils/date';
import { CustomContext } from './CustomProvider';
import type { FormatDateOptions } from '@/internals/utils/date/types';
import type { ReactSuiteComponents } from './types';

type LocaleKey = keyof typeof enGB;

function getDefaultRTL() {
  return (
    typeof document !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl'
  );
}

function toLocaleKey(componentName: string): LocaleKey {
  const Picker = [
    'Cascader',
    'CheckTreePicker',
    'MultiCascader',
    'SelectPicker',
    'TreePicker',
    'CheckPicker',
    'CheckTreePicker'
  ];

  if (Picker.includes(componentName)) {
    return 'Combobox';
  }

  return componentName as LocaleKey;
}

/**
 * A hook to get custom configuration of `<CustomProvider>`
 * @param componentName - The name of the component
 * @param componentProps - The props of the component
 */
export function useCustom<P = any>(componentName?: keyof ReactSuiteComponents, componentProps?: P) {
  const {
    components = {},
    locale: globalLocale = enGB,
    rtl = getDefaultRTL(),
    formatDate,
    parseDate,
    classPrefix,
    toasters,
    disableRipple
  } = useContext(CustomContext);

  const { locale: componentLocale, ...restProps } = (componentProps as any) || {};
  const dateLocale = globalLocale?.DateTimeFormats?.dateLocale;
  const code = globalLocale?.code;

  const getLocale = useCallback(
    (key: LocaleKey | LocaleKey[], overrideLocale?: Record<string, any>) => {
      // Initialize with common locale
      const publicLocale = globalLocale?.common || {};

      // Merge component-specific locale(s) based on key type
      const specificLocale =
        typeof key === 'string'
          ? globalLocale?.[key]
          : Array.isArray(key)
            ? assign({}, ...key.map(k => globalLocale?.[k]))
            : {};

      // Merge all parts: public locale, specific locale, custom component locale
      return assign({}, publicLocale, specificLocale, componentLocale, overrideLocale);
    },
    [globalLocale, componentLocale]
  );

  const propsWithDefaults: P = useMemo(() => {
    if (!componentName) {
      return;
    }

    //Memoize the global default props based on component name
    const globalDefaultProps = components[componentName]?.defaultProps || {};
    const mergedProps = assign({}, globalDefaultProps, restProps);
    const localeKey = toLocaleKey(componentName);

    // If the default locale has the component name, then merge the locale.
    if (Object.keys(enGB).includes(localeKey)) {
      return { ...mergedProps, locale: getLocale(localeKey as LocaleKey) };
    }
    return mergedProps;
  }, [componentName, components, getLocale, restProps]);

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
    code,
    rtl,
    toasters,
    disableRipple,
    classPrefix,
    propsWithDefaults,
    getLocale,
    formatDate: _formatDate,
    parseDate: _parseDate
  };
}

export default useCustom;
