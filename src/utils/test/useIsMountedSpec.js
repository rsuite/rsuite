import { renderHook } from '@test/testUtils';
import useIsMounted from '../useIsMounted';

describe('[utils] useIsMounted', () => {
  it('should be defined', () => {
    expect(useIsMounted).to.be.exist;
  });

  it('should return a function', () => {
    const hook = renderHook(() => useIsMounted(), { initialProps: false });

    expect(typeof hook.result.current).to.be.equal('function');
  });

  it('should return true if component is mounted', () => {
    const hook = renderHook(() => useIsMounted(), { initialProps: false });

    expect(hook.result.current()).to.be.true;
  });

  it('should return false if component is unmounted', () => {
    const hook = renderHook(() => useIsMounted(), { initialProps: false });

    hook.unmount();

    expect(hook.result.current()).to.be.false;
  });
});
