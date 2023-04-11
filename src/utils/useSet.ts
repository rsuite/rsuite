import { useMemo, useState } from 'react';

export function useSet<T = unknown>() {
  const [set, setSet] = useState(() => new Set<T>());

  return useMemo(() => {
    return {
      has(value: T) {
        return set.has(value);
      },
      add(value: T) {
        setSet(prev => {
          const next = new Set(prev);
          next.add(value);
          return next;
        });
      },
      delete(value: T) {
        setSet(prev => {
          const next = new Set(prev);
          next.delete(value);
          return next;
        });
      }
    };
  }, [set]);
}
