import canUseDOM from 'dom-lib/canUseDOM';
import { useSyncExternalStore, useCallback, useRef, useMemo } from 'react';
import { createBreakpoints } from './breakpoints';
import type { BreakpointMap, Query } from './types';

// Basic breakpoint values definition
const breakpointValues: BreakpointMap = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
  '2xl': '1400px'
};

// Create enhanced breakpoint system
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
  const queries = Array.isArray(query) ? query : [query];

  const mediaQueries = useMemo(
    () => queries.map(query => mediaQuerySizeMap[query] || query),
    [...queries]
  );

  // If not enabled, we don't need to set up any media queries
  if (!enabled) {
    return queries.map(() => false);
  }

  const mediaQueryArray = useRef<boolean[]>(mediaQueries.map(query => matchMedia(query).matches));

  const subscribe = useCallback(
    callback => {
      const list = mediaQueries.map(query => matchMedia(query));

      const handleChange = (event: MediaQueryListEvent) => {
        const index = list.findIndex(item => item.media === event.media);
        if (index !== -1) {
          // The store snapshot returned by getSnapshot must be immutable. So we need to create a new array.
          const nextMediaQueryArray = mediaQueryArray.current.slice();
          nextMediaQueryArray[index] = event.matches;

          mediaQueryArray.current = nextMediaQueryArray;
        }

        callback();
      };

      list.forEach(query => {
        query.addEventListener('change', handleChange);
      });

      return () => {
        list.forEach(query => {
          query.removeEventListener('change', handleChange);
        });
      };
    },
    [mediaQueries]
  );

  const getSnapshot = useCallback(() => {
    return mediaQueryArray.current;
  }, []);

  const getServerSnapshot = useCallback(() => {
    return mediaQueryArray.current;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useMediaQuery;
