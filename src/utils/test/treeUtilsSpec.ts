import { findNodeOfTree, filterNodesOfTree, toggleExpand } from '../treeUtils';

describe('[utils] Tree utils', () => {
  it('Should find the valid node', () => {
    const items = [
      {
        value: 'abc'
      },
      {
        value: 'abcd'
      },
      {
        value: 'vvv',
        children: [
          {
            value: 'vv-abc'
          },
          {
            value: 'vv-abcd'
          }
        ]
      }
    ];

    const node = findNodeOfTree(items, item => item.value === 'abcd');
    const node2 = findNodeOfTree(items, item => item.value === 'vv-abcd');
    const node3 = findNodeOfTree(items, item => item.value === 'vvv');
    const node4 = findNodeOfTree(items, item => item.value === 'bbbb');

    assert.equal(node.value, 'abcd');
    assert.equal(node2.value, 'vv-abcd');
    assert.equal(node3.value, 'vvv');
    assert.equal(node4, undefined);
  });

  it('Should have 2 children', () => {
    const items = [
      {
        value: 'abc'
      },
      {
        value: 'abcd'
      },
      {
        value: 'vvv',
        children: [
          {
            value: 'vv-abc'
          },
          {
            value: 'vv-abcd'
          }
        ]
      }
    ] as const;

    const stringItems = JSON.stringify(items);

    const nodes = filterNodesOfTree(items, item => item.value.indexOf('abcd') >= 0);

    assert.equal(stringItems, JSON.stringify(items));
    assert.equal(items[2].children.length, 2);
    assert.equal(items[2].children[0].value, 'vv-abc');
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].value, 'abcd');
    assert.equal((nodes[1] as any).children.length, 1);
    assert.equal((nodes[1] as any).children[0].value, 'vv-abcd');
  });

  it('Should have a child', () => {
    const items = [
      {
        value: 'abc'
      },
      {
        value: 'abcd'
      },
      {
        value: 'vvv',
        children: [
          {
            value: 'vv-abc'
          },
          {
            value: 'vv-abcd'
          }
        ]
      }
    ];

    const stringItems = JSON.stringify(items);

    const nodes = filterNodesOfTree(items, item => item.value.indexOf('vvv') >= 0);

    assert.equal(stringItems, JSON.stringify(items));
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].value, 'vvv');
    assert.equal((nodes[0].children as any[]).length, 2);
    assert.equal((nodes[0].children as any)[1].value, 'vv-abcd');
  });

  describe('toggleExpand({ node, isExpand, expandItemValues, valueKey })', () => {
    context('isExpand = true', () => {
      it('Should add `node[valueKey]` if `expandItemValues` does not include it', () => {
        const node = {
          value: 2
        };
        const valueKey = 'value';
        expect(
          toggleExpand({
            node,
            valueKey,
            expandItemValues: [1],
            isExpand: true
          })
        ).to.eql([1, 2]);
      });
      it('Should return `expandItemValues` as is if it already includes `node[valueKey]`', () => {
        const node = {
          value: 2
        };
        const valueKey = 'value';
        expect(
          toggleExpand({
            node,
            valueKey,
            expandItemValues: [1, 2],
            isExpand: true
          })
        ).to.eql([1, 2]);
      });
    });
    context('isExpand = false', () => {
      it('Should remove `node[valueKey]` if `expandItemValues` includes it', () => {
        const node = {
          value: 2
        };
        const valueKey = 'value';
        expect(
          toggleExpand({
            node,
            valueKey,
            expandItemValues: [1, 2],
            isExpand: false
          })
        ).to.eql([1]);
      });
      it('Should return `expandItemValues` as is if it does not include `node[valueKey]`', () => {
        const node = {
          value: 2
        };
        const valueKey = 'value';
        expect(
          toggleExpand({
            node,
            valueKey,
            expandItemValues: [1],
            isExpand: false
          })
        ).to.eql([1]);
      });
    });
  });
});
