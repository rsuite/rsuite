import { useMemo } from 'react';
import useAsyncSearch from '../useAsyncSearch';
import useCustomConfig from '@/internals/hooks/useCustomConfig';
import { createLocaleFilter } from './createLocaleFilter';
import type { UseLocaleSearchOptions, UseLocaleSearchReturn } from './types';

export function useLocaleSearch<T>(options: UseLocaleSearchOptions<T>): UseLocaleSearchReturn<T> {
  const {
    items,
    query,
    getText,
    match = 'contains',
    locale,
    dependencies = [],
    enabled = true
  } = options;
  const { code } = useCustomConfig();
  const selectedLocale = locale ?? code ?? 'en-GB';
  const localeKey = JSON.stringify(
    typeof selectedLocale === 'string' ? [selectedLocale] : selectedLocale
  );
  const {
    usage = 'search',
    sensitivity = 'base',
    ignorePunctuation = false,
    localeMatcher,
    collation,
    numeric,
    caseFirst
  } = options.collatorOptions ?? {};
  const filter = useMemo(
    () =>
      createLocaleFilter(JSON.parse(localeKey), {
        usage,
        sensitivity,
        ignorePunctuation,
        localeMatcher,
        collation,
        numeric,
        caseFirst
      }),
    [localeKey, usage, sensitivity, ignorePunctuation, localeMatcher, collation, numeric, caseFirst]
  );
  return useAsyncSearch<T>({
    query,
    enabled,
    dependencies: [items, filter, match, ...dependencies],
    search: ({ query, signal }) => filter(items, query, getText, match, { signal })
  });
}

export default useLocaleSearch;
