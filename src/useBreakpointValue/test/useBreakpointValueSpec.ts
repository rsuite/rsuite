import { act, renderHook } from '@testing-library/react';
import MatchMediaMock from '@test/mocks/matchmedia-mock';
import useBreakpointValue from '../useBreakpointValue';

let matchMedia: MatchMediaMock;

describe('useBreakpointValue', () => {
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

  it('Should return the default value', () => {
    const { result } = renderHook(() => useBreakpointValue({}, { defaultValue: true }));

    expect(result.current).to.be.equal(true);
  });

  it('Should return the value of the breakpoint', () => {
    act(() => window.resizeTo(576, 1000));

    const { result } = renderHook(() =>
      useBreakpointValue({ sm: '14px' }, { defaultValue: '16px' })
    );

    expect(result.current).to.be.equal('14px');
  });

  it('Should return the media query value', () => {
    act(() => window.resizeTo(400, 1000));

    const { result } = renderHook(() =>
      useBreakpointValue({ '(min-width: 400px)': '14px' }, { defaultValue: '16px' })
    );

    expect(result.current).to.be.equal('14px');
  });
});
