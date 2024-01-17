import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import sinon from 'sinon';
import CascadeTree from '../CascadeTree';
import { testStandardProps } from '@test/utils';
import '../styles/index.less';
import { mockTreeData } from '@test/mocks/data-mock';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('CascadeTree', () => {
  testStandardProps(<CascadeTree data={[]} />);

  it('Should be active by value', () => {
    const value = '2';
    render(<CascadeTree data={items} value={value} />);

    expect(screen.getByRole('treeitem', { name: value }).firstChild).to.have.class(
      'rs-cascade-tree-item-active'
    );
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();
    render(<CascadeTree data={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    expect(onSelect.getCall(0).args[0]['itemData']).to.have.property('value', '2');
  });

  it('Should children be loaded lazily', () => {
    render(
      <CascadeTree
        data={[{ label: '1', value: '1', children: [] }]}
        getChildren={() => {
          return [{ label: '2', value: '2' }];
        }}
      />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));

    expect(screen.getByRole('treeitem', { name: '2' })).to.exist;
  });

  it('Should present an async loading state', () => {
    function fetchNodes() {
      return new Promise<{ label: string; value: string }[]>(resolve => {
        setTimeout(() => {
          resolve([{ label: '2', value: '2' }]);
        }, 500);
      });
    }

    render(
      <CascadeTree data={[{ label: '1', value: '1', children: [] }]} getChildren={fetchNodes} />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));

    expect(screen.getByTestId('spinner')).to.exist;
  });

  it('Should item able to stringfy', () => {
    const onSelect = sinon.spy();
    const renderTreeNode = sinon.spy();

    render(<CascadeTree data={items} onSelect={onSelect} renderTreeNode={renderTreeNode} />);
    const checkbox = screen.getAllByRole('treeitem')[2];

    fireEvent.click(checkbox);

    expect(onSelect).to.called;
    expect(renderTreeNode).to.called;
    expect(() => JSON.stringify(items[2])).to.not.throw();
    expect(() => JSON.stringify(onSelect.firstCall.args[1])).to.not.throw();
    expect(() => JSON.stringify(renderTreeNode.lastCall.args[1])).to.not.throw();
  });

  it('Should update the subcolumn when the leaf node is clicked', () => {
    render(<CascadeTree data={items} />);

    expect(screen.getAllByRole('group')).to.length(1);

    // Click on a node that has child nodes
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }));
    expect(screen.getAllByRole('group')).to.length(2);

    // Click on the leaf node
    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));
    expect(screen.getAllByRole('group')).to.length(1);
  });
});
