import { useEffect, useCallback, useRef } from 'react';

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * @param {function} fn
 */
export default function useEventCallback(fn) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => {
    return ref.current?.(...args);
  }, []);
}
