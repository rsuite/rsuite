import { useContext } from 'react';
import { CustomContext } from '@/internals/Provider/CustomContext';
import useMediaQuery from '../useMediaQuery';

/** Resolve an explicit policy before subscribing to the system preference. */
export default function useReducedMotion(reduceMotion?: boolean) {
  const provider = useContext(CustomContext);
  const policy = reduceMotion ?? provider.reduceMotion;
  const [systemReduceMotion] = useMediaQuery(
    '(prefers-reduced-motion: reduce)',
    policy === undefined
  );
  return policy ?? systemReduceMotion;
}
