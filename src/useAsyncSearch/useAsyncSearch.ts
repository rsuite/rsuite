import { useEffect, useReducer, useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '@/internals/hooks/useIsomorphicLayoutEffect';
import type { UseAsyncSearchOptions, UseAsyncSearchReturn } from './types';

type Request<T> = {
  query: string;
  enabled: boolean;
  dependencies: readonly unknown[];
  revision: number;
  emptyItems: T[];
};

type Result<T> =
  | { request: Request<T>; status: 'pending' }
  | { request: Request<T>; status: 'success'; items: T[] }
  | { request: Request<T>; status: 'error'; error: Error };

/**
 * Search asynchronously with cancellation, loading and error feedback.
 * Requests follow query, enabled and dependencies; inline search functions are supported.
 * Search runs after a client commit and never during server rendering.
 */
export function useAsyncSearch<T>(options: UseAsyncSearchOptions<T>): UseAsyncSearchReturn<T> {
  const { query, search, enabled = true, dependencies = [] } = options;
  const [revision, reload] = useReducer((value: number) => value + 1, 0);
  const [storedRequest, setRequest] = useState<Request<T>>(() => ({
    query,
    enabled,
    dependencies: dependencies.slice(),
    revision,
    emptyItems: []
  }));
  const [result, setResult] = useState<Result<T> | null>(null);
  const searchRef = useRef(search);
  let request = storedRequest;

  // React discards this render and immediately retries with the new request.
  // State keeps request identity isolated from abandoned concurrent renders.
  if (
    request.query !== query ||
    request.enabled !== enabled ||
    request.revision !== revision ||
    request.dependencies.length !== dependencies.length ||
    dependencies.some((value, index) => !Object.is(value, request.dependencies[index]))
  ) {
    request = { query, enabled, dependencies: dependencies.slice(), revision, emptyItems: [] };
    setRequest(request);
  }

  useIsomorphicLayoutEffect(() => {
    searchRef.current = search;
  });

  useEffect(() => {
    if (!request.enabled) {
      setResult(null);
      return;
    }

    const controller = new AbortController();
    const runSearch = searchRef.current;
    // Activity can reconnect an unchanged request after its earlier effect was aborted.
    setResult({ request, status: 'pending' });
    Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) return;
        return runSearch({ query: request.query, signal: controller.signal });
      })
      .then(items => {
        if (controller.signal.aborted) return;
        if (!Array.isArray(items)) throw new TypeError('Search must return an array of results.');
        setResult({ request, status: 'success', items: items.slice() });
      })
      .catch(cause => {
        if (controller.signal.aborted) return;
        let error: Error;
        try {
          error = cause instanceof Error ? cause : new Error(String(cause));
        } catch {
          error = new Error('Search failed.');
        }
        setResult({ request, status: 'error', error });
      });

    return () => controller.abort();
  }, [request]);

  const current = result?.request === request ? result : null;
  if (!enabled)
    return { items: request.emptyItems, status: 'idle', loading: false, error: null, reload };
  if (current?.status === 'success') {
    return { items: current.items, status: 'success', loading: false, error: null, reload };
  }
  if (current?.status === 'error') {
    return {
      items: request.emptyItems,
      status: 'error',
      loading: false,
      error: current.error,
      reload
    };
  }
  return { items: request.emptyItems, status: 'pending', loading: true, error: null, reload };
}

export default useAsyncSearch;
