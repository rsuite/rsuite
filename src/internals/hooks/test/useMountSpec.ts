import sinon from 'sinon';
import useMount from '../useMount';
import { renderHook } from '@testing-library/react';

describe('internals/hooks/useMount', () => {
  it('should call provided callback on mount', () => {
    const callback = sinon.spy();

    renderHook(() => useMount(callback));

    expect(callback).to.be.calledOnce;
  });

  it('should not call provided callback on unmount', () => {
    const callback = sinon.spy();

    const { unmount } = renderHook(() => useMount(callback));

    expect(callback).to.be.calledOnce;

    unmount();

    expect(callback).to.be.calledOnce;
  });

  it('should not call provided callback on rerender', () => {
    const callback = sinon.spy();

    const { rerender } = renderHook(() => useMount(callback));

    expect(callback).to.be.calledOnce;

    rerender();

    expect(callback).to.be.calledOnce;
  });
});
