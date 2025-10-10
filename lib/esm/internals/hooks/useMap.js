'use client';
import { useMemo, useState } from 'react';
export function useMap() {
  var _useState = useState(function () {
      return new Map();
    }),
    map = _useState[0],
    setMap = _useState[1];
  return useMemo(function () {
    return {
      has: function has(key) {
        return map.has(key);
      },
      get: function get(key) {
        return map.get(key);
      },
      set: function set(key, value) {
        setMap(function (prev) {
          var copy = new Map(prev);
          copy.set(key, value);
          return copy;
        });
      },
      clear: function clear() {
        setMap(new Map());
      }
    };
  }, [map]);
}
export default useMap;