import { useMemo, useState } from 'react';

export function useMap<K, V>() {
  const [map, setMap] = useState(() => new Map<K, V>());

  return useMemo(() => {
    return {
      has(key: K) {
        return map.has(key);
      },
      get(key: K) {
        return map.get(key);
      },
      set(key: K, value: V) {
        setMap(prev => {
          const copy = new Map(prev);
          copy.set(key, value);
          return copy;
        });
      },
      clear() {
        setMap(new Map());
      }
    };
  }, [map]);
}

export default useMap;
