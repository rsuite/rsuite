import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';
import getDataGroupBy from '../../utils/getDataGroupBy';

const classPrefix = 'dropdown-menu';

const items = [
  {
    value: 'a',
    label: 'a',
    groupKey: 'group-1'
  },
  {
    value: 'b',
    label: 'b',
    groupKey: 'group-1'
  },
  {
    value: 'c',
    label: 'c',
    groupKey: 'group-1'
  }
];

describe('picker -  DropdownMenu', () => {
  it('Should output a `dropdown-menu-items` ', () => {
    const { getByRole } = render(
      <DropdownMenu classPrefix={classPrefix} dropdownMenuItemAs={DropdownMenuItem} />
    );

    expect(getByRole('listbox')).to.has.class('rs-dropdown-menu-items');
  });

  it('Should output 3 `menu-item` ', () => {
    const { getAllByRole } = render(
      <DropdownMenu data={items} classPrefix={classPrefix} dropdownMenuItemAs={DropdownMenuItem} />
    );

    expect(getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should output a item group ', () => {
    const { getAllByRole } = render(
      <DropdownMenu
        classPrefix={classPrefix}
        data={getDataGroupBy(items, 'groupKey')}
        group
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getAllByRole('group')).to.have.lengthOf(1);
  });

  it('Should be active item for value of `c', () => {
    const { getByRole } = render(
      <DropdownMenu
        data={items}
        group
        classPrefix={classPrefix}
        activeItemValues={['c']}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getByRole('option', { selected: true })).to.text('c');
  });

  it('Should have a maxHeight', () => {
    const { getByRole } = render(
      <DropdownMenu
        className="custom"
        maxHeight={200}
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getByRole('listbox')).to.has.style('max-height', '200px');
  });

  it('Should output 3 `menu-item` ', () => {
    const data = [
      {
        myValue: 'a',
        myLabel: 'a'
      },
      {
        myValue: 'b',
        myLabel: 'b'
      },
      {
        myValue: 'c',
        myLabel: 'c'
      }
    ];

    const { getAllByRole } = render(
      <DropdownMenu
        labelKey="myLabel"
        valueKey="myValue"
        data={data}
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should call onSelect callback with correct value', () => {
    const onSelectSpy = sinon.spy();

    const { getAllByRole } = render(
      <DropdownMenu
        data={items}
        group
        onSelect={onSelectSpy}
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    fireEvent.click(getAllByRole('option')[1]);

    expect(onSelectSpy).to.be.calledWith('b');
  });

  it('Should call onGroupTitleClick callback', () => {
    const onGroupTitleClickSpy = sinon.spy();
    const { getByRole } = render(
      <DropdownMenu
        group
        data={getDataGroupBy(items, 'groupKey')}
        onGroupTitleClick={onGroupTitleClickSpy}
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    fireEvent.click(getByRole('group'));

    expect(onGroupTitleClickSpy).to.be.calledOnce;
  });

  it('Should render custom item', () => {
    const { getByRole } = render(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={items}
        renderMenuItem={item => <i>{item}</i>}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getByRole('listbox').querySelectorAll('i')).to.have.lengthOf(3);
  });

  it('Should render custom group ', () => {
    const { getByRole } = render(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={getDataGroupBy(items, 'groupKey')}
        renderMenuGroup={item => <i>{item}</i>}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getByRole('listbox').querySelectorAll('.rs-picker-menu-group i')).to.have.lengthOf(1);
  });

  it('Should have a custom className', () => {
    const { getByRole } = render(
      <DropdownMenu
        className="custom"
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getByRole('listbox')).to.has.class('custom');
  });

  it('Should have a custom style', () => {
    const { getByRole } = render(
      <DropdownMenu
        style={{ fontSize: 12 }}
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    expect(getByRole('listbox')).to.has.style('font-size', '12px');
  });

  it('Should have a custom className prefix', () => {
    const { getByRole } = render(
      <DropdownMenu dropdownMenuItemAs={DropdownMenuItem} classPrefix="custom-prefix" />
    );

    expect(getByRole('listbox')).to.has.class('rs-custom-prefix');
  });

  it('Should have a unique key on each option', () => {
    const mockData = Array.from({ length: 20 }, (_v, i) => ({
      value: i + 1,
      name: `TEST${i + 1}`,
      groupValue: i + 1
    }));

    const { getByRole } = render(
      <DropdownMenu
        group
        data={getDataGroupBy(mockData, 'groupValue')}
        valueKey={'value'}
        labelKey={'name'}
        dropdownMenuItemAs={DropdownMenuItem}
        classPrefix={classPrefix}
      />
    );

    getByRole('option', { name: 'TEST1' }).dataset.key.should.equal('1');
  });
});
