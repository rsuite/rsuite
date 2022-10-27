import { renderHook } from '@test/testUtils';
import useElementResize from '../useElementResize';

describe('[utils] useElementResize', () => {
  it('should be defined', () => {
    expect(useElementResize).to.be.exist;
  });

  it('should be called after a change in size', done => {
    const target = document.createElement('div');
    const callbackSpy = sinon.spy();

    target.style.width = '100px';
    target.style.height = '100px';

    document.body.appendChild(target);

    renderHook(() => useElementResize(target, callbackSpy));

    setTimeout(() => {
      // ResizeObserver first fires a resize event
      const { width, height } = callbackSpy.firstCall.args[0][0].contentRect;

      assert.equal(callbackSpy.callCount, 1);
      assert.equal(width, 100);
      assert.equal(height, 100);

      target.style.width = '200px';
    }, 100);

    setTimeout(() => {
      // ResizeObserver second fires a resize event
      const { width, height } = callbackSpy.secondCall.args[0][0].contentRect;

      assert.equal(callbackSpy.callCount, 2);
      assert.equal(width, 200);
      assert.equal(height, 100);

      done();
    }, 200);
  });
});
