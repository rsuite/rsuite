import { useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';

/**
 * Attach the event handler directly to the specified DOM element,
 * and it will be triggered when the size of the DOM element is changed.
 *
 * @param eventTarget The target to listen for events on
 * @param listener An event handler
 */
export function useElementResize(
  eventTarget: Element | null | (() => Element | null),
  listener: ResizeObserverCallback
) {
  const resizeObserver = useRef<ResizeObserver>();

  useEffect(() => {
    if (!resizeObserver.current) {
      const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;

      if (target) {
        resizeObserver.current = new ResizeObserver(listener);
        resizeObserver.current.observe(target);
      }
    }

    return () => {
      resizeObserver.current?.disconnect();
    };
  }, [eventTarget, listener]);
}

export default useElementResize;
