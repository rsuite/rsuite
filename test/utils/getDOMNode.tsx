/* eslint-disable react/no-find-dom-node */

import React from 'react';
import { findDOMNode } from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { render as testRender } from '@testing-library/react';
import guid from '../../src/utils/guid';

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

  if (ReactTestUtils.isCompositeComponent(children)) {
    return findDOMNode(children);
  }

  return getTestDOMNode(children);
}
