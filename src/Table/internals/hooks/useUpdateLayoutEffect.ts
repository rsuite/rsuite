import { useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';

const useUpdateLayoutEffect: typeof useEffect = (effect, deps) => {
  const isMounting = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    effect();
  }, deps);
};

export default useUpdateLayoutEffect;
