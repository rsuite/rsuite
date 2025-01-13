import { act, renderHook } from '@testing-library/react';
import sinon from 'sinon';
import useTimeout from '../useTimeout';

afterEach(() => {
  sinon.restore();
});

describe('internals/hooks/useTimeout', () => {
  it('Should return clear and reset functions', () => {
    const { result } = renderHook(() => useTimeout(() => void 0, 10));

    expect(result.current.clear).to.be.a('function');
    expect(result.current.reset).to.be.a('function');
  });

  it('Should call passed function after given amount of time', () => {
    const clock = sinon.useFakeTimers();
    const callback = sinon.spy();

    renderHook(() => useTimeout(callback, 10));

    clock.tick(5);
    expect(callback).not.to.be.calledOnce;

    clock.tick(5);
    expect(callback).to.be.calledOnce;
  });

  it('Should cancel timeout', () => {
    const clock = sinon.useFakeTimers();
    const callback = sinon.spy();

    const { result } = renderHook(() => useTimeout(callback, 10));

    act(() => {
      result.current.clear();
    });

    clock.tick(10);
    expect(callback).not.to.have.been.called;
  });

  it('Should reset timeout', () => {
    const clock = sinon.useFakeTimers();
    const callback = sinon.spy();

    const { result } = renderHook(() => useTimeout(callback, 10));

    act(() => {
      result.current.clear();
    });

    clock.tick(10);
    expect(callback).not.to.have.been.called;

    act(() => {
      result.current.reset();
    });

    clock.tick(10);
    expect(callback).to.have.been.calledOnce;
  });

  it('Should reset timeout on delay change', () => {
    const clock = sinon.useFakeTimers();
    const callback = sinon.spy();

    const { rerender } = renderHook(({ delay, cb }) => useTimeout(cb, delay), {
      initialProps: { delay: 20, cb: callback }
    });

    rerender({ delay: 5, cb: callback });

    clock.tick(5);

    expect(callback).to.have.been.calledOnce;
  });
});
