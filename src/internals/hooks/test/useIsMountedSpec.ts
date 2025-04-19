import { renderHook } from '@testing-library/react';
import useIsMounted from '../useIsMounted';

describe('internals/hooks/useIsMounted', () => {
  it('should be defined', () => {
    expect(useIsMounted).to.be.exist;
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useIsMounted(), { initialProps: false });

    expect(result.current).to.be.a('function');
  });

  it('should return true if component is mounted', () => {
    const { result } = renderHook(() => useIsMounted(), { initialProps: false });

    expect(result.current()).to.be.true;
  });

  it('should return false if component is unmounted', () => {
    const { unmount, result } = renderHook(() => useIsMounted(), { initialProps: false });

    unmount();

    expect(result.current()).to.be.false;
  });
});
