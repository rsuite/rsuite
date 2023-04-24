import { getParentMap, getPathTowardsItem } from '../utils';

describe('getParentMap(items, getChildren)', () => {
  type Node = {
    name: string;
    children?: Node[];
  };
  const items = [
    {
      name: 'Root',
      children: [
        {
          name: 'Parent',
          children: [
            {
              name: 'Child'
            }
          ]
        }
      ]
    }
  ];

  it('Should return a map that maps an item to its parent', () => {
    const map = getParentMap(items, (node: Node) => node.children);

    expect(map.get(items[0].children[0].children[0])).to.equal(items[0].children[0]);
    expect(map.get(items[0].children[0])).to.equal(items[0]);
    expect(map.get(items[0])).to.be.undefined;
  });
});

describe('getPathTowardsItem(target, getParent)', () => {
  // const items = [1, 2, 3, 4, 5];
  const getParent = n => (n === 1 ? undefined : n - 1);

  it('Should return a path from root node towards target node', () => {
    expect(getPathTowardsItem(5, getParent)).to.eql([1, 2, 3, 4, 5]);
  });

  it('Should return empty path if target is falsy', () => {
    expect(getPathTowardsItem(undefined, getParent)).to.eql([]);
  });
});
