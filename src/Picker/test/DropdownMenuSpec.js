import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import { getDOMNode } from '@test/testUtils';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenuItem';

const classPrefix = `rs-dropdown-menu`;
const groupClassName = `.${classPrefix}-group`;
const titleClassName = `.${classPrefix}-group-title`;
const childrenClassName = `.${classPrefix}-group-children`;
const itemClassName = `.${classPrefix}-item`;
const itemActiveClassName = `.${classPrefix}-item-active`;

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
    groupTitle: 'vvv',
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

    assert.equal(instance.querySelectorAll('li').length, 3);
  });

  it('Should output a item group ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        classPrefix={classPrefix}
        group
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.ok(instance.querySelector(`${childrenClassName}`));
  });

  it('Should be active item for value of `vv-abcd', () => {
    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        group
        classPrefix={classPrefix}
        activeItemValues={['vv-abcd']}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelector(itemActiveClassName).innerText, 'vv-abcd');
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
    assert.ok(findDOMNode(instance).style.maxHeight, '200px');
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
        children: [
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

    const instance = getDOMNode(
      <DropdownMenu
        labelKey="myLabel"
        valueKey="myValue"
        data={data}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll('li').length, 3);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = value => {
      if (value === 'abcd') {
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

    ReactTestUtils.Simulate.click(instance.querySelectorAll(itemClassName)[1]);
  });

  it('Should call onGroupTitleClick callback ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <DropdownMenu
        data={items}
        group
        onGroupTitleClick={doneOp}
        classPrefix={classPrefix}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    ReactTestUtils.Simulate.click(instance.querySelector(titleClassName));
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={items}
        renderMenuItem={item => <i>{item}</i>}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll(`${itemClassName} i`).length, 4);
  });

  it('Should call renderMenuGroup callback ', () => {
    const instance = getDOMNode(
      <DropdownMenu
        group
        classPrefix={classPrefix}
        data={items}
        renderMenuGroup={item => <i>{item}</i>}
        dropdownMenuItemComponentClass={DropdownMenuItem}
      />
    );

    assert.equal(instance.querySelectorAll(`${groupClassName} i`).length, 1);
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
});
