export interface DOMHelperAPI {
  /** classes */
  hasClass: (node: HTMLElement, className: string) => boolean;
  addClass: (node: HTMLElement, className: string) => HTMLElement;
  removeClass: (node: HTMLElement, className: string) => HTMLElement;
  toggleClass: (node: HTMLElement, className: string) => HTMLElement;

  /** styles */
  getStyle: (node: HTMLElement, property?: string) => object;
  addStyle: (node: HTMLElement, property: string | object, value?: string | number) => void;
  removeStyle: (node: HTMLElement, keys: string | string[]) => void;
  translateDOMPositionXY: (style: object, x: number, y: number) => object;

  /** events */
  on: (target: HTMLElement, eventName: string, listener: () => void, capture?: boolean) => object;
  off: (target: HTMLElement, eventName: string, listener: () => void, capture?: boolean) => void;

  /** query  */
  activeElement: () => HTMLElement;
  getHeight: (node: HTMLElement, client?: HTMLElement) => number;
  getWidth: (node: HTMLElement, client?: HTMLElement) => number;
  getOffset: (node: HTMLElement) => object;
  getOffsetParent: (node: HTMLElement) => object;
  getPosition: (node: HTMLElement, offsetParent?: object) => object;
  getWindow: (node: HTMLElement) => string;
  nodeName: (node: HTMLElement) => string;
  ownerDocument: (node: HTMLElement) => object;
  ownerWindow: (node: HTMLElement) => object;
  contains: (context: HTMLElement, node: HTMLElement) => boolean;
  scrollLeft: (node: HTMLElement, val?: number) => number | void;
  scrollTop: (node: HTMLElement, val?: number) => number | void;
}

declare const DOMHelper: DOMHelperAPI;

export default DOMHelper;
