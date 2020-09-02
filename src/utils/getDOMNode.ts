import { findDOMNode } from 'react-dom';

const getRefTarget = (ref: React.RefObject<Element> | Element | null | undefined) => {
  return ref && ('current' in ref ? ref.current : ref);
};

export default function getDOMNode(elementOrRef) {
  // If elementOrRef is an instance of Position, child is returned. [PositionInstance]
  const element = elementOrRef?.child ? elementOrRef?.child : getRefTarget(elementOrRef);

  // Native HTML elements
  if (element?.nodeType && typeof element?.nodeName === 'string') {
    return element;
  }

  // If you can't get the native HTML element, you can only get it through findDOMNode.
  // eslint-disable-next-line react/no-find-dom-node
  return findDOMNode(element) as Element;
}
