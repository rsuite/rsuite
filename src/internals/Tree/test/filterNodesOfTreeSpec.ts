import { filterNodesOfTree } from '../utils';
import { mockTreeData } from '@test/mocks/data-mock';

describe('filterNodesOfTree', () => {
  it('Should have 2 children', () => {
    const items = mockTreeData(['abc', 'abcd', ['vvv', 'vv-abc', 'vv-abcd']]);
    const stringItems = JSON.stringify(items);
    const nodes = filterNodesOfTree(items, item => item.value.indexOf('abcd') >= 0);

    expect(stringItems).to.equal(JSON.stringify(items));
    expect(items[2].children.length).to.equal(2);
    expect(items[2].children[0].value).to.equal('vv-abc');
    expect(nodes).to.have.length(2);
    expect(nodes[0].value).to.equal('abcd');
    expect((nodes[1] as any).children).to.have.length(1);
    expect((nodes[1] as any).children[0].value).to.equal('vv-abcd');
  });

  it('Should have a child', () => {
    const items = mockTreeData(['abc', 'abcd', ['vvv', 'vv-abc', 'vv-abcd']]);
    const stringItems = JSON.stringify(items);

    const nodes = filterNodesOfTree(items, item => item.value.indexOf('vvv') >= 0);

    expect(stringItems).to.equal(JSON.stringify(items));
    expect(nodes).to.have.length(1);
    expect(nodes[0].value).to.equal('vvv');
    expect(nodes[0].children).to.have.length(2);
    expect(nodes[0].children[1].value).to.equal('vv-abcd');
  });
});
