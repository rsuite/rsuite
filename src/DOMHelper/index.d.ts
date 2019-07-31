type DOMElement = Element | Window;

export interface DOMOffset {
  top: number;
  left: number;
  height: number;
  width: number;
}

export interface DOMHelperAPI {
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
    capture?: boolean
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
  activeElement(): Element;
  getHeight(node: DOMElement, client?: DOMElement): number;
  getWidth(node: DOMElement, client?: DOMElement): number;
  getOffset(node: DOMElement): DOMOffset | DOMRect;
  getOffsetParent(node: Element | Document): Element;
  getPosition(node: Element, offsetParent?: Element): DOMOffset;
  getWindow(node: Element): Window;
  nodeName(node: Element): string;
  ownerDocument(node: Element): Document;
  ownerWindow(node: Element): Window;
  contains(context: Element, node: Element): boolean;
  scrollLeft(node: DOMElement): number;
  scrollLef(node: DOMElement, val: number): void;
  scrollTop(node: DOMElement): number;
  scrollTop(node: DOMElement, val: number): void;
}

declare const DOMHelper: DOMHelperAPI;

export default DOMHelper;
