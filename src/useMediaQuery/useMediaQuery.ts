import { useSyncExternalStore, useCallback, useRef, useMemo } from 'react';
import canUseDOM from 'dom-lib/canUseDOM';

export const mediaQuerySizeMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1400px)'
};

/**
 * The type of the query parameter.
 */
export type Query = string | keyof typeof mediaQuerySizeMap;

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
 */
export function useMediaQuery(query: Query | Query[]): boolean[] {
  const queries = Array.isArray(query) ? query : [query];

  const mediaQueries = useMemo(
    () => queries.map(query => mediaQuerySizeMap[query] || query),
    [...queries]
  );

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
