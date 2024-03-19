import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import TreeView from '../TreeView';
import CascadeTree from '../CascadeTree';
import { testStandardProps } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('CascadeTree -  TreeView', () => {
  testStandardProps(<TreeView classPrefix="cascader" />);
  it('Should output a `cascade-tree-items` ', () => {
    const { container } = render(
      <TreeView classPrefix="cascade-tree" disabledItemValues={[]} data={[]} cascadePaths={[]} />
    );

    expect(container.firstChild).to.have.class('rs-cascade-tree-items');
  });

  it('Should render 3 tree item', () => {
    render(<CascadeTree data={items} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
  });

  it('Should have a menuWidth', () => {
    render(<CascadeTree data={items} columnWidth={100} />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('Should render 3 tree item', () => {
    const data = mockTreeData(['1', '2', ['3', '3-1', '3-2']], {
      valueKey: 'myValue',
      labelKey: 'myLabel',
      childrenKey: 'items'
    });

    render(<CascadeTree labelKey="myLabel" valueKey="myValue" childrenKey="items" data={data} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelect = sinon.spy();
    render(<CascadeTree data={items} disabledItemValues={['2']} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }));
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }));

    expect(onSelect).to.have.callCount(2);
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelect = sinon.spy();
    render(<CascadeTree data={items} disabledItemValues={['2']} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    expect(onSelect).to.not.called;
  });

  it('Should call renderTreeNode callback ', () => {
    render(
      <CascadeTree data={items} renderTreeNode={item => <i role="button">{item}</i>} value="3-2" />
    );

    expect(screen.queryAllByRole('button')).to.have.length(5);
  });

  it('Should be disabled item ', () => {
    render(<CascadeTree data={items} disabledItemValues={['2', '3']} />);

    expect(screen.getByRole('treeitem', { name: '1' })).to.have.attribute('aria-disabled', 'false');
    expect(screen.getByRole('treeitem', { name: '2' })).to.have.attribute('aria-disabled', 'true');
    expect(screen.getByRole('treeitem', { name: '3' })).to.have.attribute('aria-disabled', 'true');
  });
});
