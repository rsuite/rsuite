import { useEffect, useRef } from 'react';

export const useMount = (callback: () => void) => {
  const mountRef = useRef(callback);

  mountRef.current = callback;

  useEffect(() => {
    mountRef.current?.();
  }, []);
};

export default useMount;
