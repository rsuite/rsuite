import { describe, expect, it } from 'vitest';
import isNumberOrTrue from '../utils/isNumberOrTrue';

describe('isNumberOrTrue', () => {
  it('Should return true for boolean true', () => {
    expect(isNumberOrTrue(true)).to.equal(true);
  });

  it('Should return false for boolean false', () => {
    expect(isNumberOrTrue(false)).to.equal(false);
  });

  it('Should return false for undefined', () => {
    expect(isNumberOrTrue(undefined)).to.equal(false);
  });

  it('Should return true for a positive number', () => {
    expect(isNumberOrTrue(1)).to.equal(true);
    expect(isNumberOrTrue(100)).to.equal(true);
  });

  it('Should return true for zero', () => {
    // 0 is treated as true (affixed at 0 offset)
    expect(isNumberOrTrue(0)).to.equal(true);
  });
});
