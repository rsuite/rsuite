import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import useAsyncSearch from '..';

describe('useAsyncSearch SSR', () => {
  it.each([true, false])(
    'Should render deterministic initial state without searching (enabled=%s)',
    enabled => {
      const search = vi.fn(() => ['server result']);
      function Probe() {
        const result = useAsyncSearch({ query: 'q', search, enabled });
        return <output>{[result.status, result.loading, result.items.length].join(':')}</output>;
      }
      expect(renderToString(<Probe />)).toBe(
        `<output>${enabled ? 'pending:true' : 'idle:false'}:0</output>`
      );
      expect(search).not.toHaveBeenCalled();
    }
  );
});
