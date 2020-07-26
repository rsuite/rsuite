import { useEffect } from 'react';
import bindElementResize, { unbind } from 'element-resize-event';

/**
 * Attach the event handler directly to the specified DOM element,
 * and it will be triggered when the size of the DOM element is changed.
 *
 * @param eventTarget The target to listen for events on
 * @param listener An event handler
 */
export default function useElementResize(
  eventTarget: EventTarget | (() => EventTarget),
  listener: EventListenerOrEventListenerObject
) {
  useEffect(() => {
    const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    bindElementResize(target, listener);

    return () => unbind(target);
  }, [eventTarget, listener]);
}
