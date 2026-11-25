import type { DependencyList } from 'react';
import type { UseAsyncSearchReturn } from '../useAsyncSearch';

export type LocaleSearchMatch = 'contains' | 'startsWith' | 'endsWith';

export interface UseLocaleSearchOptions<T> {
  items: readonly T[];
  query: string;
  /** Extract searchable text. Inline functions use the latest committed callback. */
  getText: (item: T) => string;
  match?: LocaleSearchMatch;
  /** Override CustomProvider's locale. */
  locale?: string | readonly string[];
  /** Compared by option values, so inline objects do not restart every render. */
  collatorOptions?: Intl.CollatorOptions;
  /** Values captured by getText that must restart an unchanged query. */
  dependencies?: DependencyList;
  enabled?: boolean;
}

export type UseLocaleSearchReturn<T> = UseAsyncSearchReturn<T>;
