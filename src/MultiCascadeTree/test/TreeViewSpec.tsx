import React from 'react';
import { testStandardProps } from '@test/utils';
import sinon from 'sinon';
import TreeView from '../TreeView';
import MultiCascadeTree from '../MultiCascadeTree';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('MultiCascadeTree -  TreeView', () => {
  testStandardProps(
    <TreeView
      disabledItemValues={[]}
      value={[]}
      childrenKey="children"
      labelKey="label"
      valueKey="value"
      cascadeData={[]}
      uncheckableItemValues={[]}
    />
  );

  it('Should output a `cascader-menu-items` ', () => {
    render(
      <TreeView
        classPrefix="picker-cascader-menu"
        disabledItemValues={[]}
        value={[]}
        childrenKey="children"
        labelKey="label"
        valueKey="value"
        cascadeData={[]}
        uncheckableItemValues={[]}
      />
    );

    expect(screen.getByRole('tree')).to.have.class('rs-picker-cascader-menu-items');
  });

  it('Should output 3 `menu-item` ', () => {
    render(<MultiCascadeTree data={items} />);

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
  });

  it('Should have a menuWidth', () => {
    render(<MultiCascadeTree data={items} columnWidth={100} />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('Should output 3 `menu-item` ', () => {
    const data = mockTreeData(['1', '2', ['3', '3-1', '3-2']], {
      valueKey: 'myValue',
      labelKey: 'myLabel',
      childrenKey: 'items'
    });

    render(
      <MultiCascadeTree labelKey="myLabel" valueKey="myValue" childrenKey="items" data={data} />
    );

    expect(screen.getAllByRole('treeitem')).to.have.length(3);
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();

    render(<MultiCascadeTree data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '2' }));

    expect(onSelect).to.have.been.calledWith({ label: '2', value: '2' });
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelect = sinon.spy();
    render(<MultiCascadeTree data={items} disabledItemValues={['2']} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '1' }));
    fireEvent.click(screen.getByRole('checkbox', { name: '3' }));

    expect(onSelect).to.have.been.calledTwice;
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelect = sinon.spy();
    render(<MultiCascadeTree data={items} disabledItemValues={['2']} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '2' }));
    expect(onSelect).not.to.have.been.called;
  });

  it('Should call renderTreeNode callback ', () => {
    render(
      <MultiCascadeTree
        data={items}
        renderTreeNode={item => <i data-testid="custom-item">{item}</i>}
      />
    );

    expect(screen.getAllByTestId('custom-item')).to.have.length(3);
  });

  it('Should be disabled item ', () => {
    render(<MultiCascadeTree data={items} disabledItemValues={['2', '3']} />);

    expect(screen.getByRole('treeitem', { name: '2' }).firstChild as HTMLElement).to.have.class(
      'rs-checkbox-disabled'
    );
    expect(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement).to.have.class(
      'rs-checkbox-disabled'
    );
  });

  it('Should be uncheckable item ', () => {
    render(<MultiCascadeTree data={items} uncheckableItemValues={['2', '3']} />);

    expect(screen.getAllByRole('checkbox')).to.have.length(1);
  });
});
