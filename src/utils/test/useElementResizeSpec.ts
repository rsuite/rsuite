import sinon from 'sinon';
import { renderHook } from '@test/utils';
import useElementResize from '../useElementResize';
import { act, waitFor } from '@testing-library/react';

afterEach(() => {
  sinon.restore();
});

describe('[utils] useElementResize', () => {
  it('should be defined', () => {
    expect(useElementResize).to.be.exist;
  });

  it('should be called after a change in size', async () => {
    const target = document.createElement('div');
    const callbackSpy = sinon.spy();

    document.body.appendChild(target);

    renderHook(() => useElementResize(target, callbackSpy));

    act(() => {
      target.style.width = '100px';
      target.style.height = '100px';
    });

    await waitFor(() => {
      // ResizeObserver first fires a resize event
      const { width, height } = callbackSpy.firstCall.args[0][0].contentRect;

      expect(callbackSpy).to.have.been.calledOnce;
      expect(width).to.equal(100);
      expect(height).to.equal(100);
    });

    act(() => {
      target.style.width = '200px';
    });

    await waitFor(() => {
      // ResizeObserver second fires a resize event
      const { width, height } = callbackSpy.secondCall.args[0][0].contentRect;

      expect(callbackSpy).to.have.been.calledTwice;
      expect(width).to.equal(200);
      expect(height).to.equal(100);
    });
  });
});
