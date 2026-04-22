import { EffectCallback } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

const useMount = (effect: EffectCallback) => {
  useIsomorphicLayoutEffect(effect, []);
};

export default useMount;
