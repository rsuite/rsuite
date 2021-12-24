import { useEffect, useRef } from 'react';

const useMount = (callback: () => void) => {
  const mountRef = useRef(callback);

  mountRef.current = callback;

  useEffect(() => {
    mountRef.current?.();
  }, []);
};

export default useMount;
