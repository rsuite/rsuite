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

export function renderIntoDocument(children) {
  return ReactTestUtils.renderIntoDocument(children);
}

export function getInstance(children, waitForDidMount = true) {
  // isReactComponent is only defined if children is of React.Component class
  // so we can test against this to verify this is a functional component
  if (!(children.type.prototype && children.type.prototype.isReactComponent)) {
    const instanceRef = React.createRef();

    if (waitForDidMount) {
      // Use act() to make sure componentDidMount/useEffect is done
      ReactTestUtils.act(() => {
        /**
         * https://stackoverflow.com/questions/36682241/testing-functional-components-with-renderintodocument
         */
        ReactTestUtils.renderIntoDocument(React.cloneElement(children, { ref: instanceRef }));
      });
    } else {
      ReactTestUtils.renderIntoDocument(React.cloneElement(children, { ref: instanceRef }));
    }
    return instanceRef.current;
  }

  let instance;

  if (waitForDidMount) {
    ReactTestUtils.act(() => {
      instance = ReactTestUtils.renderIntoDocument(children);
    });
  } else {
    instance = ReactTestUtils.renderIntoDocument(children);
  }

  return instance;
}

/**
 * @return {HTMLElement}
 */
export function getDOMNode(children, waitForDidMount = true) {
  if (isDOMElement(children)) {
    return children;
  }

  if (isDOMElement(children.child)) {
    return children.child;
  }

  if (ReactTestUtils.isCompositeComponent(children)) {
    return findDOMNode(children);
  }

  const instance = getInstance(children, waitForDidMount);

  if (isDOMElement(instance)) {
    return instance;
  }

  if (instance && isDOMElement(instance.root)) {
    return instance.root;
  }

  if (instance && isDOMElement(instance.child)) {
    return instance.child;
  }

  return findDOMNode(instance);
}

/**
 * @param {HTMLElement} node
 * @return {String}
 */
export function innerText(node) {
  if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    return node.textContent;
  }
  return node.innerText;
}

/**
 * @return {HTMLDivElement}
 */
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
