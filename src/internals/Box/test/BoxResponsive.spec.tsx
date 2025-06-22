import React from 'react';
import Box from '../Box';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import StyleManager from '@/internals/utils/style-sheet/style-manager';

// Mock StyleManager
vi.mock('@/internals/utils/style-sheet/style-manager', () => ({
  default: {
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

    // Check media queries for each breakpoint
    const xsMediaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 0px)' && call[1].includes('--rs-box-p: 5px')
    );
    const mdMediaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-p: 15px')
    );
    const lgMediaQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-p: 25px')
    );

    expect(xsMediaQuery).toBeDefined();
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

    // Check media queries for width
    const xsWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 0px)' && call[1].includes('--rs-box-w: 100%')
    );
    const smWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 576px)' && call[1].includes('--rs-box-w: 80%')
    );
    const mdWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-w: 60%')
    );
    const lgWidthQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 992px)' && call[1].includes('--rs-box-w: 40%')
    );

    expect(xsWidthQuery).toBeDefined();
    expect(smWidthQuery).toBeDefined();
    expect(mdWidthQuery).toBeDefined();
    expect(lgWidthQuery).toBeDefined();

    // Check media queries for height
    const xsHeightQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 0px)' && call[1].includes('--rs-box-h: 100px')
    );
    const mdHeightQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-h: 200px')
    );
    const xlHeightQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-h: 300px')
    );

    expect(xsHeightQuery).toBeDefined();
    expect(mdHeightQuery).toBeDefined();
    expect(xlHeightQuery).toBeDefined();
  });

  it('Should render with responsive display', () => {
    render(<Box display={{ xs: 'block', md: 'flex', xl: 'grid' }}>Content</Box>);

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check media queries for each breakpoint
    const xsDisplayQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 0px)' && call[1].includes('--rs-box-display: block')
    );
    const mdDisplayQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-display: flex')
    );
    const xlDisplayQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-display: grid')
    );

    expect(xsDisplayQuery).toBeDefined();
    expect(mdDisplayQuery).toBeDefined();
    expect(xlDisplayQuery).toBeDefined();
  });

  it('Should render with responsive colors', () => {
    render(
      <Box
        c={{ xs: 'red', md: 'blue.500', xl: '#000000' }}
        bg={{ xs: 'green.100', lg: 'blue.100' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check media queries for text color
    const xsColorQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 0px)' && call[1].includes('--rs-box-c:')
    );
    const mdColorQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 768px)' && call[1].includes('--rs-box-c:')
    );
    const xlColorQuery = addRuleCalls.find(
      call => call[0] === '@media (min-width: 1200px)' && call[1].includes('--rs-box-c:')
    );

    expect(xsColorQuery).toBeDefined();
    expect(mdColorQuery).toBeDefined();
    expect(xlColorQuery).toBeDefined();

    // Check media queries for background color
    const xsBgQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 0px)' &&
        call[1].includes('--rs-box-bg: var(--rs-green-100)')
    );
    const lgBgQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 992px)' &&
        call[1].includes('--rs-box-bg: var(--rs-blue-100)')
    );

    expect(xsBgQuery).toBeDefined();
    expect(lgBgQuery).toBeDefined();
  });

  it('Should render with responsive rounded and shadow', () => {
    render(
      <Box rounded={{ xs: 'sm', md: 'lg', xl: 'full' }} shadow={{ xs: 'sm', lg: 'lg' }}>
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check media queries for rounded
    const xsRoundedQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 0px)' &&
        call[1].includes('--rs-box-rounded: var(--rs-box-rounded-sm)')
    );
    const mdRoundedQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 768px)' &&
        call[1].includes('--rs-box-rounded: var(--rs-box-rounded-lg)')
    );
    const xlRoundedQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 1200px)' &&
        call[1].includes('--rs-box-rounded: var(--rs-box-rounded-full)')
    );

    expect(xsRoundedQuery).toBeDefined();
    expect(mdRoundedQuery).toBeDefined();
    expect(xlRoundedQuery).toBeDefined();

    // Check media queries for shadow
    const xsShadowQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 0px)' &&
        call[1].includes('--rs-box-shadow: var(--rs-box-shadow-sm)')
    );
    const lgShadowQuery = addRuleCalls.find(
      call =>
        call[0] === '@media (min-width: 992px)' &&
        call[1].includes('--rs-box-shadow: var(--rs-box-shadow-lg)')
    );

    expect(xsShadowQuery).toBeDefined();
    expect(lgShadowQuery).toBeDefined();
  });

  it('Should render with multiple responsive props', () => {
    render(
      <Box
        p={{ xs: '10px', md: '20px' }}
        m={{ xs: '5px', lg: '15px' }}
        w={{ xs: '100%', xl: '50%' }}
        h={{ sm: '200px', lg: '400px' }}
        display={{ xs: 'block', md: 'flex' }}
        c={{ xs: 'red', lg: 'blue' }}
        bg={{ xs: 'white', md: 'gray.100' }}
        rounded={{ xs: 'sm', lg: 'lg' }}
        shadow={{ xs: 'sm', xl: 'lg' }}
      >
        Content
      </Box>
    );

    expect(StyleManager.addRule).toHaveBeenCalled();
    const addRuleCalls = (StyleManager.addRule as any).mock.calls;

    // Check that we have media queries for each breakpoint
    const xsQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 0px)');
    const smQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 576px)');
    const mdQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 768px)');
    const lgQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 992px)');
    const xlQueries = addRuleCalls.filter(call => call[0] === '@media (min-width: 1200px)');

    expect(xsQueries.length).toBeGreaterThan(0);
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
