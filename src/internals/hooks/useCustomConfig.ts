import assign from 'lodash/assign';
import enGB from '../../locales/en_GB';
import { useContext, useCallback } from 'react';
import { CustomContext } from '@/internals/Provider/CustomContext';
import type { ReactSuiteComponents } from '@/internals/Provider/types';

type LocaleKey = keyof typeof enGB;

function getDefaultRTL() {
  return (
    typeof document !== 'undefined' && (document.body.getAttribute('dir') || document.dir) === 'rtl'
  );
}

/**
 * Maps a component name to its corresponding locale key
 * @param componentName - The name of the component
 * @returns The locale key for the component
 */
function getComponentLocaleKey(componentName: string): LocaleKey {
  // Define mappings for components that share locale keys
  const localeKeyMappings: Record<string, LocaleKey> = {
    // All picker components use the Combobox locale
    Cascader: 'Combobox',
    CheckTreePicker: 'Combobox',
    MultiCascader: 'Combobox',
    SelectPicker: 'Combobox',
    TreePicker: 'Combobox',
    CheckPicker: 'Combobox',
    // Time components use date components locales
    TimePicker: 'DatePicker',
    TimeRangePicker: 'DateRangePicker'
  };

  // Return the mapped locale key or the component name itself if no mapping exists
  return localeKeyMappings[componentName] || (componentName as LocaleKey);
}

/**
 * Read component defaults and provider configuration without loading date adapters
 * @param componentName - The name of the component
 * @param componentProps - The props of the component
 */
export function useCustomConfig<P = any>(
  componentName?: keyof ReactSuiteComponents,
  componentProps?: P
) {
  const {
    components = {},
    locale: globalLocale = enGB,
    rtl = getDefaultRTL(),
    classPrefix,
    toasters,
    disableRipple
  } = useContext(CustomContext);

  const { locale: componentLocale, ...restProps } = (componentProps as any) || {};
  const globalDefaultProps = componentName ? components[componentName]?.defaultProps : undefined;
  const defaultLocale = (globalDefaultProps as { locale?: Record<string, any> } | undefined)
    ?.locale;
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

      // Instance translations override component defaults, which override the provider locale.
      return assign(
        {},
        publicLocale,
        specificLocale,
        defaultLocale,
        componentLocale,
        overrideLocale
      );
    },
    [globalLocale, defaultLocale, componentLocale]
  );

  // restProps is new on every render. Merging directly also keeps old props out
  // of the closure shared with the stable getLocale callback.
  let propsWithDefaults: P = componentName ? assign({}, globalDefaultProps, restProps) : undefined;
  if (componentName) {
    const mergedProps = propsWithDefaults;
    const localeKey = getComponentLocaleKey(componentName);

    // If the default locale has the component name, then merge the locale.
    propsWithDefaults = Object.keys(enGB).includes(localeKey)
      ? { ...mergedProps, locale: getLocale(localeKey as LocaleKey) }
      : componentLocale
        ? { ...mergedProps, locale: assign({}, defaultLocale, componentLocale) }
        : mergedProps;
  }

  return {
    code,
    rtl,
    toasters,
    disableRipple,
    classPrefix,
    propsWithDefaults,
    getLocale
  };
}

export default useCustomConfig;
