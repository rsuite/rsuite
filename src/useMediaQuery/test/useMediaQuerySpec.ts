import { act, renderHook } from '@testing-library/react';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import useMediaQuery from '../useMediaQuery';

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
});
