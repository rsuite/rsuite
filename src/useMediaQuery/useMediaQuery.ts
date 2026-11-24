import canUseDOM from 'dom-lib/canUseDOM';
import { breakpointValues } from '@/internals/styled-system/breakpoints';
import { useSyncExternalStore, useMemo } from 'react';
import { createBreakpoints } from './breakpoints';
import type { Query } from './types';

// Create enhanced breakpoint system using shared breakpoint values
const breakpointSystem = createBreakpoints(breakpointValues);

// Create media query map that combines legacy breakpoints with enhanced conditions
const mediaQuerySizeMap = breakpointSystem.createMediaQueryMap();

/**
 * Create a MediaQueryList object or a mock for server-side rendering
 */
const matchMedia = (query: string) => {
  if (canUseDOM) {
    return window.matchMedia(query);
  }

  return {
    matches: false,
    media: query
  } as MediaQueryList;
};

/**
 * React hook that tracks state of a CSS media query
 * @version 5.48.0
 * @unstable Please note that this API is not stable and may change in the future.
 * @see https://rsuitejs.com/components/use-media-query
 * @param query - The media query string or array of query strings
 * @param enabled - Whether to enable the media query, defaults to true
 */
export function useMediaQuery(query: Query | Query[], enabled: boolean = true): boolean[] {
  const queryKey = JSON.stringify(Array.isArray(query) ? query : [query]);

  const store = useMemo(() => {
    const mediaQueries = (JSON.parse(queryKey) as Query[]).map(
      query => mediaQuerySizeMap[query] || query
    );
    const serverSnapshot = mediaQueries.map(() => false);
    let snapshot = serverSnapshot;

    return {
      subscribe: (callback: () => void) => {
        if (!enabled) {
          return () => {};
        }

        const list = mediaQueries.map(query => matchMedia(query));
        list.forEach(query => query.addEventListener('change', callback));

        return () => {
          list.forEach(query => query.removeEventListener('change', callback));
        };
      },
      getSnapshot: () => {
        if (!enabled) {
          return serverSnapshot;
        }

        const nextSnapshot = mediaQueries.map(query => matchMedia(query).matches);
        if (nextSnapshot.some((matches, index) => matches !== snapshot[index])) {
          snapshot = nextSnapshot;
        }

        return snapshot;
      },
      getServerSnapshot: () => serverSnapshot
    };
  }, [queryKey, enabled]);

  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

export default useMediaQuery;
