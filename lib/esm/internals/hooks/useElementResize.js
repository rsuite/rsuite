'use client';
import { useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

/**
 * Attach the event handler directly to the specified DOM element,
 * and it will be triggered when the size of the DOM element is changed.
 *
 * @param eventTarget The target to listen for events on
 * @param listener An event handler
 */
export function useElementResize(eventTarget, listener) {
  var resizeObserver = useRef();
  useEffect(function () {
    if (!resizeObserver.current) {
      var target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
      if (target) {
        resizeObserver.current = new ResizeObserver(listener);
        resizeObserver.current.observe(target);
      }
    }
    return function () {
      var _resizeObserver$curre;
      (_resizeObserver$curre = resizeObserver.current) === null || _resizeObserver$curre === void 0 || _resizeObserver$curre.disconnect();
    };
  }, [eventTarget, listener]);
}
export default useElementResize;