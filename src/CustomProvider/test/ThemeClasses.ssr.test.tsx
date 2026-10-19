import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import CustomProvider from '../CustomProvider';

describe('CustomProvider theme server rendering', () => {
  it.each(['light', 'dark', 'high-contrast'] as const)(
    'renders the %s theme without a document',
    theme => {
      expect(typeof document).toBe('undefined');
      expect(
        renderToString(
          <CustomProvider theme={theme}>
            <span>Theme content</span>
          </CustomProvider>
        )
      ).toBe('<span>Theme content</span>');
    }
  );
});
