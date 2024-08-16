import { useCallback, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param {function} fn
 */
export function useEventCallback(fn) {
  const ref = useRef(fn);
  /**
   * use useLayoutEffect instead of useEffect.
   * useLayoutEffect is earlier than useEffect, sometimes we use setState and then use callback immediately,
   * However the state in callback is not the latest, because useEffect is not triggered.
   */
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
}

export default useEventCallback;
