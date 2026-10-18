import { describe, expect, it, vi } from 'vitest';
import { requestAnimationTimeout, cancelAnimationTimeout } from '../utils/requestAnimationTimeout';

describe('requestAnimationTimeout', () => {
  it('Should call callback after the delay', async () => {
    const callback = vi.fn();

    requestAnimationTimeout(callback, 0);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(callback).toHaveBeenCalledOnce();
  });

  it('Should return a frame object with an id', () => {
    const callback = vi.fn();
    const frame = requestAnimationTimeout(callback, 1000);

    expect(frame).to.be.an('object');
    expect(frame).to.have.property('id');

    // Cancel to clean up
    cancelAnimationTimeout(frame);
  });

  it('Should cancel the timeout before callback fires', async () => {
    const callback = vi.fn();

    const frame = requestAnimationTimeout(callback, 5000);
    cancelAnimationTimeout(frame);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(callback).not.toHaveBeenCalled();
  });
});
