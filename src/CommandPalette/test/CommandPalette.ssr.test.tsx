import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import CommandPalette from '../CommandPalette';

describe('CommandPalette server rendering', () => {
  it.each([false, true])(
    'does not access the DOM, construct Intl or invoke callbacks (open=%s)',
    open => {
      expect(typeof window).toBe('undefined');
      expect(typeof document).toBe('undefined');
      const collator = vi.spyOn(Intl, 'Collator');
      const segmenter = vi.spyOn(Intl, 'Segmenter');
      const callback = vi.fn();
      try {
        const html = renderToString(
          <>
            <CommandPalette
              open={open}
              title="Commands"
              data={[{ value: 0, label: 'Settings' }]}
              ref={callback}
              inputRef={callback}
              onOpen={callback}
              onSelect={callback}
              searchLocale="invalid_locale"
            />
            <CommandPalette open={open} title="More commands" data={[]} />
          </>
        );
        expect(html).toBe('');
        expect(collator).not.toHaveBeenCalled();
        expect(segmenter).not.toHaveBeenCalled();
        expect(callback).not.toHaveBeenCalled();
      } finally {
        collator.mockRestore();
        segmenter.mockRestore();
      }
    }
  );
});
