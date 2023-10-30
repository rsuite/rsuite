import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import { getInstance } from '@test/testUtils';
import DropdownMenu from '../DropdownMenu';
import Dropdown from '../Cascader';
import { testStandardProps } from '@test/commonCases';

const items = [
  {
    value: 'abc',
    label: 'abc'
  },
  {
    value: 'abcd',
    label: 'abcd'
  },
  {
    value: 'abcde',
    label: 'abcde',
    children: [
      {
        value: 'vv-abc',
        label: 'vv-abc'
      },
      {
        value: 'vv-abcd',
        label: 'vv-abcd'
      }
    ]
  }
];

describe('Cascader -  DropdownMenu', () => {
  testStandardProps(
    <DropdownMenu
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
      <DropdownMenu
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
    render(<Dropdown defaultOpen data={items} />);

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(3);
  });

  it('Should have a menuWidth', () => {
    const instance = getInstance(<Dropdown defaultOpen data={items} menuWidth={100} />);

    // eslint-disable-next-line testing-library/no-node-access
    const menuContainer = instance.overlay.querySelector('.rs-picker-cascader-menu-column');

    expect(menuContainer.style.width).to.equal('100px');
  });

  it('Should output 3 `menu-item` ', () => {
    const data = [
      {
        myValue: 'abc',
        myLabel: 'abc'
      },
      {
        myValue: 'abcd',
        myLabel: 'abcd'
      },
      {
        myLabel: 'vvv',
        items: [
          {
            myValue: 'vv-abc',
            myLabel: 'vv-abc'
          },
          {
            myValue: 'vv-abcd',
            myLabel: 'vv-abcd'
          }
        ]
      }
    ];

    render(
      <Dropdown defaultOpen labelKey="myLabel" valueKey="myValue" childrenKey="items" data={data} />
    );

    expect(screen.getAllByRole('treeitem')).to.have.lengthOf(3);
  });

  it('Should call onSelect callback node value', () => {
    const onSelect = sinon.spy();
    render(<Dropdown defaultOpen data={items} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('treeitem', { name: 'abcd' }));

    expect(onSelect).to.have.been.calledWith(sinon.match({ value: 'abcd' }));
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd']} onSelect={onSelectSpy} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[0]);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.overlay.querySelectorAll('.rs-picker-cascader-menu-item')[2]);

    expect(onSelectSpy).to.callCount(2);
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelectSpy = sinon.spy();
    render(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd']} onSelect={onSelectSpy} />
    );

    fireEvent.click(screen.getByRole('treeitem', { name: 'abcd' }));

    expect(onSelectSpy).to.not.called;
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} renderMenuItem={item => <i>{item}</i>} />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.overlay.querySelectorAll(`${'.rs-picker-cascader-menu-item'} i`)).to.length(3);
  });

  it('Should be disabled item ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd', 'abcde']} />
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
