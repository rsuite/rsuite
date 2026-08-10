import findAllParents from '../utils/findAllParents';
import { PARENT_KEY } from '../constants';
import { describe, expect, it } from 'vitest';

describe('findAllParents', () => {
  it('should find all parents of a node', () => {
    const tree = {
      id: 1,
      name: 'A',
      [PARENT_KEY]: {
        id: 2,
        name: 'B',
        [PARENT_KEY]: {
          id: 3,
          name: 'C',
          [PARENT_KEY]: undefined
        }
      }
    };

    const result = findAllParents(tree, 'id');

    expect(result).to.deep.equal([2, 3]);
  });

  it('should return an empty array if the node has no parents', () => {
    const node = { id: 1, name: 'A', [PARENT_KEY]: undefined };

    const result = findAllParents(node, 'id');

    expect(result).to.deep.equal([]);
  });
});
