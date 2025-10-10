'use client';
import { useEffect, useLayoutEffect } from 'react';
export var useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;