import React from 'react';

// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
import * as testLibrary from '@testing-library/react';
import * as testLibrary17 from '@testing-library/react-hooks/dom';

const majorVersion = parseInt(React.version);

/**
 * @type {typeof import('@testing-library/react-hooks').renderHook}
 */
export const renderHook =
  majorVersion >= 18 ? testLibrary['renderHook'] : (testLibrary17['renderHook'] as any);
