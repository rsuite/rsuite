/// <reference types="node" />
import * as helpers from 'dom-lib';
export * from 'dom-lib';
/**
 * a wrapper of dom-lib with some custom methods.
 * @see https://rsuitejs.com/components/dom-helper/
 */
declare const DOMHelper: {
    isElement: (value: any) => value is HTMLElement;
    on: typeof helpers.on;
    off: typeof helpers.off;
    WheelHandler: typeof helpers.WheelHandler;
    DOMMouseMoveTracker: typeof helpers.DOMMouseMoveTracker;
    PointerMoveTracker: typeof helpers.PointerMoveTracker;
    addClass: typeof helpers.addClass;
    removeClass: typeof helpers.removeClass;
    hasClass: typeof helpers.hasClass;
    toggleClass: typeof helpers.toggleClass;
    cancelAnimationFramePolyfill: typeof cancelAnimationFrame;
    requestAnimationFramePolyfill: typeof requestAnimationFrame | ((callback: (t: number) => void) => NodeJS.Timeout);
    getAnimationEnd: typeof helpers.getAnimationEnd;
    ownerDocument: typeof helpers.ownerDocument;
    ownerWindow: typeof helpers.ownerWindow;
    getWindow: typeof helpers.getWindow;
    getContainer: typeof helpers.getContainer;
    canUseDOM: boolean;
    contains: (context: Element, node: Node & ParentNode) => boolean;
    scrollTop: typeof helpers.scrollTop;
    scrollLeft: typeof helpers.scrollLeft;
    getOffset: typeof helpers.getOffset;
    nodeName: typeof helpers.nodeName;
    getOffsetParent: typeof helpers.getOffsetParent;
    getPosition: typeof helpers.getPosition;
    isOverflowing: typeof helpers.isOverflowing;
    getScrollbarSize: typeof helpers.getScrollbarSize;
    getHeight: typeof helpers.getHeight;
    getWidth: typeof helpers.getWidth;
    isFocusable: typeof helpers.isFocusable;
    getStyle: typeof helpers.getStyle;
    removeStyle: typeof helpers.removeStyle;
    addStyle: typeof helpers.addStyle;
    translateDOMPositionXY: (style: CSSStyleDeclaration, x?: number | undefined, y?: number | undefined) => CSSStyleDeclaration;
};
export default DOMHelper;
