import { findDOMNode } from 'react-dom';

export default function getDOMNode(element: any) {
  /**
   * Native HTML elements
   */

  if (element?.nodeType) {
    return element;
  }

  /**
   * The component provides the `getHTMLElement` method.
   */

  const htmlElement = element?.getHTMLElement?.();
  if (htmlElement) {
    return htmlElement;
  }

  /**
   * If you can't get the native HTML element, you can only get it through findDOMNode.
   */
  // eslint-disable-next-line react/no-find-dom-node
  return findDOMNode(element);
}
