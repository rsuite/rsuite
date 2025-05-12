import MatchMediaMock from '@test/mocks/matchmedia-mock';
import useMediaQuery from '../useMediaQuery';
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

let matchMedia: MatchMediaMock;

describe('useMediaQuery', () => {
  beforeEach(() => {
    matchMedia = new MatchMediaMock();

    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height
      }).dispatchEvent(new this.Event('resize'));
    };
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it('Should match the breakpoint correctly', () => {
    act(() => window.resizeTo(400, 1000));
    const { result } = renderHook(() => useMediaQuery('(min-width: 400px)'));

    expect(result.current).to.be.deep.equal([true]);
  });

  it('Should respond to screen size changes', () => {
    act(() => window.resizeTo(400, 1000));
    const { result } = renderHook(() => useMediaQuery('(min-width: 400px)'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(399, 1000));
    expect(result.current).to.be.deep.equal([false]);

    act(() => window.resizeTo(410, 1000));
    expect(result.current).to.be.deep.equal([true]);
  });

  it('Should match the breakpoint correctly with mediaQuerySizeMap.xs', () => {
    act(() => window.resizeTo(575, 1000));
    const { result } = renderHook(() => useMediaQuery('xs'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(576, 1000));

    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should match the breakpoint correctly with mediaQuerySizeMap.sm', () => {
    act(() => window.resizeTo(576, 1000));
    const { result } = renderHook(() => useMediaQuery('sm'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(575, 1000));

    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should match the breakpoint correctly with mediaQuerySizeMap.md', () => {
    act(() => window.resizeTo(768, 1000));
    const { result } = renderHook(() => useMediaQuery('md'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(767, 1000));

    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should match the breakpoint correctly with mediaQuerySizeMap.lg', () => {
    act(() => window.resizeTo(992, 1000));
    const { result } = renderHook(() => useMediaQuery('lg'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(991, 1000));

    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should match the breakpoint correctly with mediaQuerySizeMap.xl', () => {
    act(() => window.resizeTo(1200, 1000));
    const { result } = renderHook(() => useMediaQuery('xl'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(1199, 1000));

    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should match the breakpoint correctly with mediaQuerySizeMap.xxl', () => {
    act(() => window.resizeTo(1400, 1000));
    const { result } = renderHook(() => useMediaQuery('xxl'));

    expect(result.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(1399, 1000));

    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should correctly match multiple query values', () => {
    act(() => window.resizeTo(575, 1000));

    const { result } = renderHook(() =>
      useMediaQuery([
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
        '(min-width: 576px) and (max-width: 1200px)'
      ])
    );

    expect(result.current).to.be.deep.equal([true, false, false, false, false, false, false]);

    act(() => window.resizeTo(576, 1000));
    expect(result.current).to.be.deep.equal([false, true, false, false, false, false, true]);

    act(() => window.resizeTo(768, 1000));
    expect(result.current).to.be.deep.equal([false, true, true, false, false, false, true]);

    act(() => window.resizeTo(992, 1000));
    expect(result.current).to.be.deep.equal([false, true, true, true, false, false, true]);

    act(() => window.resizeTo(1200, 1000));
    expect(result.current).to.be.deep.equal([false, true, true, true, true, false, true]);

    act(() => window.resizeTo(1400, 1000));
    expect(result.current).to.be.deep.equal([false, true, true, true, true, true, false]);
  });

  // New test cases for enhanced breakpoint features
  it('Should match the "Only" breakpoint conditions correctly', () => {
    // Test mdOnly (768px to 991.99px)
    act(() => window.resizeTo(767, 1000));
    const { result: mdOnlyResult } = renderHook(() =>
      useMediaQuery('(min-width: 768px) and (max-width: 991.99px)')
    );
    expect(mdOnlyResult.current).to.be.deep.equal([false]);

    act(() => window.resizeTo(768, 1000));
    expect(mdOnlyResult.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(991, 1000));
    expect(mdOnlyResult.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(992, 1000));
    expect(mdOnlyResult.current).to.be.deep.equal([false]);
  });

  it('Should match the "Down" breakpoint conditions correctly', () => {
    // Test lgDown (max-width: 991.99px)
    act(() => window.resizeTo(991, 1000));
    const { result: lgDownResult } = renderHook(() => useMediaQuery('(max-width: 991.99px)'));
    expect(lgDownResult.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(992, 1000));
    expect(lgDownResult.current).to.be.deep.equal([false]);
  });

  it('Should match the range breakpoint conditions correctly', () => {
    // Test smToLg (576px to 991.99px)
    act(() => window.resizeTo(575, 1000));
    const { result: smToLgResult } = renderHook(() =>
      useMediaQuery('(min-width: 576px) and (max-width: 991.99px)')
    );
    expect(smToLgResult.current).to.be.deep.equal([false]);

    act(() => window.resizeTo(576, 1000));
    expect(smToLgResult.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(991, 1000));
    expect(smToLgResult.current).to.be.deep.equal([true]);

    act(() => window.resizeTo(992, 1000));
    expect(smToLgResult.current).to.be.deep.equal([false]);
  });

  it('Should handle multiple enhanced breakpoint conditions', () => {
    act(() => window.resizeTo(768, 1000));
    const { result } = renderHook(() =>
      useMediaQuery([
        '(min-width: 768px) and (max-width: 991.99px)',
        '(max-width: 991.99px)',
        '(min-width: 576px) and (max-width: 991.99px)'
      ])
    );

    expect(result.current).to.be.deep.equal([true, true, true]);

    act(() => window.resizeTo(1200, 1000));
    expect(result.current).to.be.deep.equal([false, false, false]);
  });

  it('Should handle non-existent breakpoint names gracefully', () => {
    act(() => window.resizeTo(768, 1000));
    const { result } = renderHook(() => useMediaQuery('nonExistentBreakpoint' as any));

    // Should return false for non-existent breakpoint names
    expect(result.current).to.be.deep.equal([false]);
  });

  // Test cases for the 'enabled' parameter
  it('Should return false when enabled is set to false', () => {
    act(() => window.resizeTo(768, 1000));
    const { result } = renderHook(() => useMediaQuery('md', false));

    // Should return false even though the media query would match
    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should not respond to screen size changes when disabled', () => {
    act(() => window.resizeTo(768, 1000));
    const { result } = renderHook(() => useMediaQuery('md', false));

    expect(result.current).to.be.deep.equal([false]);

    // Change window size to match a different breakpoint
    act(() => window.resizeTo(1200, 1000));

    // Should still return false despite window size change
    expect(result.current).to.be.deep.equal([false]);
  });

  it('Should handle multiple queries when disabled', () => {
    act(() => window.resizeTo(768, 1000));
    const { result } = renderHook(() => useMediaQuery(['xs', 'sm', 'md', 'lg', 'xl'], false));

    // Should return an array of false values with the same length as the query array
    expect(result.current).to.be.deep.equal([false, false, false, false, false]);
  });

  it('Should respond to enabled prop changes', () => {
    act(() => window.resizeTo(768, 1000));

    // Test with enabled=true
    const { result: enabledResult } = renderHook(() => useMediaQuery('md', true));
    expect(enabledResult.current).to.be.deep.equal([true]);

    // Test with enabled=false
    const { result: disabledResult } = renderHook(() => useMediaQuery('md', false));
    expect(disabledResult.current).to.be.deep.equal([false]);
  });
});
