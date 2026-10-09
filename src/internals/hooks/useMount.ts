import { useEffect, useRef } from 'react';
import type { EffectCallback } from 'react';

export const useMount = (callback: EffectCallback) => {
  const mountRef = useRef(callback);

  mountRef.current = callback;

  useEffect(() => {
    return mountRef.current?.();
  }, []);
};

export default useMount;
