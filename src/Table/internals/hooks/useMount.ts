import { EffectCallback } from 'react';
import { useIsomorphicLayoutEffect } from '@/internals/hooks';

const useMount = (effect: EffectCallback) => {
  useIsomorphicLayoutEffect(effect, []);
};

export default useMount;
