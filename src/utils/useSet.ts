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
          const copy = new Set(prev);
          copy.add(value);
          return copy;
        });
      },
      delete(value: T) {
        setSet(prev => {
          const copy = new Set(prev);
          copy.delete(value);
          return copy;
        });
      }
    };
  }, [set]);
}
