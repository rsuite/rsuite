/// <reference types="react" />
/**
 * Ensures that a virtualized list item retains focus after scrolling or clicking on options,
 * preventing unnecessary re-renders and loss of focus. If the current focus is on an interactive
 * element (such as input, textarea, select, button, or contenteditable), the focus is not shifted.
 * @param focused - Boolean indicating if the item should be focused.
 * @returns A ref to be attached to the list item element.
 */
export declare function useFocusVirtualListItem<T extends HTMLElement>(focused?: boolean): import("react").RefObject<T>;
export default useFocusVirtualListItem;
