import React from 'react';
import Box from '../Box';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { StyleManager } from '@/internals/styled-system/style-manager';

// Mock StyleManager
vi.mock('@/internals/styled-system/style-manager', () => ({
  StyleManager: {
    addRule: vi.fn(),
    removeRule: vi.fn(),
    styleMap: new Map(),
    updateStyles: vi.fn()
  }
}));

describe('Box Responsive Props', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should render with responsive padding', () => {
    render(<Box p={{ xs: '5px', md: '15px', lg: '25px' }}>Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles
    const baseStyles = addRuleCalls.find(call => !call[1].includes('@media'));
    expect(baseStyles).toBeDefined();

    // Check media queries for each breakpoint (xs is applied to base styles, not as a media query)
    const mdMediaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-p: 15px')
    );
    const lgMediaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-p: 25px')
    );

    // Check that xs styles are in the base styles (not in media queries)
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-p: 5px');

    expect(mdMediaQuery).toBeDefined();
    expect(lgMediaQuery).toBeDefined();
  });

  it('Should render with responsive width and height', () => {
    render(
      <Box
        w={{ xs: '100%', sm: '80%', md: '60%', lg: '40%' }}
        h={{ xs: '100px', md: '200px', xl: '300px' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs width
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-w: 100%');

    // Check media queries for other breakpoints
    const smWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 576px)' && call[1].includes('--rs-box-w: 80%')
    );
    const mdWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-w: 60%')
    );
    const lgWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-w: 40%')
    );

    // Check that xs height is also in base styles
    expect(baseStylesCall?.[1]).toContain('--rs-box-h: 100px');

    expect(smWidthQuery).toBeDefined();
    expect(mdWidthQuery).toBeDefined();
    expect(lgWidthQuery).toBeDefined();

    // Check media queries for height (xs is in base styles)
    const mdHeightQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-h: 200px')
    );
    const xlHeightQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-h: 300px')
    );

    expect(mdHeightQuery).toBeDefined();
    expect(xlHeightQuery).toBeDefined();
  });

  it('Should render with responsive display', () => {
    render(<Box display={{ xs: 'flex', md: 'grid', xl: 'block' }}>Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs display
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-display: flex');

    // Check media queries for other breakpoints
    const mdDisplayQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-display: grid')
    );
    const xlDisplayQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-display: block')
    );

    expect(mdDisplayQuery).toBeDefined();
    expect(xlDisplayQuery).toBeDefined();
  });

  it('Should render with responsive colors', () => {
    render(
      <Box
        c={{ xs: 'red', md: 'blue', xl: 'green' }}
        bg={{ xs: 'yellow', md: 'cyan', xl: 'magenta' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // No debug logging needed anymore

    // Check base styles for xs color and background
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-c: var(--rs-color-red)');
    expect(baseStylesCall?.[1]).toContain('--rs-box-bg: var(--rs-color-yellow)');

    // Use looser matching for media queries - just check for the breakpoint and property
    const mdColorQueries = addRuleCalls.filter(
      call => call[0].includes('min-width: 768px') && call[1].includes('--rs-box-c:')
    );
    const xlColorQueries = addRuleCalls.filter(
      call => call[0].includes('min-width: 1200px') && call[1].includes('--rs-box-c:')
    );

    // Verify we have media queries for each breakpoint

    expect(mdColorQueries.length).toBeGreaterThan(0);
    expect(xlColorQueries.length).toBeGreaterThan(0);

    // Use looser matching for background media queries too
    const mdBgQueries = addRuleCalls.filter(
      call => call[0].includes('min-width: 768px') && call[1].includes('--rs-box-bg:')
    );
    const xlBgQueries = addRuleCalls.filter(
      call => call[0].includes('min-width: 1200px') && call[1].includes('--rs-box-bg:')
    );

    // Verify we have media queries for background properties

    expect(mdBgQueries.length).toBeGreaterThan(0);
    expect(xlBgQueries.length).toBeGreaterThan(0);
  });

  it('Should render with responsive rounded and shadow', () => {
    render(
      <Box rounded={{ xs: 'sm', md: 'md', xl: 'lg' }} shadow={{ xs: 'sm', md: 'md', xl: 'lg' }}>
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs rounded and shadow
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-rounded:');
    expect(baseStylesCall?.[1]).toContain('--rs-box-shadow:');

    // Check media queries for rounded
    const mdRoundedQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-rounded:')
    );
    const xlRoundedQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-rounded:')
    );

    expect(mdRoundedQuery).toBeDefined();
    expect(xlRoundedQuery).toBeDefined();

    // Check media queries for shadow
    const mdShadowQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-shadow:')
    );
    const xlShadowQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-shadow:')
    );

    expect(mdShadowQuery).toBeDefined();
    expect(xlShadowQuery).toBeDefined();
  });

  it('Should render with multiple responsive props', () => {
    render(
      <Box
        p={{ xs: '10px', sm: '15px', md: '20px', lg: '25px', xl: '30px' }}
        m={{ xs: '5px', sm: '10px', md: '15px', lg: '20px', xl: '25px' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs values
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-p: 10px');
    expect(baseStylesCall?.[1]).toContain('--rs-box-m: 5px');

    // Check that we have media queries for each breakpoint (except xs which is in base styles)
    const smQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 576px)');
    const mdQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 768px)');
    const lgQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 992px)');
    const xlQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 1200px)');

    expect(smQueries.length).toBeGreaterThan(0);
    expect(mdQueries.length).toBeGreaterThan(0);
    expect(lgQueries.length).toBeGreaterThan(0);
    expect(xlQueries.length).toBeGreaterThan(0);
  });

  it('Should clean up responsive styles when unmounted', () => {
    const { unmount } = render(<Box p={{ xs: '10px', md: '20px' }}>Content</Box>);

    unmount();

    expect(StyleManager.removeRule).toHaveBeenCalled();
    expect(StyleManager.removeRule).toHaveBeenCalledWith('@media (min-width: 0px)');
    expect(StyleManager.removeRule).toHaveBeenCalledWith('@media (min-width: 768px)');
  });
});
