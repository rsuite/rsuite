import { useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import useEventCallback from './useEventCallback';

/**
 * Attach the event handler directly to the specified DOM element,
 * and it will be triggered when the size of the DOM element is changed.
 *
 * @param eventTarget The target to listen for events on
 * @param listener An event handler
 */
export function useElementResize(
  eventTarget: Element | null | (() => Element | null) | React.RefObject<Element | null>,
  listener: ResizeObserverCallback
) {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const currentElement = useRef<Element | null>(null);
  const handleResize = useEventCallback(listener);

  // Refs and stable getters can resolve to a different element after a render.
  useEffect(() => {
    // Get the target element
    let target: Element | null = null;

    if (eventTarget) {
      if (typeof eventTarget === 'function') {
        target = eventTarget();
      } else if ('current' in eventTarget) {
        target = eventTarget.current;
      } else {
        target = eventTarget;
      }
    }

    if (currentElement.current === target) {
      return;
    }

    resizeObserver.current?.disconnect();
    resizeObserver.current = null;
    currentElement.current = target;

    if (target) {
      const observer = new ResizeObserver(handleResize);
      observer.observe(target);
      resizeObserver.current = observer;
    }
  });

  useEffect(
    () => () => {
      resizeObserver.current?.disconnect();
      resizeObserver.current = null;
      currentElement.current = null;
    },
    []
  );
}

export default useElementResize;
