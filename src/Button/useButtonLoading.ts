import { useRef, useState } from 'react';
import useIsomorphicLayoutEffect from '@/internals/hooks/useIsomorphicLayoutEffect';

function reportClickError(error: unknown) {
  if (typeof globalThis.reportError === 'function') {
    globalThis.reportError(error);
  } else {
    setTimeout(() => {
      throw error;
    });
  }
}

export default function useButtonLoading() {
  const state = useRef({ connected: true, pending: false });
  const [loading, setLoading] = useState(false);

  useIsomorphicLayoutEffect(() => {
    state.current.connected = true;
    setLoading(state.current.pending);

    return () => {
      state.current.connected = false;
    };
  }, []);

  const finish = () => {
    state.current.pending = false;
    if (state.current.connected) setLoading(false);
  };

  const run = (callback: () => unknown, onError?: (error: unknown) => void) => {
    // Guard reentrant clicks before the callback has returned its promise.
    state.current.pending = true;

    try {
      const result = callback();
      const then =
        result && (typeof result === 'object' || typeof result === 'function')
          ? (result as PromiseLike<unknown>).then
          : undefined;

      if (typeof then !== 'function') {
        finish();
        return;
      }

      if (state.current.connected) setLoading(true);

      // Read a thenable's accessor once and preserve its receiver.
      Promise.resolve({ then: then.bind(result) }).then(finish, error => {
        finish();
        // Error delivery also belongs to tasks whose button has unmounted.
        queueMicrotask(() => {
          if (onError) onError(error);
          else reportClickError(error);
        });
      });
    } catch (error) {
      finish();
      if (onError) onError(error);
      else throw error;
    }
  };

  return { loading, run, isPending: () => state.current.pending };
}
