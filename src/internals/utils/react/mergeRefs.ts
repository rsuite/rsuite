import React from 'react';

type CallbackRef<T> = (ref: T | null) => void;
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>;

const toFnRef = <T>(ref?: Ref<T | null> | null): ((ref: T | null) => unknown) | undefined => {
  if (typeof ref === 'function') return ref;
  if (!ref) return undefined;

  return value => {
    ref.current = value;
  };
};

/**
 * Merges two React refs into a single ref callback.
 */
export function mergeRefs<T>(
  refA?: Ref<T | null> | null,
  refB?: Ref<T | null> | null
): React.RefCallback<T> {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  let currentCleanup: (() => void) | undefined;
  let hasAttached = false;

  return (value: T | null) => {
    if (value === null) {
      if (currentCleanup) {
        currentCleanup();
      } else if (!hasAttached) {
        a?.(null);
        b?.(null);
      }
      return;
    }

    const cleanupA = a?.(value);
    const cleanupB = b?.(value);
    hasAttached = true;
    let active = true;

    const cleanup = () => {
      if (!active) return;
      active = false;

      if (currentCleanup === cleanup) {
        currentCleanup = undefined;
      }

      try {
        if (typeof cleanupA === 'function') cleanupA();
        else a?.(null);
      } finally {
        if (typeof cleanupB === 'function') cleanupB();
        else b?.(null);
      }
    };

    currentCleanup = cleanup;

    // Keep the React 18 callback-ref contract when neither ref returns a cleanup.
    if (typeof cleanupA === 'function' || typeof cleanupB === 'function') {
      return cleanup;
    }
  };
}

export default mergeRefs;
