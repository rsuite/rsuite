import useUpdatedRef from './useUpdatedRef';
import { useEffect } from 'react';

/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */
export default function useWillUnmount(fn: () => void) {
  const onUnmount = useUpdatedRef(fn);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => onUnmount.current(), []);
}
