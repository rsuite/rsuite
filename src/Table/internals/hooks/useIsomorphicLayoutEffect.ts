import { useEffect, useLayoutEffect } from 'react';
import canUseDOM from 'dom-lib/canUseDOM';

const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
