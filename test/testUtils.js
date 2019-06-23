import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

export function getInstance(children) {
  return ReactTestUtils.renderIntoDocument(children);
}

export function getDOMNode(children) {
  if (ReactTestUtils.isCompositeComponent(children)) {
    return findDOMNode(children);
  }

  return findDOMNode(getInstance(children));
}

export function innerText(node) {
  if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    return node.textContent;
  }
  return node.innerText;
}
