import { useCallback, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function updateCallback(ref, fn) {
  ref.current = fn;
}

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
  // Bind the effect arguments so the stable callback cannot retain an old fn
  // through a shared render closure, including in minified builds.
  useIsomorphicLayoutEffect(updateCallback.bind(null, ref, fn));
  return useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
}

export default useEventCallback;
