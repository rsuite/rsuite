/* eslint-disable react/no-find-dom-node */

import React from 'react';
import * as ReactDOM from 'react-dom';
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { render as testRender } from '@testing-library/react';
import guid from '../src/utils/guid';

import getPalette from './getPalette';
import tinycolor from 'tinycolor2';
import getStyle from 'dom-lib/getStyle';

// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
import { act, renderHook as react18RenderHook } from '@testing-library/react';
import { renderHook as react17RenderHook } from '@testing-library/react-hooks/dom';

export { getStyle };
export const globalKey = 'rs';

const DEFAULT_PRIMARY_COLOR = '#3498ff';
const DARK_PRIMARY_COLOR = '#34c3ff';
const majorVersion = parseInt(React.version);

export const renderHook = majorVersion >= 18 ? react18RenderHook : react17RenderHook;

console.log('React version:', React.version);

export const getDefaultPalette = key => {
  if (!key) {
    return getPalette(DEFAULT_PRIMARY_COLOR);
  }
  return getDefaultPalette()[key];
};
export const getDarkPalette = () => getPalette(DARK_PRIMARY_COLOR);

/**
 * Get rgb color string identified by given key
 *
 * @param {string} key Less variable name @B000-B900
 *
 * @return {string} CSS color in rgb() notation
 */
export const getGrayScale = key => {
  // See Figma design
  const lessVariables = {
    B900: '#272c36',
    B800: '#575757',
    B700: '#7a7a7a',
    B600: '#8e8e93',
    B500: '#a6a6a6',
    B400: '#c5c6c7',
    B300: '#d9d9d9',
    B200: '#e5e5e5',
    B100: '#f2f2f5',
    B050: '#f7f7fa',
    B000: '#fff'
  };

  const hexColor = lessVariables[key];

  return tinycolor(hexColor).toRgbString();
};
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

// Record every container created for rendering
// Useful for doing a cleanup after each test case
// Ref: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
const mountedContainers = new Set();
const mountedRoots = new Set();

export function render(children) {
  const container = createTestContainer();

  if (majorVersion >= 18) {
    /**
     * Fix react 18 warnings
     * Error: Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;

    const { createRoot } = ReactDOM;

    const root = createRoot(container);
    root.render(children);

    mountedRoots.add(root);

    return container;
  }

  ReactDOM.render(children, container);

  return container;
}

export function cleanup() {
  mountedContainers.forEach(cleanupAtContainer);
  mountedRoots.forEach(root => {
    act(() => {
      root.unmount();
    });
  });
}

afterEach(() => {
  cleanup();
});

// maybe one day we'll expose this (perhaps even as a utility returned by render).
// but let's wait until someone asks for it.
function cleanupAtContainer(container) {
  act(() => {
    if (majorVersion < 18) {
      unmountComponentAtNode(container);
    }
  });
  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }
  mountedContainers.delete(container);
}

export function getInstance(children, waitForDidMount = true) {
  const instanceRef = React.createRef();

  if (waitForDidMount) {
    // Use act() to make sure componentDidMount/useEffect is done
    act(() => {
      render(React.cloneElement(children, { ref: instanceRef }));
    });
  } else {
    render(React.cloneElement(children, { ref: instanceRef }));
  }

  return instanceRef.current;
}

/**
 * @return {HTMLElement}
 */
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

export function getTestDOMNode(children) {
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

/**
 * @return {HTMLDivElement}
 */
export function createTestContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // we'll add it to the mounted containers regardless of whether it's actually
  // added to document.body so the cleanup method works regardless of whether
  // they're passing us a custom container or not.
  mountedContainers.add(container);

  return container;
}

export const toRGB = color => tinycolor(color).toRgbString();

export const inChrome = window.navigator.userAgent.includes('Chrome');

export const itChrome = (...args) => {
  if (inChrome) {
    it(...args);
  }
};
