'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import canUseDOM from 'dom-lib/canUseDOM';
import pick from 'lodash/pick';
export var mediaQuerySizeMap = {
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

var matchMedia = function matchMedia(query) {
  if (canUseDOM) {
    return window.matchMedia(query);
  }
  return {
    matches: false,
    media: query
  };
};

/**
 * React hook that tracks state of a CSS media query.
 * @see https://rsuitejs.com/components/use-media-query
 */
export function useMediaQueryOld(query) {
  var queries = Array.isArray(query) ? query : [query];
  var mediaQueries = useMemo(function () {
    return queries.map(function (query) {
      return mediaQuerySizeMap[query] || query;
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [].concat(queries));
  var _useState = useState(function () {
      return mediaQueries.map(function (query) {
        return pick(matchMedia(query), ['matches', 'media']);
      });
    }),
    mediaQueryArray = _useState[0],
    setMediaQueryArray = _useState[1];
  function handleChange(event) {
    setMediaQueryArray(function (prevMediaQueryArray) {
      return prevMediaQueryArray.map(function (item) {
        return item.media === event.media ? _extends({}, item, {
          matches: event.matches
        }) : item;
      });
    });
  }
  useEffect(function () {
    var mediaQueryList = mediaQueries.map(function (query) {
      return matchMedia(query);
    });
    mediaQueryList.forEach(function (query) {
      query.addEventListener('change', handleChange);
    });
    return function () {
      mediaQueryList.forEach(function (query) {
        query.removeEventListener('change', handleChange);
      });
    };
  }, [mediaQueries]);
  return mediaQueryArray.map(function (query) {
    return query.matches;
  });
}

/**
 * React hook that tracks state of a CSS media query
 * @version 5.48.0
 * @unstable Please note that this API is not stable and may change in the future.
 * @see https://rsuitejs.com/components/use-media-query
 */
export function useMediaQuery(query) {
  var _React$useSyncExterna;
  var queries = Array.isArray(query) ? query : [query];
  var mediaQueries = useMemo(function () {
    return queries.map(function (query) {
      return mediaQuerySizeMap[query] || query;
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [].concat(queries));
  var mediaQueryArray = useRef(mediaQueries.map(function (query) {
    return matchMedia(query).matches;
  }));
  var subscribe = useCallback(function (callback) {
    var list = mediaQueries.map(function (query) {
      return matchMedia(query);
    });
    var handleChange = function handleChange(event) {
      var index = list.findIndex(function (item) {
        return item.media === event.media;
      });
      if (index !== -1) {
        // The store snapshot returned by getSnapshot must be immutable. So we need to create a new array.
        var nextMediaQueryArray = mediaQueryArray.current.slice();
        nextMediaQueryArray[index] = event.matches;
        mediaQueryArray.current = nextMediaQueryArray;
      }
      callback();
    };
    list.forEach(function (query) {
      query.addEventListener('change', handleChange);
    });
    return function () {
      list.forEach(function (query) {
        query.removeEventListener('change', handleChange);
      });
    };
  }, [mediaQueries]);
  var getSnapshot = useCallback(function () {
    return mediaQueryArray.current;
  }, []);
  var getServerSnapshot = useCallback(function () {
    return mediaQueryArray.current;
  }, []);
  return (_React$useSyncExterna = React['useSyncExternalStore']) === null || _React$useSyncExterna === void 0 ? void 0 : _React$useSyncExterna.call(React, subscribe, getSnapshot, getServerSnapshot);
}
export default typeof React['useSyncExternalStore'] === 'function' ? useMediaQuery : useMediaQueryOld;