import { useContext } from 'react';
import defaultLocale from '../locales/default';
import { CustomContext, CustomValue } from '../CustomProvider/CustomProvider';

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
function useCustom<T = any>(keys: string | string[], overrideLocale?): CustomValue<T> {
  const { locale = defaultLocale, rtl = getDefaultRTL(), formatDate } =
    useContext(CustomContext) || {};

  const componentLocale: T =
    typeof keys === 'string' ? locale?.[keys] : mergeObject(keys.map(key => locale?.[key]));

  return {
    locale: overrideLocale || componentLocale,
    rtl,
    formatDate
  };
}

export default useCustom;
