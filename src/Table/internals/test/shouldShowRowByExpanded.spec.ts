import { describe, expect, it } from 'vitest';
import shouldShowRowByExpanded from '../utils/shouldShowRowByExpanded';

describe('shouldShowRowByExpanded', () => {
  it('Should return true when there are no parents', () => {
    expect(shouldShowRowByExpanded([1, 2, 3], [])).to.equal(true);
  });

  it('Should return true when all parents are expanded', () => {
    expect(shouldShowRowByExpanded([1, 2, 3], [1, 2])).to.equal(true);
  });

  it('Should return false when a parent is not expanded', () => {
    expect(shouldShowRowByExpanded([1, 3], [1, 2])).to.equal(false);
  });

  it('Should return false when no keys are expanded', () => {
    expect(shouldShowRowByExpanded([], [1])).to.equal(false);
  });

  it('Should return true with default empty params', () => {
    expect(shouldShowRowByExpanded()).to.equal(true);
  });

  it('Should return true when parentKeys is empty', () => {
    expect(shouldShowRowByExpanded([1, 2])).to.equal(true);
  });

  it('Should work with string keys', () => {
    expect(shouldShowRowByExpanded(['a', 'b'], ['a', 'b'])).to.equal(true);
    expect(shouldShowRowByExpanded(['a'], ['a', 'b'])).to.equal(false);
  });
});
