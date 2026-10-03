import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import useMediaQuery from '../useMediaQuery';

describe('useMediaQuery SSR', () => {
  it.each([true, false])('Should return unmatched queries when enabled=%s', enabled => {
    function MediaQueries() {
      const matches = useMediaQuery(['xs', 'md'], enabled);
      return React.createElement('span', null, JSON.stringify(matches));
    }

    expect(renderToString(React.createElement(MediaQueries))).toBe('<span>[false,false]</span>');
  });
});
