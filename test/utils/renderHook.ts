import React from 'react';

// https://github.com/testing-library/react-hooks-testing-library#a-note-about-react-18-support
import * as testLibrary from '@testing-library/react';

const majorVersion = parseInt(React.version);

/**
 * @type {typeof import('@testing-library/react-hooks').renderHook}
 */
export const renderHook =
  majorVersion >= 18
    ? testLibrary['renderHook']
    : ((async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { renderHook: renderHook17 } = await import('@testing-library/react-hooks/dom');
        return renderHook17;
      })() as any);
