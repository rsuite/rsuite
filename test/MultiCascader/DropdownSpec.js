import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import { namespace } from 'rsuite-utils/lib/Picker/constants';
import Dropdown from '../../src/MultiCascader/Dropdown';

const toggleClassName = `.${namespace}-toggle-placeholder`;
const activeClassName = `.${namespace}-check-menu-item-active`;
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

describe('MultiCascader - Dropdown', () => {
  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown>{Title}</Dropdown>);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bpicker-cascader\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown disabled />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bdisabled\b/));
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown placeholder={placeholder} />);
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(toggleClassName).innerText, placeholder);
  });

  it('Should output a button', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown toggleComponentClass="button" />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be block', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown block />);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bblock\b/));
  });

  it('Should output a placeholder by renderValue()', () => {
    const placeholder = 'foobar';
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown renderValue={() => placeholder} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector(toggleClassName).innerText, placeholder);
  });

  it('Should be active by value', () => {
    const value = ['abcd'];
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown defaultOpen data={items} value={value} />
    );
    const instanceDom = findDOMNode(instance.menuContainer);
    assert.equal(instanceDom.querySelector(activeClassName).innerText, value);
  });

  it('Should be active by defaultValue', () => {
    const value = ['abcd'];
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown defaultOpen data={items} defaultValue={value} />
    );
    const instanceDom = findDOMNode(instance.menuContainer);
    assert.equal(instanceDom.querySelector(activeClassName).innerText, value);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} defaultOpen onSelect={doneOp} />
    );
    const instanceDom = findDOMNode(instance.menuContainer);
    ReactTestUtils.Simulate.click(instanceDom.querySelector(itemClassName));
  });

  it('Should call onChange callback ', done => {
    const doneOp = value => {
      if (value[0] === 'abc') {
        done();
      }
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} defaultOpen onChange={doneOp} />
    );
    const instanceDom = findDOMNode(instance.menuContainer).querySelector(
      `.${namespace}-check-menu-item-wrapper`
    );

    ReactTestUtils.Simulate.click(instanceDom);
  });

  it('Should clean selected default value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown defaultOpen data={items} defaultValue={['vv-abc']} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-picker-toggle-clean'));
    expect(instanceDOM.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal('Select');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
