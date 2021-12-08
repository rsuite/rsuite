import { useEffect, useRef, useCallback } from 'react';

export interface UseTimeoutFnReturn {
  clear: () => void;
  reset: () => void;
}

/**
 * A timer hook
 * @param fn Timer callback function
 * @param ms Milliseconds of the timer
 * @param open Whether to open the timer
 */
function useTimeout(fn: (() => void) | undefined, ms = 0, open = true): UseTimeoutFnReturn {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  const set = useCallback(() => {
    if (open) {
      timeout.current = setTimeout(() => fn?.(), ms);
    }
  }, [ms, fn, open]);

  useEffect(() => {
    set();
    return clear;
  }, [fn, ms, open, clear, set]);

  return { clear, reset: set };
}

export default useTimeout;
