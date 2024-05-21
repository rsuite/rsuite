import { useEffect, useRef, useCallback } from 'react';

export interface UseTimeoutFnReturn {
  clear: () => void;
  reset: () => void;
}

/**
 * A timer hook
 * @param fn Timer callback function
 * @param ms Milliseconds of the timer
 * @param enabled Whether to open the timer
 */
export function useTimeout(
  fn: (() => void) | undefined,
  ms = 0,
  enabled = true
): UseTimeoutFnReturn {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  const set = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    if (enabled) {
      timeout.current = setTimeout(() => {
        callback.current?.();
      }, ms);
    }
  }, [ms, enabled]);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    set();

    return clear;
  }, [ms, enabled, set, clear]);

  return { clear, reset: set };
}

export default useTimeout;
