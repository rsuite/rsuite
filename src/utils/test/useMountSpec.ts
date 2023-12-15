import sinon from 'sinon';
import { renderHook } from '@test/utils';
import useMount from '../useMount';

describe('[utils] useMount', () => {
  it('should call provided callback on mount', () => {
    const callbackSpy = sinon.spy();

    renderHook(() => useMount(callbackSpy));

    assert.equal(callbackSpy.callCount, 1);
  });

  it('should not call provided callback on unmount', () => {
    const callbackSpy = sinon.spy();

    const { unmount } = renderHook(() => useMount(callbackSpy));

    assert.equal(callbackSpy.callCount, 1);

    unmount();

    assert.equal(callbackSpy.callCount, 1);
  });

  it('should not call provided callback on rerender', () => {
    const callbackSpy = sinon.spy();

    const { rerender } = renderHook(() => useMount(callbackSpy));

    assert.equal(callbackSpy.callCount, 1);

    rerender();

    assert.equal(callbackSpy.callCount, 1);
  });
});
