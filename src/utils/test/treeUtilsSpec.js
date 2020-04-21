import { findNodeOfTree, filterNodesOfTree } from '../treeUtils';

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
    ];

    const stringItems = JSON.stringify(items);

    const nodes = filterNodesOfTree(items, item => item.value.indexOf('abcd') >= 0);

    assert.equal(stringItems, JSON.stringify(items));
    assert.equal(items[2].children.length, 2);
    assert.equal(items[2].children[0].value, 'vv-abc');
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].value, 'abcd');
    assert.equal(nodes[1].children.length, 1);
    assert.equal(nodes[1].children[0].value, 'vv-abcd');
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
    assert.equal(nodes[0].children.length, 2);
    assert.equal(nodes[0].children[1].value, 'vv-abcd');
  });
});
