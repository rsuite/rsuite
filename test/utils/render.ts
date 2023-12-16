import React from 'react';
import * as ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';

// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
import * as testLibrary from '@testing-library/react';

const majorVersion = parseInt(React.version);

// Record every container created for rendering
// Useful for doing a cleanup after each test case
// Ref: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
const mountedContainers = new Set();
const mountedRoots = new Set();

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

// maybe one day we'll expose this (perhaps even as a utility returned by render).
// but let's wait until someone asks for it.
function cleanupAtContainer(container) {
  testLibrary['act'](() => {
    if (majorVersion < 18) {
      unmountComponentAtNode(container);
    }
  });
  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }
  mountedContainers.delete(container);
}

function cleanup() {
  mountedContainers.forEach(cleanupAtContainer);
  mountedRoots.forEach((root: any) => {
    testLibrary['act'](() => {
      root['unmount']?.();
    });
  });
}

afterEach(() => {
  cleanup();
});

/**
 * @todo Deprecate and remove usage of this util, use `render` from `@testing-library/react`
 */
export function render(children) {
  const container = createTestContainer();

  if (majorVersion >= 18) {
    /**
     * Fix react 18 warnings
     * Error: Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;

    const root = ReactDOM['createRoot']?.(container);
    root.render(children);

    mountedRoots.add(root);

    return container;
  }

  ReactDOM.render(children, container);

  return container;
}
