'use client';
import { useCallback, useRef } from 'react';
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect.js";

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param {function} fn
 */
export function useEventCallback(fn) {
  var ref = useRef(fn);
  /**
   * use useLayoutEffect instead of useEffect.
   * useLayoutEffect is earlier than useEffect, sometimes we use setState and then use callback immediately,
   * However the state in callback is not the latest, because useEffect is not triggered.
   */
  useIsomorphicLayoutEffect(function () {
    ref.current = fn;
  });
  return useCallback(function () {
    var _ref$current;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.call.apply(_ref$current, [ref].concat(args));
  }, []);
}
export default useEventCallback;