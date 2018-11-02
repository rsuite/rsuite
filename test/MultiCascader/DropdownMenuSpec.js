import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';

import { getDOMNode, getInstance } from '../TestWrapper';
import DropdownMenu from '../../src/MultiCascader/DropdownMenu';
import Dropdown from '../../src/MultiCascader/Dropdown';

const classPrefix = `${namespace}-cascader-menu-items`;
const itemClassName = `.${namespace}-check-menu-item`;

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

describe('MultiCascader -  DropdownMenu', () => {
  it('Should output a `cascader-menu-items` ', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="rs-picker-cascader-menu" />);

    assert.ok(instance.className.match(/\bcascader-menu-items\b/));
  });

  it('Should output 3 `menu-item` ', () => {
    const instance = getInstance(<Dropdown defaultOpen data={items} />);

    const menuContainer = findDOMNode(instance.menuContainer);
    assert.equal(menuContainer.querySelectorAll('li').length, 3);
  });

  it('Should have a menuWidth', () => {
    const instance = getInstance(<Dropdown defaultOpen data={items} menuWidth={100} />);

    const menuContainer = findDOMNode(instance.menuContainer).querySelector(
      '.rs-picker-cascader-menu-column'
    );
    assert.ok(menuContainer.style.width, '100px');
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

    const instance = getInstance(
      <Dropdown defaultOpen labelKey="myLabel" valueKey="myValue" childrenKey="items" data={data} />
    );
    const menuContainer = findDOMNode(instance.menuContainer);
    assert.equal(menuContainer.querySelectorAll('li').length, 3);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = node => {
      if (node.value === 'abcd') {
        done();
      }
    };

    const instance = getInstance(<Dropdown defaultOpen data={items} onSelect={doneOp} />);
    const menuContainer = findDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.click(menuContainer.querySelectorAll(itemClassName)[1]);
  });

  it('Should call onSelect callback 2 count', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd']} onSelect={onSelectSpy} />
    );
    const menuContainer = findDOMNode(instance.menuContainer);
    setTimeout(() => {
      ReactTestUtils.Simulate.click(menuContainer.querySelectorAll(itemClassName)[0]);
      ReactTestUtils.Simulate.click(menuContainer.querySelectorAll(itemClassName)[2]);
      assert.equal(onSelectSpy.callCount, 2);
    }, 1);
  });

  it('Should not call onSelect callback on disabled item', () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd']} onSelect={onSelectSpy} />
    );
    const menuContainer = findDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.click(menuContainer.querySelectorAll(itemClassName)[1]);
    assert.ok(onSelectSpy.notCalled);
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} renderMenuItem={item => <i>{item}</i>} />
    );
    const menuContainer = findDOMNode(instance.menuContainer);
    assert.equal(menuContainer.querySelectorAll(`${itemClassName} i`).length, 3);
  });

  it('Should be disabled item ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} disabledItemValues={['abcd', 'abcde']} />
    );
    const menuContainer = findDOMNode(instance.menuContainer);
    assert.ok(menuContainer.querySelectorAll(itemClassName)[1].className.match(/\bdisabled\b/));
    assert.ok(menuContainer.querySelectorAll(itemClassName)[2].className.match(/\bdisabled\b/));
  });

  it('Should be uncheckable item ', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={items} uncheckableItemValues={['abcd', 'abcde']} />
    );
    const menuContainer = findDOMNode(instance.menuContainer);
    assert.equal(
      menuContainer.querySelectorAll(`${itemClassName} .rs-picker-check-menu-item-wrapper`).length,
      1
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="cascader" className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<DropdownMenu classPrefix="cascader" style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<DropdownMenu classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
