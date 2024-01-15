import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getInstance } from '@test/utils';
import TreeView from '../TreeView';
import Cascader from '../Cascader';
import { testStandardProps } from '@test/utils';
import { mockTreeData } from '@test/mocks/data-mock';

const items = mockTreeData(['1', '2', ['3', '3-1', '3-2']]);

describe('Cascader -  TreeView', () => {
  testStandardProps(
    <TreeView
      classPrefix="cascader"
      disabledItemValues={[]}
      childrenKey="children"
      cascadeData={[]}
      cascadePaths={[]}
      valueKey="value"
      labelKey="label"
    />
  );
  it('Should output a `cascader-menu-items` ', () => {
    const { container } = render(
      <TreeView
        classPrefix="picker-cascader-menu"
        disabledItemValues={[]}
        childrenKey="children"
        cascadeData={[]}
        cascadePaths={[]}
        valueKey="value"
        labelKey="label"
      />
    );

    expect(container.firstChild).to.have.class('rs-picker-cascader-menu-items');
  });

  it('Should output 3 `menu-item` ', () => {
    render(<Cascader defaultOpen data={items} />);

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(3);
  });

  it('Should have a menuWidth', () => {
    const instance = getInstance(<Cascader defaultOpen data={items} menuWidth={100} />);

    // eslint-disable-next-line testing-library/no-node-access
    const menuContainer = instance.overlay.querySelector('.rs-picker-cascader-menu-column');

    expect(menuContainer.style.width).to.equal('100px');
  });

  it('Should output 3 `menu-item` ', () => {
    const data = mockTreeData(['1', '2', ['3', '3-1', '3-2']], {
      valueKey: 'myValue',
      labelKey: 'myLabel',
      childrenKey: 'items'
    });

    render(
      <Cascader defaultOpen labelKey="myLabel" valueKey="myValue" childrenKey="items" data={data} />
    );

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(3);
  });

  it('Should call onSelect callback node value', () => {
    const onSelect = sinon.spy();
    render(<Cascader defaultOpen data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    expect(onSelect).to.have.been.calledWith(sinon.match({ value: '2' }));
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <Cascader defaultOpen data={items} disabledItemValues={['2']} onSelect={onSelectSpy} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[0]);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2]);

    expect(onSelectSpy).to.callCount(2);
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelectSpy = sinon.spy();
    render(<Cascader defaultOpen data={items} disabledItemValues={['2']} onSelect={onSelectSpy} />);

    fireEvent.click(screen.getByRole('treeitem', { name: '2' }));

    expect(onSelectSpy).to.not.called;
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = getInstance(
      <Cascader defaultOpen data={items} renderMenuItem={item => <i>{item}</i>} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelectorAll(`${'.rs-picker-cascader-menu-item'} i`)).to.length(3);
  });

  it('Should be disabled item ', () => {
    const instance = getInstance(
      <Cascader defaultOpen data={items} disabledItemValues={['2', '3']} />
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[1].className
    ).to.contain('disabled');

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2].className
    ).to.contain('disabled');
  });
});
