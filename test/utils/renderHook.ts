import React from 'react';

// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
import * as testLibrary from '@testing-library/react';

// Check React major version
const majorVersion = parseInt(React.version, 10);

let renderHook;

/**
 * Conditionally load the appropriate renderHook function based on React version.
 */
if (majorVersion >= 18) {
  renderHook = testLibrary['renderHook'];
} else {
  // Import for React 17
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { renderHook: renderHook17 } = require('@testing-library/react-hooks/dom');
  renderHook = renderHook17;
}

// Export renderHook for use in tests
export { renderHook };
