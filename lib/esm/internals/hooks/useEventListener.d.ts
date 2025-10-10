/**
 * Attach the event handler directly to the specified DOM element.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
export declare function useEventListener<K extends keyof DocumentEventMap>(eventTarget: EventTarget | (() => EventTarget), event: K, listener: EventListenerOrEventListenerObject, capture?: boolean | AddEventListenerOptions): void;
export default useEventListener;
