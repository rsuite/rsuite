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
  eventTarget: Element | null | (() => Element | null) | React.RefObject<Element | null>,
  listener: ResizeObserverCallback
) {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const currentElement = useRef<Element | null>(null);

  // Create the observer
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

    // If target changed, disconnect the previous observer
    if (currentElement.current !== target) {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
        resizeObserver.current = null;
      }
      currentElement.current = target;
    }

    // If we have a target and no observer, create one
    if (target && !resizeObserver.current) {
      const observer = new ResizeObserver(listener);
      observer.observe(target);
      resizeObserver.current = observer;
    }

    // Cleanup function
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
        resizeObserver.current = null;
      }
      currentElement.current = null;
    };
  }, [eventTarget, listener]);

  // Update the current element reference if it changes
  useEffect(() => {
    if (eventTarget) {
      if (typeof eventTarget === 'function') {
        currentElement.current = eventTarget();
      } else if ('current' in eventTarget) {
        currentElement.current = eventTarget.current;
      } else {
        currentElement.current = eventTarget;
      }
    } else {
      currentElement.current = null;
    }
  }, [eventTarget]);
}

export default useElementResize;
