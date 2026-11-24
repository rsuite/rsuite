import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import MaskedInput from '../MaskedInput';

describe('MaskedInput server rendering', () => {
  it.each([{ mask: [/\d/, /\d/] }, { mask: false }, { mask: () => false as const }])(
    'renders a controlled input without a document',
    ({ mask }) => {
      expect(typeof document).toBe('undefined');
      expect(renderToString(<MaskedInput mask={mask} value="12" />)).toContain('value="12"');
      expect(renderToString(<MaskedInput mask={mask} defaultValue="34" />)).toContain('value="34"');
    }
  );
});
