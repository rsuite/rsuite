import { useCallback, useInsertionEffect, useRef } from 'react';

/** Keep validation configuration in the same commit phase as Form values and errors. */
export default function useFormEventCallback(callback: (...args: any[]) => any) {
  const callbackRef = useRef(callback);

  // Only publish a reference here; child layout callbacks run after this commit phase.
  useInsertionEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: any[]) => callbackRef.current(...args), []);
}
