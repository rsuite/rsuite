import { getPathTowardsItem } from '../utils';

describe('getPathTowardsItem', () => {
  // const items = [1, 2, 3, 4, 5];
  const getParent = n => (n === 1 ? undefined : n - 1);

  it('Should return a path from root node towards target node', () => {
    expect(getPathTowardsItem(5, getParent)).to.eql([1, 2, 3, 4, 5]);
  });

  it('Should return empty path if target is falsy', () => {
    expect(getPathTowardsItem(undefined, getParent)).to.eql([]);
  });
});
