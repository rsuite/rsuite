import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import Affix from '../Affix';

describe('Affix server rendering', () => {
  it('renders its content without evaluating browser-only targets', () => {
    const container = vi.fn(() => {
      throw new Error('The container should only be resolved after mounting');
    });

    const html = renderToString(
      <Affix as="section" container={container} top={24} aria-label="Actions">
        <button>Save</button>
      </Affix>
    );

    expect(html).toContain('<section');
    expect(html).toContain('aria-label="Actions"');
    expect(html).toContain('<button>Save</button>');
    expect(html).not.toContain('position:fixed');
    expect(container).not.toHaveBeenCalled();
  });
});
