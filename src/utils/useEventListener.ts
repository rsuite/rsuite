import { useEffect } from 'react';
import { on } from 'dom-lib';

/**
 * Attach the event handler directly to the specified DOM element.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 * @param effect Conditionally firing an effect
 */
export default function useEventListener<K extends keyof DocumentEventMap>(
  eventTarget: EventTarget | (() => EventTarget),
  event: K,
  listener: EventListenerOrEventListenerObject,
  capture: boolean | AddEventListenerOptions = false,
  effect: any[] = []
) {
  useEffect(() => {
    const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    const controller = on(target, event, listener, capture);

    return () => controller.off();
  }, [eventTarget, event, listener, capture, ...effect]);
}
