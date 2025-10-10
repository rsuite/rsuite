'use client';
import useUpdatedRef from "./useUpdatedRef.js";
import { useEffect } from 'react';

/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */
export function useWillUnmount(fn) {
  var onUnmount = useUpdatedRef(fn);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(function () {
    return function () {
      return onUnmount.current();
    };
  }, []);
}
export default useWillUnmount;