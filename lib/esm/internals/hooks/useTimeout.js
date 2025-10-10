'use client';
import { useEffect, useRef, useCallback } from 'react';
/**
 * A timer hook
 * @param fn Timer callback function
 * @param ms Milliseconds of the timer
 * @param enabled Whether to open the timer
 */
export function useTimeout(fn, ms, enabled) {
  if (ms === void 0) {
    ms = 0;
  }
  if (enabled === void 0) {
    enabled = true;
  }
  var timeout = useRef();
  var callback = useRef(fn);
  var clear = useCallback(function () {
    timeout.current && clearTimeout(timeout.current);
  }, []);
  var set = useCallback(function () {
    timeout.current && clearTimeout(timeout.current);
    if (enabled) {
      timeout.current = setTimeout(function () {
        var _callback$current;
        (_callback$current = callback.current) === null || _callback$current === void 0 || _callback$current.call(callback);
      }, ms);
    }
  }, [ms, enabled]);

  // update ref when function changes
  useEffect(function () {
    callback.current = fn;
  }, [fn]);
  useEffect(function () {
    set();
    return clear;
  }, [ms, enabled, set, clear]);
  return {
    clear: clear,
    reset: set
  };
}
export default useTimeout;