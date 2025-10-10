'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.mediaQuerySizeMap = exports.default = void 0;
exports.useMediaQuery = useMediaQuery;
exports.useMediaQueryOld = useMediaQueryOld;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
var _pick = _interopRequireDefault(require("lodash/pick"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var mediaQuerySizeMap = exports.mediaQuerySizeMap = {
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
  if (_canUseDOM.default) {
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
function useMediaQueryOld(query) {
  var queries = Array.isArray(query) ? query : [query];
  var mediaQueries = (0, _react.useMemo)(function () {
    return queries.map(function (query) {
      return mediaQuerySizeMap[query] || query;
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [].concat(queries));
  var _useState = (0, _react.useState)(function () {
      return mediaQueries.map(function (query) {
        return (0, _pick.default)(matchMedia(query), ['matches', 'media']);
      });
    }),
    mediaQueryArray = _useState[0],
    setMediaQueryArray = _useState[1];
  function handleChange(event) {
    setMediaQueryArray(function (prevMediaQueryArray) {
      return prevMediaQueryArray.map(function (item) {
        return item.media === event.media ? (0, _extends2.default)({}, item, {
          matches: event.matches
        }) : item;
      });
    });
  }
  (0, _react.useEffect)(function () {
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
function useMediaQuery(query) {
  var _React$useSyncExterna;
  var queries = Array.isArray(query) ? query : [query];
  var mediaQueries = (0, _react.useMemo)(function () {
    return queries.map(function (query) {
      return mediaQuerySizeMap[query] || query;
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [].concat(queries));
  var mediaQueryArray = (0, _react.useRef)(mediaQueries.map(function (query) {
    return matchMedia(query).matches;
  }));
  var subscribe = (0, _react.useCallback)(function (callback) {
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
  var getSnapshot = (0, _react.useCallback)(function () {
    return mediaQueryArray.current;
  }, []);
  var getServerSnapshot = (0, _react.useCallback)(function () {
    return mediaQueryArray.current;
  }, []);
  return (_React$useSyncExterna = _react.default['useSyncExternalStore']) === null || _React$useSyncExterna === void 0 ? void 0 : _React$useSyncExterna.call(_react.default, subscribe, getSnapshot, getServerSnapshot);
}
var _default = exports.default = typeof _react.default['useSyncExternalStore'] === 'function' ? useMediaQuery : useMediaQueryOld;