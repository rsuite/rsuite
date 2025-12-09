/**
 * @vitest-environment node
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import Box from '../Box';

describe('Box SSR', () => {
  it('should render with data-rs attribute when box props are provided', () => {
    const html = renderToString(
      <Box width="200px" padding="20px">
        Test Content
      </Box>
    );

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Test Content');
  });

  it('should not have data-rs when no box props are provided', () => {
    const html = renderToString(<Box>Plain Content</Box>);

    // Should not have data-rs attribute
    expect(html).not.toContain('data-rs');
    expect(html).toContain('Plain Content');
  });

  it('should have data-rs when showFrom is provided', () => {
    const html = renderToString(<Box showFrom="md">Responsive Content</Box>);

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Responsive Content');
  });

  it('should have data-rs when hideFrom is provided', () => {
    const html = renderToString(<Box hideFrom="lg">Responsive Content</Box>);

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Responsive Content');
  });

  it('should render with responsive props', () => {
    const html = renderToString(
      <Box width={{ xs: '100%', md: '50%', lg: '300px' }} padding="20px">
        Responsive Box
      </Box>
    );

    // Should have data-rs attribute
    expect(html).toContain('data-rs="box"');
    expect(html).toContain('Responsive Box');
  });
});
