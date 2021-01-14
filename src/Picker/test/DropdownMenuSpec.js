import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';
import getDataGroupBy from '../../utils/getDataGroupBy';

const classPrefix = 'rs-dropdown-menu';

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
    const instance = getDOMNode(
      <DropdownMenu classPrefix={classPrefix} dropdownMenuItemComponentClass={DropdownMenuItem} />
    );
    assert.ok(instance.className.match(/\brs-dropdown-menu-items\b/));
  });

  it('Should output 3 `menu-item` ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll('a').length, 3);
  });

  it('Should output a item group ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={getDataGroupBy(items, 'groupKey')}
        classPrefix={classPrefix}
        group
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.ok(instance.querySelector('.rs-dropdown-menu-group'));
  });

  it('Should be active item for value of `c', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        group
        classPrefix={classPrefix}
        activeItemValues={['c']}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelector('.rs-dropdown-menu-item-active').innerText, 'c');
  });

  it('Should have a maxHeight', () => {
    const instance = getDOMNode(
      <DropdownMenu
        className="custom"
        maxHeight={200}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );
    assert.ok(instance.style.maxHeight, '200px');
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

    const instance = getDOMNode(
      <DropdownMenu
        labelKey="myLabel"
        valueKey="myValue"
        data={data}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll('a').length, 3);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = value => {
      if (value === 'b') {
        done();
      }
    };

    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        group
        onSelect={doneOp}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-dropdown-menu-item')[1]);
  });

  it('Should call onGroupTitleClick callback ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DropdownMenu
        group
        data={getDataGroupBy(items, 'groupKey')}
        onGroupTitleClick={doneOp}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-dropdown-menu-group'));
  });

  it('Should render custom item', () => {
    const instance = getDOMNode(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={items}
        renderMenuItem={item => <i>{item}</i>}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-dropdown-menu-item i').length, 3);
  });

  it('Should render custom group ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={getDataGroupBy(items, 'groupKey')}
        renderMenuGroup={item => <i>{item}</i>}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll('.rs-dropdown-menu-group i').length, 1);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <DropdownMenu
        className="custom"
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <DropdownMenu
        style={{ fontSize }}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <DropdownMenu dropdownMenuItemComponentClass={DropdownMenuItem} classPrefix="custom-prefix" />
    );
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should have a unique key', () => {
    const mockData = Array.from({ length: 20 }, (_v, i) => ({
      value: i + 1,
      name: `TEST${i + 1}`,
      groupValue: i + 1
    }));

    const instance = getDOMNode(
      <DropdownMenu
        group
        labelKey="name"
        valueKey="value"
        data={getDataGroupBy(mockData, 'groupValue')}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll('[data-key="1"]').length, 1);
  });
});
