import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import useClipboard from '../useClipboard';

describe('useClipboard SSR', () => {
  it('Should render initial feedback without accessing browser globals', () => {
    function CopyButton() {
      const { copied, error } = useClipboard();
      return <button>{error ? 'Failed' : copied ? 'Copied' : 'Copy'}</button>;
    }

    expect(renderToString(<CopyButton />)).to.equal('<button>Copy</button>');
  });
});
