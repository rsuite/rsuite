import React from 'react';
import sinon from 'sinon';
import Listbox from '../Listbox';
import ListItem from '../ListItem';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import { getDataGroupBy } from '@/internals/utils';

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

describe('picker -  Listbox', () => {
  testStandardProps(<Listbox classPrefix={classPrefix} listItemAs={ListItem} />);

  it('Should output a `dropdown-menu-items` ', () => {
    render(<Listbox classPrefix={classPrefix} listItemAs={ListItem} />);

    expect(screen.getByRole('listbox')).to.have.class('rs-dropdown-menu-items');
  });

  it('Should output 3 `menu-item` ', () => {
    render(<Listbox data={items} classPrefix={classPrefix} listItemAs={ListItem} />);

    expect(screen.getAllByRole('option')).to.have.length(3);
    expect(screen.getAllByRole('option')[0]).to.contain('.rs-dropdown-menu-item');
  });

  it('Should output a item group ', () => {
    render(
      <Listbox
        classPrefix={classPrefix}
        data={getDataGroupBy(items, 'groupKey')}
        groupBy="groupKey"
        listItemAs={ListItem}
      />
    );

    expect(screen.getByRole('group')).to.have.class('rs-picker-menu-group');
  });

  it('Should be active item for value of `c', () => {
    render(
      <Listbox
        data={items}
        groupBy="groupKey"
        classPrefix={classPrefix}
        activeItemValues={['c']}
        listItemAs={ListItem}
      />
    );

    expect(screen.getByRole('option', { name: 'c' })).to.contain('.rs-dropdown-menu-item-active');
  });

  it('Should have a maxHeight', () => {
    render(
      <Listbox className="custom" maxHeight={200} classPrefix={classPrefix} listItemAs={ListItem} />
    );

    expect(screen.getByRole('listbox')).to.have.style('max-height', '200px');
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

    render(
      <Listbox
        labelKey="myLabel"
        valueKey="myValue"
        data={data}
        classPrefix={classPrefix}
        listItemAs={ListItem}
      />
    );

    expect(screen.getAllByRole('option')).to.have.length(3);
  });

  it('Should call onSelect callback with correct value', () => {
    const onSelect = sinon.spy();

    render(
      <Listbox
        data={items}
        groupBy="groupKey"
        onSelect={onSelect}
        classPrefix={classPrefix}
        listItemAs={ListItem}
      />
    );

    fireEvent.click(screen.getByRole('option', { name: 'b' }));

    expect(onSelect).to.have.been.calledWith('b');
  });

  it('Should call onGroupTitleClick callback', () => {
    const onGroupTitleClick = sinon.spy();

    render(
      <Listbox
        groupBy="groupKey"
        data={getDataGroupBy(items, 'groupKey')}
        onGroupTitleClick={onGroupTitleClick}
        classPrefix={classPrefix}
        listItemAs={ListItem}
      />
    );

    fireEvent.click(screen.getByRole('group'));

    expect(onGroupTitleClick).to.have.been.calledOnce;
  });

  it('Should render custom item', () => {
    render(
      <Listbox
        groupBy="groupKey"
        classPrefix={classPrefix}
        data={items}
        renderMenuItem={item => <i>{item}</i>}
        listItemAs={ListItem}
      />
    );

    expect(screen.getByRole('option', { name: 'a' })).to.contain('i');
  });

  it('Should render custom group ', () => {
    render(
      <Listbox
        groupBy="groupKey"
        classPrefix={classPrefix}
        data={getDataGroupBy(items, 'groupKey')}
        renderMenuGroup={item => <i>{item}</i>}
        listItemAs={ListItem}
      />
    );

    expect(screen.getByRole('group')).to.contain('i');
  });

  it('Should to reset the option height', () => {
    render(
      <Listbox
        data={items}
        maxHeight={50}
        listItemAs={ListItem}
        classPrefix={classPrefix}
        virtualized
        listProps={{ rowHeight: 28 }}
      />
    );

    expect(screen.getByRole('option', { name: 'a' })).to.have.style('height', '28px');
  });
});
