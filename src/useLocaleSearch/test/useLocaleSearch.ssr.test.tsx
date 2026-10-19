import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import useLocaleSearch from '..';

describe('useLocaleSearch SSR', () => {
  it.each([true, false])(
    'Should render without text extraction or Intl access (enabled=%s)',
    enabled => {
      const getText = vi.fn((item: string) => item);
      const collator = Object.getOwnPropertyDescriptor(Intl, 'Collator')!;
      const segmenter = Object.getOwnPropertyDescriptor(Intl, 'Segmenter')!;
      const access = vi.fn(() => {
        throw new Error('Intl accessed during SSR');
      });
      Object.defineProperty(Intl, 'Collator', { configurable: true, get: access });
      Object.defineProperty(Intl, 'Segmenter', { configurable: true, get: access });
      try {
        function Probe() {
          const result = useLocaleSearch({
            items: ['Café'],
            query: 'cafe',
            getText,
            enabled,
            locale: 'invalid_locale'
          });
          return <output>{[result.status, result.loading, result.items.length].join(':')}</output>;
        }
        expect(renderToString(<Probe />)).toBe(
          `<output>${enabled ? 'pending:true' : 'idle:false'}:0</output>`
        );
        expect(getText).not.toHaveBeenCalled();
        expect(access).not.toHaveBeenCalled();
      } finally {
        Object.defineProperty(Intl, 'Collator', collator);
        Object.defineProperty(Intl, 'Segmenter', segmenter);
      }
    }
  );
});
