import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode } from '@test/testUtils';
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
    const instance = getDOMNode(
      <DropdownMenu classPrefix={classPrefix} dropdownMenuItemAs={DropdownMenuItem} />
    );
    assert.ok(instance.className.match(/\brs-dropdown-menu-items\b/));
  });

  it('Should output 3 `menu-item` ', () => {
    const instance = getDOMNode(
      <DropdownMenu data={items} classPrefix={classPrefix} dropdownMenuItemAs={DropdownMenuItem} />
    );

    assert.equal(instance.querySelectorAll('a').length, 3);
  });

  it('Should output a item group ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={getDataGroupBy(items, 'groupKey')}
        group
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    assert.ok(instance.querySelector('.rs-picker-menu-group'));
  });

  it('Should be active item for value of `c', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        group
        classPrefix={classPrefix}
        activeItemValues={['c']}
        dropdownMenuItemAs={DropdownMenuItem}
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
        dropdownMenuItemAs={DropdownMenuItem}
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
        dropdownMenuItemAs={DropdownMenuItem}
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
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelectorAll('.rs-dropdown-menu-item')[1]);
  });

  it('Should call onGroupTitleClick callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DropdownMenu
        group
        data={getDataGroupBy(items, 'groupKey')}
        onGroupTitleClick={doneOp}
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-menu-group'));
  });

  it('Should render custom item', () => {
    const instance = getDOMNode(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={items}
        renderMenuItem={item => <i>{item}</i>}
        dropdownMenuItemAs={DropdownMenuItem}
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
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );
    assert.equal(instance.querySelectorAll('.rs-picker-menu-group i').length, 1);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <DropdownMenu
        className="custom"
        classPrefix={classPrefix}
        dropdownMenuItemAs={DropdownMenuItem}
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
        dropdownMenuItemAs={DropdownMenuItem}
      />
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(
      <DropdownMenu dropdownMenuItemAs={DropdownMenuItem} classPrefix="custom-prefix" />
    );
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
