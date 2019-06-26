import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import { globalKey } from '@test/testutils';
import Dropdown from '../MultiCascader';
import Button from '../../Button';

const namespace = `${globalKey}-picker`;
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
        value: 'abcde-1',
        label: 'abcde-1'
      },
      {
        value: 'abcde-2',
        label: 'abcde-2'
      }
    ]
  }
];

describe('MultiCascader', () => {
  it('Should output a dropdown', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Dropdown>Title</Dropdown>);
    const instanceDom = findDOMNode(instance);
    assert.ok(instanceDom.className.match(/\bpicker-cascader\b/));
  });

  it('Should render number', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} value={['abcde-1', 'abcde-2']} classPrefix="rs-picker" />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rs-picker-value-count').innerText, '1');
  });

  it('Should not render number', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        data={items}
        value={['abcde-1', 'abcde-2']}
        countable={false}
        classPrefix="rs-picker"
      />
    );
    const instanceDom = findDOMNode(instance);
    assert.ok(!instanceDom.querySelector('.rs-picker-value-count'));
  });

  it('Should render the parent node by children value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} value={['abcde-1', 'abcde-2']} classPrefix="rs-picker" />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the parent node by children defaultValue', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} defaultValue={['abcde-1', 'abcde-2']} classPrefix="rs-picker" />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the parent node by children value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        data={items}
        value={['abcde-1']}
        classPrefix="rs-picker"
        uncheckableItemValues={['abcde-2']}
      />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the children nodes', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown
        data={items}
        value={['abcde-1', 'abcde-2']}
        classPrefix="rs-picker"
        uncheckableItemValues={['abcde']}
      />
    );
    const instanceDom = findDOMNode(instance);

    assert.equal(instanceDom.querySelector('.rs-picker-value-list').innerText, 'abcde-1,abcde-2');
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
      <Dropdown renderValue={() => placeholder} data={items} value={['abc']} />
    );
    const instanceDom = findDOMNode(instance);
    assert.equal(instanceDom.querySelector('.rs-picker-toggle-value').innerText, placeholder);

    const instance2 = ReactTestUtils.renderIntoDocument(
      <Dropdown renderValue={() => placeholder} />
    );

    const instanceDom2 = findDOMNode(instance2);
    assert.equal(instanceDom2.querySelector(toggleClassName).innerText, 'Select');
  });

  it('Should be active by value', () => {
    const value = ['abcd'];
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown defaultOpen data={items} value={value} />
    );
    const instanceDom = findDOMNode(instance.menuContainerRef.current);
    assert.equal(instanceDom.querySelector(activeClassName).innerText, value);
  });

  it('Should be active by defaultValue', () => {
    const value = ['abcd'];
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown defaultOpen data={items} defaultValue={value} />
    );
    const instanceDom = findDOMNode(instance.menuContainerRef.current);
    assert.equal(instanceDom.querySelector(activeClassName).innerText, value);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} defaultOpen onSelect={doneOp} />
    );
    const instanceDom = findDOMNode(instance.menuContainerRef.current);
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
    const instanceDom = findDOMNode(instance.menuContainerRef.current).querySelector(
      `.${namespace}-check-menu-item-wrapper`
    );

    ReactTestUtils.Simulate.click(instanceDom);
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown data={items} defaultValue={['abc']} onClean={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should clean selected default value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown defaultOpen data={items} defaultValue={['abcde-1']} />
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

  it('Should render a button by toggleComponentClass={Button}', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Dropdown open data={items} toggleComponentClass={Button} />
    );
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-btn');
  });
});
