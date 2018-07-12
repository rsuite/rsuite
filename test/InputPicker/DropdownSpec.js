import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { namespace } from 'rsuite-utils/lib/Picker/constants';
import { getDOMNode, getInstance } from '../TestWrapper';

import Dropdown from '../../src/InputPicker/Dropdown';

const classPrefix = '.rs-picker-input';
const groupClassName = '.rs-picker-select-menu-group';
const itemClassName = '.rs-picker-select-menu-item';
const itemFocusClassName = '.rs-picker-select-menu-item-focus';
const itemActiveClassName = '.rs-picker-select-menu-item-active';
const cleanClassName = '.rs-picker-toggle-clean';
const placeholderClassName = '.rs-picker-toggle-placeholder';
const valueClassName = '.rs-picker-toggle-value';
const searchInputClassName = '.rs-picker-search-bar-input';

const data = [
  {
    label: 'Eugenia',
    value: 'Eugenia',
    role: 'Master'
  },
  {
    label: <span>Kariane</span>,
    value: 'Kariane',
    role: 'Master'
  },
  {
    label: 'Louisa',
    value: 'Louisa',
    role: 'Master'
  }
];

describe('InputPicker - Dropdown', () => {
  it('Should clean selected default value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} defaultValue={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(placeholderClassName).innerText).to.equal('Select');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} value={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(valueClassName).innerText).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Dropdown>{Title}</Dropdown>);

    assert.ok(instance.className.match(/\bpicker-input\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Dropdown disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should output a button', () => {
    const instance = getInstance(<Dropdown toggleComponentClass="button" />);
    ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Dropdown block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<Dropdown defaultOpen data={data} value={value} />);
    const menuDom = getDOMNode(instance.menuContainer);
    assert.equal(getDOMNode(instance).querySelector(valueClassName).innerText, value);
    assert.equal(menuDom.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={value} />);
    const menuDom = getDOMNode(instance.menuContainer);

    assert.equal(getDOMNode(instance).querySelector(valueClassName).innerText, value);
    assert.equal(menuDom.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should render a group', () => {
    const instance = getInstance(<Dropdown defaultOpen groupBy="role" data={data} />);
    const menuContainer = getDOMNode(instance.menuContainer);
    assert.ok(menuContainer.querySelector(groupClassName));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<Dropdown className="custom" placeholder="test" />);

    assert.equal(instance.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <Dropdown
        placeholder="test"
        data={[{ label: '1', value: '1' }, { label: '2', value: '2' }]}
        value={'4'}
      />
    );
    assert.equal(instance.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <Dropdown placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menuContainer = getDOMNode(instance.menuContainer).querySelector(
      '.rs-picker-select-menu-item-active'
    );
    assert.equal(menuContainer.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <Dropdown
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item) => `${item.label}-${value}`}
      />
    );
    assert.equal(instance.querySelector(valueClassName).innerText, 'foo-bar');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = data => {
      if (data === 'Eugenia') {
        done();
      }
    };
    const instance = getInstance(<Dropdown defaultOpen onChange={doneOp} data={data} />);
    const menuContainer = getDOMNode(instance.menuContainer);

    ReactTestUtils.Simulate.click(menuContainer.querySelector(itemClassName));
  });

  it('Should call `onSelect` by keyCode=13 ', done => {
    const doneOp = (value, item) => {
      if (value === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getDOMNode(
      <Dropdown defaultOpen data={data} onSelect={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<Dropdown data={data} defaultValue={'Louisa'} />);
    assert.ok(findDOMNode(instance).querySelector(cleanClassName));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getDOMNode(<Dropdown defaultOpen onSearch={doneOp} />);

    const input = instance.querySelector('.rs-picker-search-input');
    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should focus item by keyCode=40 ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={'Eugenia'} />);

    const menuDOM = getDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.keyDown(getDOMNode(instance), { keyCode: 40 });

    setTimeout(() => {
      if (menuDOM.querySelector(itemFocusClassName).innerText === 'Kariane') {
        done();
      }
    }, 10);
  });

  it('Should focus item by keyCode=38 ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={'Kariane'} />);

    const menuDOM = getDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.keyDown(getDOMNode(instance), { keyCode: 38 });

    setTimeout(() => {
      if (menuDOM.querySelector(itemFocusClassName).innerText === 'Eugenia') {
        done();
      }
    }, 10);
  });

  it('Should call `onChange` by keyCode=13 ', done => {
    const doneOp = key => {
      done();
    };
    const instance = getDOMNode(
      <Dropdown defaultOpen data={data} onChange={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance, { keyCode: 13 });
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Dropdown className="custom" defaultOpen />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });
});
