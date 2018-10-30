export interface DOMHelperAPI {
  /** classes */
  hasClass: (node: HTMLElement, className: string) => boolean;
  addClass: (node: HTMLElement, className: string) => HTMLElement;
  removeClass: (node: HTMLElement, className: string) => HTMLElement;
  toggleClass: (node: HTMLElement, className: string) => HTMLElement;

  /** styles */
  getStyle: (node: HTMLElement, property?: string) => Object;
  addStyle: (node: HTMLElement, property: string | Object, value?: string | number) => void;
  removeStyle: (node: HTMLElement, keys: string | Array<string>) => void;
  translateDOMPositionXY: (style: Object, x: number, y: number) => Object;

  /** events */
  on: (target: HTMLElement, eventName: string, listener: Function, capture?: boolean) => Object;
  off: (target: HTMLElement, eventName: string, listener: Function, capture?: boolean) => void;

  /** query  */
  activeElement: () => HTMLElement;
  getHeight: (node: HTMLElement, client?: HTMLElement) => number;
  getWidth: (node: HTMLElement, client?: HTMLElement) => number;
  getOffset: (node: HTMLElement) => Object;
  getOffsetParent: (node: HTMLElement) => Object;
  getPosition: (node: HTMLElement, offsetParent?: Object) => Object;
  getWindow: (node: HTMLElement) => String;
  nodeName: (node: HTMLElement) => String;
  ownerDocument: (node: HTMLElement) => Object;
  ownerWindow: (node: HTMLElement) => Object;
  contains: (context: HTMLElement, node: HTMLElement) => boolean;
  scrollLeft: (node: HTMLElement, val?: number) => number | void;
  scrollTop: (node: HTMLElement, val?: number) => number | void;
}

declare const DOMHelper: DOMHelperAPI;

export default DOMHelper;
