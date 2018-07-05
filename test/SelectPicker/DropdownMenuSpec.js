import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';

import DropdownMenu from '../../src/SelectPicker/DropdownMenu';

const classPrefix = `${namespace}-select-menu`;
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

describe('<SelectPicker> - DropdownMenu', () => {
  it('Should output a `select-menu-items` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu />);
    const instanceDom = findDOMNode(instance);

    assert.ok(instanceDom.className.match(/\bselect-menu-items\b/));
  });

  it('Should output 3 `menu-item` ', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu data={items} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('li').length, 3);
  });

  it('Should output a item group ', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu data={items} group />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll(`${childrenClassName} ${itemClassName}`).length, 2);
  });

  it('Should be active item for value of `vv-abcd', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu data={items} group activeItemValue="vv-abcd" />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(
      instanceDom.querySelector(`${childrenClassName} ${itemActiveClassName}`).innerText,
      'vv-abcd'
    );
  });

  it('Should have a maxHeight', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu className="custom" maxHeight={200} />
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

    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu labelKey="myLabel" valueKey="myValue" data={data} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll('li').length, 3);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = value => {
      if (value === 'abcd') {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu data={items} group onSelect={doneOp} />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelectorAll(itemClassName)[1]);
  });

  it('Should call onGroupTitleClick callback ', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu data={items} group onGroupTitleClick={doneOp} />
    );
    const instanceDom = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDom.querySelector(titleClassName));
  });

  it('Should call renderMenuItem callback ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu group data={items} renderMenuItem={item => <i>{item}</i>} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll(`${itemClassName} i`).length, 4);
  });

  it('Should call renderMenuGroup callback ', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DropdownMenu group data={items} renderMenuGroup={item => <i>{item}</i>} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelectorAll(`${groupClassName} i`).length, 1);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DropdownMenu style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
