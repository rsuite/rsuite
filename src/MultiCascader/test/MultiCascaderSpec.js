import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { globalKey, getDOMNode, getInstance } from '@test/testUtils';
import Dropdown from '../MultiCascader';
import Button from '../../Button';

const namespace = `${globalKey}-picker`;
const toggleClassName = `.${namespace}-toggle-placeholder`;

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
    const instance = getDOMNode(<Dropdown>Title</Dropdown>);

    assert.ok(instance.className.match(/\bpicker-cascader\b/));
  });

  it('Should render number', () => {
    const instance = getDOMNode(
      <Dropdown data={items} value={['abcde-1', 'abcde-2']} classPrefix="rs-picker" />
    );

    assert.equal(instance.querySelector('.rs-picker-value-count').innerText, '1');
  });

  it('Should not render number', () => {
    const instance = getDOMNode(
      <Dropdown
        data={items}
        value={['abcde-1', 'abcde-2']}
        countable={false}
        classPrefix="rs-picker"
      />
    );

    assert.ok(!instance.querySelector('.rs-picker-value-count'));
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(
      <Dropdown data={items} value={['abcde-1', 'abcde-2']} classPrefix="rs-picker" />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the parent node by children defaultValue', () => {
    const instance = getDOMNode(
      <Dropdown data={items} defaultValue={['abcde-1', 'abcde-2']} classPrefix="rs-picker" />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the parent node by children value', () => {
    const instance = getDOMNode(
      <Dropdown
        data={items}
        value={['abcde-1']}
        classPrefix="rs-picker"
        uncheckableItemValues={['abcde-2']}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde (All)');
  });

  it('Should render the children nodes', () => {
    const instance = getDOMNode(
      <Dropdown
        data={items}
        value={['abcde-1', 'abcde-2']}
        classPrefix="rs-picker"
        uncheckableItemValues={['abcde']}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-value-list').innerText, 'abcde-1,abcde-2');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Dropdown disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.equal(instance.querySelector('[role=combobox]').getAttribute('aria-disabled'), 'true');
  });

  it('Should be inline', () => {
    const instance = getDOMNode(<Dropdown inline />);

    assert.ok(instance.className.match(/\brs-picker-inline\b/));
    assert.ok(instance.querySelector('.rs-picker-cascader-menu-items'));
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(<Dropdown placeholder={placeholder} />);

    assert.equal(instance.querySelector(toggleClassName).innerText, placeholder);
  });

  it('Should output a button', () => {
    const instance = getInstance(<Dropdown toggleComponentClass="button" />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Dropdown block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a placeholder by renderValue()', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(
      <Dropdown renderValue={() => placeholder} data={items} value={['abc']} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, placeholder);

    const instance2 = getDOMNode(<Dropdown renderValue={() => placeholder} />);
    assert.equal(instance2.querySelector(toggleClassName).innerText, 'Select');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <Dropdown renderValue={v => [v, placeholder]} data={[{ value: 1, label: '1' }]} value={[1]} />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <Dropdown renderValue={v => [v, placeholder]} data={[]} value={[2]} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<Dropdown renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <Dropdown
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should be active by value', () => {
    const value = ['abcd'];
    const instance = getInstance(<Dropdown defaultOpen data={items} value={value} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    assert.equal(menu.querySelector('.rs-checkbox-checked').innerText, value);
  });

  it('Should be active by defaultValue', () => {
    const value = ['abcd'];
    const instance = getInstance(<Dropdown defaultOpen data={items} defaultValue={value} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    assert.equal(menu.querySelector('.rs-checkbox-checked').innerText, value);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<Dropdown data={items} defaultOpen onSelect={doneOp} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    ReactTestUtils.Simulate.click(menu.querySelector('.rs-checkbox'));
  });

  it('Should call onCheck callback ', done => {
    let checkbox = null;
    const doneOp = (value, item, checked, event) => {
      if (value[0] === 'abc' && item.value === 'abc' && checked && event.target === checkbox) {
        done();
      }
    };

    const instance = getInstance(<Dropdown data={items} defaultOpen onCheck={doneOp} />);
    const menu = findDOMNode(instance.menuContainerRef.current);
    checkbox = menu.querySelector('.rs-checkbox-wrapper');
    ReactTestUtils.Simulate.click(checkbox);
  });

  it('Should call onChange callback ', done => {
    const doneOp = value => {
      if (value[0] === 'abc') {
        done();
      }
    };

    const instance = getInstance(<Dropdown data={items} defaultOpen onChange={doneOp} />);
    const menu = findDOMNode(instance.menuContainerRef.current).querySelector(
      '.rs-checkbox-wrapper'
    );

    ReactTestUtils.Simulate.click(menu);
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Dropdown data={items} defaultValue={['abc']} onClean={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Dropdown onOpen={doneOp} data={items} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Dropdown defaultOpen onClose={doneOp} data={items} />);
    picker.close();
  });

  it('Should clean selected default value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={items} defaultValue={['abcde-1']} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal('Select');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Dropdown className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Dropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleComponentClass={Button}', () => {
    const instance = getInstance(<Dropdown open data={items} toggleComponentClass={Button} />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-btn');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<Dropdown value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<Dropdown value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<Dropdown value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });
});
