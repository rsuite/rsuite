import sinon from 'sinon';
import {
  findNodeOfTree,
  filterNodesOfTree,
  toggleExpand,
  getParentMap,
  getPathTowardsItem,
  getKeyParentMap,
  walkTreeDfs,
  walkTreeBfs
} from '../treeUtils';
import { mockTreeData } from '@test/mocks/data-mock';

describe('[utils] Tree utils', () => {
  it('Should find the valid node', () => {
    const items = mockTreeData(['abc', 'abcd', ['vvv', 'vv-abc', 'vv-abcd']]);

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
    const items = mockTreeData(['abc', 'abcd', ['vvv', 'vv-abc', 'vv-abcd']]);
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
    const items = mockTreeData(['abc', 'abcd', ['vvv', 'vv-abc', 'vv-abcd']]);
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

  describe('getKeyParentMap(items, getKey, getChildren)', () => {
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

  describe('walkTreeBfs', () => {
    it('Should traverse tree nodes with breadth-first strategy', () => {
      /**
       * Bindary tree
       *    0
       *  1   2
       * 3 4 5 6
       */
      function getChildren(node: number) {
        if (node >= 3) return undefined;
        return [node * 2 + 1, node * 2 + 2];
      }

      const callback = sinon.spy();
      walkTreeBfs([0], getChildren, callback);

      expect(callback.callCount).to.equal(7);
      expect(callback.getCalls().map(call => call.firstArg)).to.eql([0, 1, 2, 3, 4, 5, 6]);
    });
  });
  describe('walkTreeDfs', () => {
    it('Should traverse tree nodes with depth-first strategy', () => {
      /**
       * Bindary tree
       *    0
       *  1   2
       * 3 4 5 6
       */
      function getChildren(node: number) {
        if (node >= 3) return undefined;
        return [node * 2 + 1, node * 2 + 2];
      }

      const callback = sinon.spy();
      walkTreeDfs([0], getChildren, callback);

      expect(callback.callCount).to.equal(7);
      expect(callback.getCalls().map(call => call.firstArg)).to.eql([0, 1, 3, 4, 2, 5, 6]);
    });
  });
});
