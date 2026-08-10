import { describe, expect, it } from 'vitest';
import isSupportTouchEvent from '../utils/isSupportTouchEvent';

describe('isSupportTouchEvent', () => {
  it('Should return a boolean', () => {
    const result = isSupportTouchEvent();
    expect(typeof result).to.equal('boolean');
  });

  it('Should return false in test environment (no touch events)', () => {
    // jsdom/playwright do not define ontouchstart
    expect(isSupportTouchEvent()).to.equal(false);
  });
});
