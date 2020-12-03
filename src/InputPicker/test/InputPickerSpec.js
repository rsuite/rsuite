import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';

import InputPicker from '../InputPicker';
import Button from '../../Button';

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

describe('InputPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getDOMNode(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal('Select');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<InputPicker defaultOpen data={data} value={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-value').innerText).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const instance = getDOMNode(<InputPicker />);

    assert.ok(instance.className.match(/\bpicker-input\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<InputPicker disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<InputPicker toggleAs="button" />);
    assert.ok(instance.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<InputPicker block />);
    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<InputPicker defaultOpen data={data} value={value} />);

    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').innerText, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').innerText,
      value
    );
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={value} />);
    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').innerText, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').innerText,
      value
    );
  });

  it('Should render a group', () => {
    const instance = getInstance(<InputPicker defaultOpen groupBy="role" data={data} />);

    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<InputPicker className="custom" placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <InputPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menuContainer = instance.overlay.querySelector('.rs-picker-select-menu-item-active');
    assert.equal(menuContainer.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <InputPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item) => `${item.label}-${value}`}
      />
    );
    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, 'foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <InputPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <InputPicker renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<InputPicker renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<InputPicker value={2} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = data => {
      if (data === 'Eugenia') {
        done();
      }
    };
    const instance = getInstance(<InputPicker defaultOpen onChange={doneOp} data={data} />);

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-picker-select-menu-item'));
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <InputPicker data={data} defaultValue={'Eugenia'} onClean={doneOp} />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onClean` callback by keyDown', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <InputPicker data={data} defaultOpen defaultValue={'Eugenia'} onClean={doneOp} />
    );
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 8 });
  });

  it('Should call `onSelect` by keyCode=13 ', done => {
    const doneOp = (value, item) => {
      if (value === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getInstance(
      <InputPicker defaultOpen data={data} onSelect={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 40 });
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 13 });
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<InputPicker data={data} defaultValue={'Louisa'} />);
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getDOMNode(<InputPicker defaultOpen onSearch={doneOp} />);

    const input = instance.querySelector('.rs-picker-search-input');
    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<InputPicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<InputPicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('Should focus item by keyCode=40 ', done => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 40 });

    if (
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').innerText === 'Kariane'
    ) {
      done();
    }
  });

  it('Should focus item by keyCode=38 ', done => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 38 });

    if (
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').innerText === 'Eugenia'
    ) {
      done();
    }
  });

  it('Should call `onChange` by keyCode=13 ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <InputPicker defaultOpen data={data} onChange={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { keyCode: 13 });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputPicker onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.querySelector('.rs-picker-search-input'));
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<InputPicker onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.querySelector('.rs-picker-search-input'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<InputPicker className="custom" defaultOpen />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<InputPicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<InputPicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<InputPicker open data={data} toggleAs={Button} />);

    assert.ok(instance.querySelector('.rs-btn'));
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <InputPicker defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('a');
    assert.equal(list.length, 1);
    assert.ok(list[0].innerText, 'Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<InputPicker value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<InputPicker value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<InputPicker value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').innerText, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<InputPicker data={data} value={2} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.notInclude(instance.className, 'rs-picker-has-value');
  });
});
