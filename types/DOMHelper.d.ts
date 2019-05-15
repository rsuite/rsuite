type DOMElement = HTMLElement | Window;
type Offset = {
  top: number;
  left: number;
  height: number;
  width: number;
};

export interface DOMHelperAPI {
  /** classes */
  hasClass(node: HTMLElement, className: string): boolean;
  addClass(node: HTMLElement, className: string): HTMLElement;
  removeClass(node: HTMLElement, className: string): HTMLElement;
  toggleClass(node: HTMLElement, className: string): HTMLElement;

  /** styles */
  getStyle(node: HTMLElement): React.CSSProperties;
  getStyle(node: HTMLElement, property?: string): string | number;

  addStyle(node: HTMLElement, propertys: React.CSSProperties): void;
  addStyle(node: HTMLElement, property: string, value: string | number): void;
  removeStyle: (node: HTMLElement, keys: string | string[]) => void;
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
  activeElement(): HTMLElement;
  getHeight(node: DOMElement, client?: DOMElement): number;
  getWidth(node: DOMElement, client?: DOMElement): number;
  getOffset(node: DOMElement): Offset | DOMRect;
  getOffsetParent(node: HTMLElement | Document): HTMLElement;
  getPosition(node: HTMLElement, offsetParent?: HTMLElement): Offset;
  getWindow(node: HTMLElement): Window;
  nodeName(node: HTMLElement): string;
  ownerDocument(node: HTMLElement): Document;
  ownerWindow(node: HTMLElement): Window;
  contains(context: HTMLElement, node: HTMLElement): boolean;
  scrollLeft(node: DOMElement): number;
  scrollLef(node: DOMElement, val: number): void;
  scrollTop(node: DOMElement): number;
  scrollTop(node: DOMElement, val: number): void;
}

declare const DOMHelper: DOMHelperAPI;

export default DOMHelper;
