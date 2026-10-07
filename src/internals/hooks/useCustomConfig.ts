import assign from 'lodash/assign';
import enGB from '../../locales/en_GB';
import { useContext, useCallback, useMemo } from 'react';
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
    const localeKey = getComponentLocaleKey(componentName);

    // If the default locale has the component name, then merge the locale.
    if (Object.keys(enGB).includes(localeKey)) {
      return { ...mergedProps, locale: getLocale(localeKey as LocaleKey) };
    }
    return mergedProps;
  }, [componentName, components, getLocale, restProps]);

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
