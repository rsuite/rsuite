/* eslint-disable react/no-find-dom-node */
import ReactDOM from 'react-dom';

function safeFindDOMNode(componentOrElement: React.Component | Element | null | undefined) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return ReactDOM.findDOMNode?.(componentOrElement);
  }
  return (componentOrElement ?? null) as Element | Text | null;
}

const getRefTarget = (ref: React.RefObject<Element> | Element | null | undefined) => {
  return ref && ('current' in ref ? ref.current : ref);
};

export function getDOMNode(elementOrRef) {
  // If elementOrRef is an instance of Position, child is returned. [PositionInstance]
  const element = elementOrRef?.root || elementOrRef?.child || getRefTarget(elementOrRef);

  // Native HTML elements
  if (element?.nodeType && typeof element?.nodeName === 'string') {
    return element;
  }

  // If you can't get the native HTML element, you can only get it through findDOMNode.
  return safeFindDOMNode(element) as Element;
}

export default getDOMNode;
