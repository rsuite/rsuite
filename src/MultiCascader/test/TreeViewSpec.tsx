import React from 'react';
import { testStandardProps } from '@test/utils';
import sinon from 'sinon';
import TreeView from '../TreeView';
import MultiCascader from '../MultiCascader';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('MultiCascader -  TreeView', () => {
  testStandardProps(
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
    render(<MultiCascader open data={items} />);

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(3);
  });

  it('Should have a menuWidth', () => {
    render(<MultiCascader defaultOpen data={items} menuWidth={100} />);

    expect(screen.getByRole('group')).to.have.style('width', '100px');
  });

  it('Should output 3 `menu-item` ', () => {
    const data = mockTreeData(['1', '2', ['3', '3-1', '3-2']], {
      valueKey: 'myValue',
      labelKey: 'myLabel',
      childrenKey: 'items'
    });

    render(
      <MultiCascader
        defaultOpen
        labelKey="myLabel"
        valueKey="myValue"
        childrenKey="items"
        data={data}
      />
    );

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(3);
  });

  it('Should call onSelect callback with correct node value', () => {
    const onSelect = sinon.spy();

    render(<MultiCascader defaultOpen data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '2' }).firstChild as HTMLElement);

    expect(onSelect).to.have.been.calledWith({ label: '2', value: '2' });
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelectSpy = sinon.spy();
    render(
      <MultiCascader defaultOpen data={items} disabledItemValues={['2']} onSelect={onSelectSpy} />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '1' }).firstChild as HTMLElement);
    fireEvent.click(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement);

    expect(onSelectSpy).to.have.been.calledTwice;
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelectSpy = sinon.spy();
    render(
      <MultiCascader defaultOpen data={items} disabledItemValues={['2']} onSelect={onSelectSpy} />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: '2' }).firstChild as HTMLElement);
    expect(onSelectSpy).not.to.have.been.called;
  });

  it('Should call renderMenuItem callback ', () => {
    render(
      <MultiCascader
        defaultOpen
        data={items}
        renderMenuItem={item => <i data-testid="custom-item">{item}</i>}
      />
    );

    expect(screen.getAllByTestId('custom-item')).to.have.lengthOf(3);
  });

  it('Should be disabled item ', () => {
    render(<MultiCascader defaultOpen data={items} disabledItemValues={['2', '3']} />);

    expect(screen.getByRole('treeitem', { name: '2' }).firstChild as HTMLElement).to.have.class(
      'rs-checkbox-disabled'
    );
    expect(screen.getByRole('treeitem', { name: '3' }).firstChild as HTMLElement).to.have.class(
      'rs-checkbox-disabled'
    );
  });

  it('Should be uncheckable item ', () => {
    render(<MultiCascader defaultOpen data={items} uncheckableItemValues={['2', '3']} />);

    expect(screen.getAllByRole('checkbox')).to.have.lengthOf(1);
  });
});
