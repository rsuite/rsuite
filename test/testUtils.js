/* eslint-disable react/no-find-dom-node */

import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import getPalette from './getPalette';
import tinycolor from 'tinycolor2';
export { getStyle } from 'dom-lib';

export const globalKey = 'rs';
const DEFAULT_PRIMARY_COLOR = '#3498ff';
const DARK_PRIMARY_COLOR = '#34c3ff';

export const getDefaultPalette = () => getPalette(DEFAULT_PRIMARY_COLOR);
export const getDarkPalette = () => getPalette(DARK_PRIMARY_COLOR);

// Check whether it is a DOM object?
function isDOMElement(node) {
  return (
    node && typeof node === 'object' && node.nodeType === 1 && typeof node.nodeName === 'string'
  );
}

export function renderIntoDocument(children) {
  return ReactTestUtils.renderIntoDocument(children);
}

export function getInstance(children) {
  // isReactComponent is only defined if children is of React.Component class
  // so we can test against this to verify this is a functional component
  if (!(children.type.prototype && children.type.prototype.isReactComponent)) {
    const instanceRef = React.createRef();
    /**
     * https://stackoverflow.com/questions/36682241/testing-functional-components-with-renderintodocument
     */
    ReactTestUtils.renderIntoDocument(React.cloneElement(children, { ref: instanceRef }));

    return instanceRef.current;
  }

  return ReactTestUtils.renderIntoDocument(children);
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

  if (isDOMElement(getInstance(children))) {
    return getInstance(children);
  }

  if (getInstance(children) && isDOMElement(getInstance(children).root)) {
    return getInstance(children).root;
  }

  if (getInstance(children) && isDOMElement(getInstance(children).child)) {
    return getInstance(children).child;
  }

  return findDOMNode(getInstance(children));
}

export function innerText(node) {
  if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    return node.textContent;
  }
  return node.innerText;
}

export function createTestContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

export const toRGB = color => tinycolor(color).toRgbString();

export const inChrome = window.navigator.userAgent.includes('Chrome');

export const itChrome = (...args) => {
  if (inChrome) {
    it(...args);
  }
};
