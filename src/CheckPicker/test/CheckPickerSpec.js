import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { globalKey, getDOMNode, getInstance } from '@test/testUtils';

import Dropdown from '../CheckPicker';
import Button from '../../Button';

const namespace = `${globalKey}-picker`;
const itemFocusClassName = '.rs-check-item-focus';
const itemActiveClassName = '.rs-checkbox-checked';
const cleanClassName = `.${namespace}-toggle-clean`;
const placeholderClassName = `.${namespace}-toggle-placeholder`;
const valueClassName = `.${namespace}-value-list`;

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

describe('CheckPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={['Eugenia']} />);
    ReactTestUtils.Simulate.click(instance.root.querySelector(cleanClassName));
    expect(instance.root.querySelector(placeholderClassName).innerText).to.equal('Select');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} value={['Eugenia']} />);

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(valueClassName).innerText).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Dropdown>{Title}</Dropdown>);

    assert.ok(instance.className.match(/\bpicker-check\b/));
  });

  it('Should output a button', () => {
    const instance = getInstance(<Dropdown toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Dropdown disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Dropdown block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should be readOnly', () => {
    const instance = getDOMNode(<Dropdown readOnly />);
    assert.include(instance.className, 'rs-picker-read-only');
  });

  it('Should be plaintext', () => {
    const instance = getDOMNode(<Dropdown plaintext />);
    assert.include(instance.className, 'rs-picker-plaintext');
  });

  it('Should active item by `value`', () => {
    const value = ['Louisa'];
    const instance = getInstance(<Dropdown defaultOpen data={data} value={value} />);
    assert.equal(instance.root.querySelector(valueClassName).innerText, 'Louisa');
    assert.equal(instance.overlay.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = ['Louisa'];
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={value} />);
    assert.equal(instance.root.querySelector(valueClassName).innerText, 'Louisa');
    assert.equal(instance.overlay.querySelector(itemActiveClassName).innerText, value);
  });

  it('Should render a group', () => {
    const instance = getInstance(<Dropdown defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<Dropdown className="custom" placeholder="test" />);

    assert.equal(instance.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <Dropdown
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['1', '2']}
        renderValue={value => value.join(',')}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, '1,2');
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

    assert.equal(instance.querySelector(placeholderClassName).innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <Dropdown defaultOpen onChange={doneOp} data={[{ label: '1', value: '1' }]} />
    );
    ReactTestUtils.Simulate.change(instance.overlay.querySelectorAll('input')[1]);
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <Dropdown data={data} defaultValue={['Eugenia']} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Dropdown onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<Dropdown defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<Dropdown data={data} defaultValue={['Louisa']} />);
    assert.ok(instance.querySelector(cleanClassName));
  });

  it('Should focus item by keyCode=40 ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={['Eugenia']} />);

    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 40 });

    if (instance.overlay.querySelector(itemFocusClassName).innerText === 'Kariane') {
      done();
    }
  });

  it('Should focus item by keyCode=38 ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={['Kariane']} />);

    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 38 });

    if (instance.overlay.querySelector(itemFocusClassName).innerText === 'Eugenia') {
      done();
    }
  });

  it('Should call `onChange` by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <Dropdown defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane']} />
    );
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 13 });
  });

  it('Should call `onSelect` by keyCode=13 ', done => {
    const doneOp = (value, item) => {
      if (value.length === 2 && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getInstance(
      <Dropdown defaultOpen data={data} onSelect={doneOp} defaultValue={['Kariane']} />
    );
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 13 });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<Dropdown data={data} onBlur={doneOp} />);

    ReactTestUtils.Simulate.blur(instance.target);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<Dropdown data={data} onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.target);
  });

  it('Should have a custom className', () => {
    const instance = getInstance(
      <Dropdown className="custom" defaultOpen data={[{ label: '', value: '1' }]} />
    );
    assert.include(instance.root.className, 'custom');
    expect(instance.overlay.className).to.not.include('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Dropdown style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <Dropdown placeholder="test" data={[{ label: '', value: '1' }]} value={['1']} defaultOpen />
    );
    const checkbox = instance.overlay.querySelector('.rs-checkbox-checked');
    assert.equal(checkbox.innerText, '');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Dropdown classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should be sticky', () => {
    const instance = getInstance(
      <Dropdown placeholder="test" sticky data={data} value={['Kariane']} defaultOpen />
    );

    const menu = instance.overlay.querySelector('.rs-checkbox');

    assert.equal(menu.innerText, 'Kariane');
  });

  it('Should be render selected options be sticky', () => {
    const instance = getInstance(
      <Dropdown
        placeholder="test"
        sticky
        data={data}
        value={['Kariane', 'Louisa', 'Eugenia']}
        defaultOpen
      />
    );

    const count = instance.overlay.querySelectorAll('.rs-checkbox-checked').length;
    assert.equal(count, 3);
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getInstance(<Dropdown open data={data} toggleAs={Button} />);
    assert.ok(instance.root.querySelector('.rs-btn'));
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-check-item');
    assert.equal(list.length, 1);
    assert.ok(list[0].innerText, 'Louisa');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<Dropdown renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<Dropdown value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<Dropdown value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<Dropdown value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  describe('ref testing', () => {
    it('Should call onOpen', done => {
      const doneOp = () => {
        done();
      };

      const instance = getInstance(<Dropdown onOpen={doneOp} data={data} />);
      instance.open();
    });

    it('Should call onClose', done => {
      const doneOp = () => {
        done();
      };

      const instance = getInstance(<Dropdown onClose={doneOp} data={data} />);
      instance.open();
      instance.close();
    });
  });
});
