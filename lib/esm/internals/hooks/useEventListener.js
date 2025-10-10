'use client';
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
export function useEventListener(eventTarget, event, listener, capture) {
  if (capture === void 0) {
    capture = false;
  }
  useEffect(function () {
    var target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    var controller = target ? on(target, event, listener, capture) : null;
    return function () {
      controller === null || controller === void 0 || controller.off();
    };
  }, [eventTarget, event, listener, capture]);
}
export default useEventListener;