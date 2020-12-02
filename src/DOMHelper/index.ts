import * as helpers from 'dom-lib';
export * from 'dom-lib';
type DOMElement = HTMLElement | Window | Document | Element;

export interface DOMOffset {
  top: number;
  left: number;
  height: number;
  width: number;
}

export interface DOMHelper {
  /** classes */
  hasClass(node: Element, className: string): boolean;
  addClass(node: Element, className: string): Element;
  removeClass(node: Element, className: string): Element;
  toggleClass(node: Element, className: string): Element;

  /** styles */
  getStyle(node: Element): React.CSSProperties;
  getStyle(node: Element, property?: string): string | number;

  addStyle(node: Element, propertys: React.CSSProperties): void;
  addStyle(node: Element, property: string, value: string | number): void;
  removeStyle: (node: Element, keys: string | string[]) => void;
  translateDOMPositionXY: (style: React.CSSProperties, x: number, y: number) => React.CSSProperties;

  /** events */
  on(
    target: DOMElement,
    eventName: string,
    listener: (event: EventInit) => void,
    capture?: boolean | { passive: boolean }
  ): {
    off: () => void;
  };

  off(
    target: DOMElement,
    eventName: string,
    listener: (event: EventInit) => void,
    capture?: boolean
  ): void;

  /** query  */
  canUseDOM: boolean;
  activeElement(doc?: Document): Element;
  getHeight(node: DOMElement, client?: DOMElement): number;
  getWidth(node: DOMElement, client?: DOMElement): number;
  getOffset(node: DOMElement): DOMOffset | DOMRect;
  getOffsetParent(node: Element | Document): Element;
  getPosition(node: Element, offsetParent?: Element): DOMOffset;
  getWindow(node: Element): Window;
  getContainer(node: Element | (() => Element), defaultContainer: Element): Element;
  nodeName(node: Element): string;
  ownerDocument(node: Element): Document;
  ownerWindow(node: Element): Window;
  contains(context: DOMElement, node: DOMElement): boolean;
  scrollLeft(node: DOMElement): number;
  scrollLef(node: DOMElement, val: number): void;
  scrollTop(node: DOMElement): number;
  scrollTop(node: DOMElement, val: number): void;
  isElement(node: DOMElement): boolean;
  transition(): {
    end: string;
    backfaceVisibility: string;
    transform: string;
    property: string;
    timing: string;
    delay: string;
    duration: string;
  };
  animation: {
    cancelAnimationFramePolyfill(handle: number): void;
    nativeRequestAnimationFrame(callback: FrameRequestCallback): number;
    requestAnimationFramePolyfill(callback: FrameRequestCallback): number;
    events(): {
      end: string;
    };
  };
}

const DOMHelper: DOMHelper = {
  ...helpers,
  isElement: (node: HTMLElement) => {
    return node?.nodeType && typeof node?.nodeName === 'string';
  }
};
export default DOMHelper;
