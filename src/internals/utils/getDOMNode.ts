import type { Component } from 'react';

function safeFindDOMNode(componentOrElement: Component | Element | null | undefined) {
  if (componentOrElement && 'setState' in componentOrElement) {
    // Access the underlying DOM node through ref if available
    return (componentOrElement as any)?.ref?.current ?? null;
  }
  return (componentOrElement ?? null) as Element | Text | null;
}

const getRefTarget = (ref: React.RefObject<Element> | Element | null | undefined) => {
  return ref && ('current' in ref ? ref.current : ref);
};

export function getDOMNode(elementOrRef: any) {
  // If elementOrRef is an instance of Position, child is returned. [PositionInstance]
  const element = elementOrRef?.root || elementOrRef?.child || getRefTarget(elementOrRef);

  // Native HTML elements
  if (element?.nodeType && typeof element?.nodeName === 'string') {
    return element;
  }

  return safeFindDOMNode(element);
}

export default getDOMNode;
