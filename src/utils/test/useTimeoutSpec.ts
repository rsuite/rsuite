import { act } from '@testing-library/react';
import sinon from 'sinon';
import { renderHook } from '@test/utils';
import useTimeout from '../useTimeout';

afterEach(() => {
  sinon.restore();
});

describe('[utils] useTimeput', () => {
  it('Should return clear and reset functions', () => {
    const { result } = renderHook(() => useTimeout(() => void 0, 10));

    expect(result.current.clear).to.be.a('function');
    expect(result.current.reset).to.be.a('function');
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

    const { result } = renderHook(() => useTimeout(callbackSpy, 10));

    act(() => {
      result.current.clear();
    });

    clock.tick(10);
    expect(callbackSpy).not.to.have.been.called;
  });

  it('Should reset timeout', () => {
    const clock = sinon.useFakeTimers();
    const callbackSpy = sinon.spy();

    const { result } = renderHook(() => useTimeout(callbackSpy, 10));

    act(() => {
      result.current.clear();
    });

    clock.tick(10);
    expect(callbackSpy).not.to.have.been.called;

    act(() => {
      result.current.reset();
    });

    clock.tick(10);
    expect(callbackSpy).to.have.been.calledOnce;
  });

  it('Should reset timeout on delay change', () => {
    const clock = sinon.useFakeTimers();
    const callbackSpy = sinon.spy();

    const { rerender } = renderHook(({ delay, cb }) => useTimeout(cb, delay), {
      initialProps: { delay: 20, cb: callbackSpy }
    });

    rerender({ delay: 5, cb: callbackSpy });

    clock.tick(5);

    expect(callbackSpy).to.have.been.calledOnce;
  });
});
