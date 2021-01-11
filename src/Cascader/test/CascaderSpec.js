import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Cascader from '../Cascader';
import Button from '../../Button';
import { getDOMNode, getInstance } from '@test/testUtils';

const items = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3',
    children: [
      {
        value: '3-1',
        label: '3-1'
      },
      {
        value: '3-2',
        label: '3-2'
      }
    ]
  }
];

describe('Cascader', () => {
  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Cascader>{Title}</Cascader>);

    assert.ok(instance.className.match(/\bpicker-cascader\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Cascader disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
    assert.equal(instance.querySelector('[role=combobox]').getAttribute('aria-disabled'), 'true');
  });

  it('Should be inline', () => {
    const instance = getDOMNode(<Cascader inline />);

    assert.ok(instance.className.match(/\brs-picker-inline\b/));
    assert.ok(instance.querySelector('.rs-picker-cascader-menu-items'));
  });

  it('Should output a placeholder', () => {
    const placeholder = 'foobar';
    const instance = getDOMNode(<Cascader placeholder={placeholder} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, placeholder);
  });

  it('Should output a button', () => {
    const instance = getInstance(<Cascader toggleComponentClass="button" />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Cascader block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <Cascader renderValue={v => [v, placeholder]} data={[{ value: 1, label: '1' }]} value={1} />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <Cascader renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    // Invalid value
    const instance3 = getDOMNode(<Cascader renderValue={v => [v, placeholder]} value={''} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-value').innerText, placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<Cascader renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<Cascader value={2} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should be active by value', () => {
    const value = '2';
    const instance = getInstance(<Cascader defaultOpen data={items} value={value} />);
    const menu = getDOMNode(instance.menuContainerRef.current);
    assert.equal(menu.querySelector('.rs-picker-cascader-menu-item-active').innerText, value);
  });

  it('Should be active by defaultValue', () => {
    const value = '2';
    const instance = getInstance(<Cascader defaultOpen data={items} defaultValue={value} />);
    const menu = getDOMNode(instance.menuContainerRef.current);
    assert.equal(menu.querySelector('.rs-picker-cascader-menu-item-active').innerText, value);
  });

  it('Should call onSelect callback ', done => {
    const doneOp = node => {
      if (node.value === '2') {
        done();
      }
    };

    const instance = getInstance(<Cascader data={items} defaultOpen onSelect={doneOp} />);
    const menu = getDOMNode(instance.menuContainerRef.current);
    ReactTestUtils.Simulate.click(menu.querySelectorAll('.rs-picker-cascader-menu-item')[1]);
  });

  it('Should call onChange callback ', done => {
    const doneOp = value => {
      if (value === '2') {
        done();
      }
    };

    const instance = getInstance(<Cascader data={items} defaultOpen onChange={doneOp} />);
    const menu = getDOMNode(instance.menuContainerRef.current);
    ReactTestUtils.Simulate.click(menu.querySelectorAll('.rs-picker-cascader-menu-item')[1]);
  });

  it('Should call onChange callback by `parentSelectable`', done => {
    const doneOp = value => {
      if (value === '3') {
        done();
      }
    };

    const instance = getInstance(
      <Cascader data={items} defaultOpen parentSelectable onChange={doneOp} />
    );
    const menu = getDOMNode(instance.menuContainerRef.current);
    ReactTestUtils.Simulate.click(menu.querySelectorAll('.rs-picker-cascader-menu-item')[2]);
  });

  it('Should call onClean callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Cascader data={items} defaultValue={'3-1'} onClean={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Cascader onOpen={doneOp} data={items} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Cascader defaultOpen onClose={doneOp} data={items} />);
    picker.close();
  });

  it('Should clean selected default value', () => {
    const instance = getDOMNode(<Cascader defaultOpen data={items} defaultValue={'3-1'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal('Select');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Cascader className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Cascader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Cascader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleComponentClass={Button}', () => {
    const instance = getInstance(<Cascader open data={items} toggleComponentClass={Button} />);
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'rs-btn');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<Cascader value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<Cascader value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<Cascader value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });
});
