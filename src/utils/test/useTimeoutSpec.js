import { act } from '@testing-library/react';
import { renderHook } from '@test/testUtils';
import useTimeout from '../useTimeout';

afterEach(() => {
  sinon.restore();
});

describe('[utils] useTimeput', () => {
  it('Should return clear and reset functions', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const hook = renderHook(() => useTimeout(() => {}, 10));

    assert.equal(typeof hook.result.current.clear, 'function');
    assert.equal(typeof hook.result.current.reset, 'function');
  });

  it('Should call passed function after given amount of time', () => {
    const clock = sinon.useFakeTimers();
    const callbackSpy = sinon.spy();

    renderHook(() => useTimeout(callbackSpy, 10));

    clock.tick(5);
    assert.isFalse(callbackSpy.calledOnce);

    clock.tick(5);
    assert.isTrue(callbackSpy.calledOnce);
  });

  it('Should cancel timeout', () => {
    const clock = sinon.useFakeTimers();
    const callbackSpy = sinon.spy();

    const hook = renderHook(() => useTimeout(callbackSpy, 10));

    act(() => {
      hook.result.current.clear();
    });

    clock.tick(10);
    assert.isFalse(callbackSpy.calledOnce);
  });

  it('Should reset timeout', () => {
    const clock = sinon.useFakeTimers();
    const callbackSpy = sinon.spy();

    const hook = renderHook(() => useTimeout(callbackSpy, 10));

    act(() => {
      hook.result.current.clear();
    });

    clock.tick(10);
    assert.isFalse(callbackSpy.calledOnce);

    act(() => {
      hook.result.current.reset();
    });

    clock.tick(10);
    assert.isTrue(callbackSpy.calledOnce);
  });

  it('Should reset timeout on delay change', () => {
    const clock = sinon.useFakeTimers();
    const callbackSpy = sinon.spy();

    const hook = renderHook(({ delay, cb }) => useTimeout(cb, delay), {
      initialProps: { delay: 20, cb: callbackSpy }
    });

    hook.rerender({ delay: 5, cb: callbackSpy });

    clock.tick(5);

    assert.isTrue(callbackSpy.calledOnce);
  });
});
