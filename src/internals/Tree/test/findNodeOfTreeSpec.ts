import { findNodeOfTree } from '../utils';
import { mockTreeData } from '@test/mocks/data-mock';

describe('findNodeOfTree', () => {
  it('Should find the valid node', () => {
    const items = mockTreeData(['abc', 'abcd', ['vvv', 'vv-abc', 'vv-abcd']]);

    const node1 = findNodeOfTree(items, item => item.value === 'abcd');
    const node2 = findNodeOfTree(items, item => item.value === 'vv-abcd');
    const node3 = findNodeOfTree(items, item => item.value === 'vvv');
    const node4 = findNodeOfTree(items, item => item.value === 'bbbb');

    expect(node1.value).to.equal('abcd');
    expect(node2.value).to.equal('vv-abcd');
    expect(node3.value).to.equal('vvv');
    expect(node4).to.equal(undefined);
  });
});
