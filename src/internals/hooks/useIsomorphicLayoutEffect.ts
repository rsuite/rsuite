import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
