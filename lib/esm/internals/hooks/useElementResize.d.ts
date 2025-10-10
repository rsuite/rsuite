/**
 * Attach the event handler directly to the specified DOM element,
 * and it will be triggered when the size of the DOM element is changed.
 *
 * @param eventTarget The target to listen for events on
 * @param listener An event handler
 */
export declare function useElementResize(eventTarget: Element | null | (() => Element | null), listener: ResizeObserverCallback): void;
export default useElementResize;
