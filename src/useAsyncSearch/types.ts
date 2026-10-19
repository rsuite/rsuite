import type { DependencyList } from 'react';

export interface AsyncSearchContext {
  /** The query belonging to this request. */
  query: string;
  /** Aborted when this request is replaced, disabled or unmounted. */
  signal: AbortSignal;
}

export interface UseAsyncSearchOptions<T> {
  /** The controlled query. A changed query starts a new request. */
  query: string;
  /**
   * Return matching items. Inline functions are supported: changing this function
   * alone does not start a request. The next request uses the latest committed function.
   */
  search: (context: AsyncSearchContext) => readonly T[] | PromiseLike<readonly T[]>;
  /**
   * Additional values that restart the search when they change, compared with Object.is.
   * Include data sources, locale and other values read by search that affect its results.
   */
  dependencies?: DependencyList;
  /** Whether to search. Defaults to true. Disabling aborts work and clears results. */
  enabled?: boolean;
}

export type UseAsyncSearchReturn<T> = {
  /** Current results. Empty while pending, disabled or failed. Treat this array as immutable. */
  items: T[];
  /** Run the current query again using the latest search function. */
  reload: () => void;
} & (
  | { status: 'idle'; loading: false; error: null }
  | { status: 'pending'; loading: true; error: null }
  | { status: 'success'; loading: false; error: null }
  | { status: 'error'; loading: false; error: Error }
);
