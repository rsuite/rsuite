'use client';
import { useEffect, useRef } from 'react';
export var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isMounting = useRef(true);
  useEffect(function () {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
export default useUpdateEffect;