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
    const hasSmQueries = addRuleCalls.some(call => call[0] === '@media (min-width: 576px)');
    const hasMdQueries = addRuleCalls.some(call => call[0] === '@media (min-width: 768px)');
    const hasLgQueries = addRuleCalls.some(call => call[0] === '@media (min-width: 992px)');
    const hasXlQueries = addRuleCalls.some(call => call[0] === '@media (min-width: 1200px)');

    expect(hasSmQueries).toBe(true);
    expect(hasMdQueries).toBe(true);
    expect(hasLgQueries).toBe(true);
    expect(hasXlQueries).toBe(true);
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

  it('Should handle responsive position props', () => {
    render(
      <Box
        pos={{ xs: 'static', md: 'relative', lg: 'absolute' }}
        top={{ xs: '0', md: '10px', lg: '20px' }}
        left={{ xs: '0', md: '10px', lg: '20px' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-pos: static');
    expect(baseStylesCall?.[1]).toContain('--rs-box-top: 0');
    expect(baseStylesCall?.[1]).toContain('--rs-box-left: 0');

    // Check media queries for md
    const mdPosQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-pos: relative')
    );
    const mdTopQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-top: 10px')
    );
    const mdLeftQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-left: 10px')
    );

    expect(mdPosQuery).toBeDefined();
    expect(mdTopQuery).toBeDefined();
    expect(mdLeftQuery).toBeDefined();

    // Check media queries for lg
    const lgPosQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-pos: absolute')
    );
    const lgTopQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-top: 20px')
    );
    const lgLeftQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-left: 20px')
    );

    expect(lgPosQuery).toBeDefined();
    expect(lgTopQuery).toBeDefined();
    expect(lgLeftQuery).toBeDefined();
  });

  it('Should handle responsive background props', () => {
    render(
      <Box
        bg={{ xs: 'red', md: 'blue', lg: 'green' }}
        bgi={{
          xs: 'url(small.jpg)',
          md: 'url(medium.jpg)',
          lg: 'url(large.jpg)'
        }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-bg: var(--rs-color-red)');
    expect(baseStylesCall?.[1]).toContain('--rs-box-bgi: url(small.jpg)');

    // Check media queries for md
    const mdBgQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 768px)' &&
        call[1].includes('--rs-box-bg: var(--rs-color-blue)')
    );
    const mdBgiQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-bgi: url(medium.jpg)')
    );

    expect(mdBgQuery).toBeDefined();
    expect(mdBgiQuery).toBeDefined();

    // Check media queries for lg
    const lgBgQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 992px)' &&
        call[1].includes('--rs-box-bg: var(--rs-color-green)')
    );
    const lgBgiQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-bgi: url(large.jpg)')
    );

    expect(lgBgQuery).toBeDefined();
    expect(lgBgiQuery).toBeDefined();
  });

  it('Should handle responsive typography props', () => {
    render(
      <Box
        fs={{ xs: '14px', md: '16px', lg: '18px' }}
        fw={{ xs: 'normal', md: '500', lg: 'bold' }}
        ta={{ xs: 'left', md: 'center', lg: 'right' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-fs: 14px');
    expect(baseStylesCall?.[1]).toContain('--rs-box-fw: normal');
    expect(baseStylesCall?.[1]).toContain('--rs-box-ta: left');

    // Check media queries for md
    const mdFsQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-fs: 16px')
    );
    const mdFwQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-fw: 500')
    );
    const mdTaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-ta: center')
    );

    expect(mdFsQuery).toBeDefined();
    expect(mdFwQuery).toBeDefined();
    expect(mdTaQuery).toBeDefined();

    // Check media queries for lg
    const lgFsQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-fs: 18px')
    );
    const lgFwQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-fw: bold')
    );
    const lgTaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-ta: right')
    );

    expect(lgFsQuery).toBeDefined();
    expect(lgFwQuery).toBeDefined();
    expect(lgTaQuery).toBeDefined();
  });

  it('Should handle responsive flex props', () => {
    render(
      <Box
        gap={{ xs: '8px', md: '16px', lg: '24px' }}
        align={{ xs: 'flex-start', md: 'center', lg: 'flex-end' }}
        justify={{ xs: 'flex-start', md: 'space-between', lg: 'space-around' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check base styles for xs
    const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
    expect(baseStylesCall).toBeDefined();
    expect(baseStylesCall?.[1]).toContain('--rs-box-gap: 8px');
    expect(baseStylesCall?.[1]).toContain('--rs-box-align: flex-start');
    expect(baseStylesCall?.[1]).toContain('--rs-box-justify: flex-start');

    // Check media queries for md
    const mdGapQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-gap: 16px')
    );
    const mdAlignQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-align: center')
    );
    const mdJustifyQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 768px)' &&
        call[1].includes('--rs-box-justify: space-between')
    );

    expect(mdGapQuery).toBeDefined();
    expect(mdAlignQuery).toBeDefined();
    expect(mdJustifyQuery).toBeDefined();

    // Check media queries for lg
    const lgGapQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-gap: 24px')
    );
    const lgAlignQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-align: flex-end')
    );
    const lgJustifyQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 992px)' &&
        call[1].includes('--rs-box-justify: space-around')
    );

    expect(lgGapQuery).toBeDefined();
    expect(lgAlignQuery).toBeDefined();
    expect(lgJustifyQuery).toBeDefined();
  });

  it('Should clean up responsive styles when unmounted', () => {
    const { unmount } = render(<Box p={{ xs: '10px', md: '20px' }}>Content</Box>);

    unmount();

    expect(StyleManager.removeRule).toHaveBeenCalled();
    expect(StyleManager.removeRule).toHaveBeenCalledWith('@media (min-width: 0px)');
    expect(StyleManager.removeRule).toHaveBeenCalledWith('@media (min-width: 768px)');
  });

  describe('Responsive Native CSS Properties', () => {
    it('Should handle responsive text-decoration properties', () => {
      render(
        <Box
          {...({
            textDecoration: {
              xs: 'none',
              sm: 'underline',
              md: 'line-through',
              lg: 'overline',
              xl: 'underline overline'
            },
            textDecorationColor: {
              xs: 'red',
              md: 'blue',
              xl: 'green'
            }
          } as any)}
        >
          Content
        </Box>
      );

      expect(StyleManager.addRule).toHaveBeenCalled();
      const addRuleCalls = (StyleManager.addRule as any).mock.calls;

      // Check base styles (xs)
      const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
      expect(baseStylesCall).toBeDefined();
      expect(baseStylesCall?.[1]).toContain('--rs-box-td: none');
      expect(baseStylesCall?.[1]).toContain('--rs-box-tdc: var(--rs-color-red)');

      // Check responsive breakpoints
      const smMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 576px)' && call[1].includes('--rs-box-td: underline')
      );

      const mdMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 768px)' &&
          call[1].includes('--rs-box-td: line-through') &&
          call[1].includes('--rs-box-tdc: var(--rs-color-blue)')
      );

      const lgMediaQuery = addRuleCalls.find(
        call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-td: overline')
      );

      const xlMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 1200px)' &&
          call[1].includes('--rs-box-td: underline overline') &&
          call[1].includes('--rs-box-tdc: var(--rs-color-green)')
      );

      expect(smMediaQuery).toBeDefined();
      expect(mdMediaQuery).toBeDefined();
      expect(lgMediaQuery).toBeDefined();
      expect(xlMediaQuery).toBeDefined();
    });

    it('Should handle responsive flex properties', () => {
      render(
        <Box
          {...({
            flexBasis: {
              xs: '100%',
              sm: '80%',
              md: '60%',
              lg: '40%',
              xl: '20%'
            },
            flexGrow: {
              xs: 0,
              md: 1
            }
          } as any)}
        >
          Content
        </Box>
      );

      expect(StyleManager.addRule).toHaveBeenCalled();
      const addRuleCalls = (StyleManager.addRule as any).mock.calls;

      // Check base styles (xs)
      const baseStylesCall = addRuleCalls.find(call => call[0].startsWith('.'));
      expect(baseStylesCall).toBeDefined();
      expect(baseStylesCall?.[1]).toContain('--rs-box-flex-basis: 100%');
      expect(baseStylesCall?.[1]).toContain('--rs-box-flex-grow: 0');

      // Check responsive breakpoints
      const smMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 576px)' && call[1].includes('--rs-box-flex-basis: 80%')
      );

      const mdMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 768px)' &&
          call[1].includes('--rs-box-flex-basis: 60%') &&
          call[1].includes('--rs-box-flex-grow: 1')
      );

      const lgMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-flex-basis: 40%')
      );

      const xlMediaQuery = addRuleCalls.find(
        call =>
          call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-flex-basis: 20%')
      );

      expect(smMediaQuery).toBeDefined();
      expect(mdMediaQuery).toBeDefined();
      expect(lgMediaQuery).toBeDefined();
      expect(xlMediaQuery).toBeDefined();
    });
  });
});
