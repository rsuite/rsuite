import { useEffect } from 'react';
import on from 'dom-lib/on';

/**
 * Attach the event handler directly to the specified DOM element.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  eventTarget: EventTarget | (() => EventTarget),
  event: K,
  listener: EventListenerOrEventListenerObject,
  capture: boolean | AddEventListenerOptions = false
) {
  useEffect(() => {
    const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    const controller = target ? on(target, event, listener, capture) : null;

    return () => {
      controller?.off();
    };
  }, [eventTarget, event, listener, capture]);
}

export default useEventListener;
