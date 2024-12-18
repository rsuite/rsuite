import React from 'react';
import { render as testRender } from '@testing-library/react';
import { guid } from '@/internals/utils';

/**
 * Check whether it is a DOM object?
 * @param node
 * @return {boolean}
 */
function isDOMElement(node) {
  return (
    node && typeof node === 'object' && node.nodeType === 1 && typeof node.nodeName === 'string'
  );
}

function getTestDOMNode(children) {
  const testId = guid();
  const childTestId = guid();
  const { getByTestId } = testRender(
    <div data-testid={testId}>{React.cloneElement(children, { 'data-testid': childTestId })}</div>
  );

  try {
    return getByTestId(testId).firstChild || getByTestId(childTestId);
  } catch (e) {
    return null;
  }
}

export function getDOMNode(children) {
  if (isDOMElement(children)) {
    return children;
  }

  if (isDOMElement(children.child)) {
    return children.child;
  }

  return getTestDOMNode(children);
}
