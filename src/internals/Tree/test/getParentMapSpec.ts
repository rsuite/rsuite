import { getParentMap, getKeyParentMap } from '../utils';

describe('getParentMap', () => {
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

describe('getKeyParentMap', () => {
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

  it("Should return a map that maps an item's key to its parent", () => {
    const map = getKeyParentMap(
      items,
      node => node.name,
      (node: Node) => node.children
    );

    expect(map.get('Child')).to.equal(items[0].children[0]);
    expect(map.get('Parent')).to.equal(items[0]);
    expect(map.get('Root')).to.be.undefined;
  });
});
