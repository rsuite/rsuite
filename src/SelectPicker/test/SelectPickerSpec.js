import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance, createTestContainer } from '@test/testUtils';

import Dropdown from '../SelectPicker';
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

describe('SelectPicker', () => {
  it('Should clean selected default value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} defaultValue={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder').innerText).to.equal('Select');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<Dropdown defaultOpen data={data} value={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-value').innerText).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<Dropdown>{Title}</Dropdown>);
    assert.ok(instance.className.match(/\bpicker-select\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Dropdown disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<Dropdown toggleAs="button" />);
    assert.ok(instance.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<Dropdown block />);
    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<Dropdown defaultOpen data={data} value={value} />);

    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').innerText, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').innerText,
      value
    );
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={value} />);
    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').innerText, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').innerText,
      value
    );
  });

  it('Should render a group', () => {
    const instance = getInstance(<Dropdown defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<Dropdown className="custom" placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <Dropdown placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menu = instance.overlay.querySelector('.rs-picker-select-menu-item-active');
    assert.equal(menu.innerText, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <Dropdown
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item, label) => `${label}-${item.value}`}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, 'foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <Dropdown renderValue={v => [v, placeholder]} data={[{ value: 1, label: '1' }]} value={1} />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <Dropdown renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    // Invalid value
    const instance3 = getDOMNode(<Dropdown renderValue={v => [v, placeholder]} value={''} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-value').innerText, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').innerText, `2${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-value').innerText, placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<Dropdown renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<Dropdown value={2} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = data => {
      if (data === 'Eugenia') {
        done();
      }
    };
    const instance = getInstance(<Dropdown defaultOpen onChange={doneOp} data={data} />);

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-picker-select-menu-item'));
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<Dropdown data={data} defaultValue={'Eugenia'} onClean={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should not output a search bar', () => {
    const instance = getInstance(<Dropdown searchable={false} defaultOpen data={data} />);

    assert.ok(!instance.overlay.querySelector('.rs-picker-search-bar-input'));
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<Dropdown data={data} defaultValue={'Louisa'} />);
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSearch` callback', done => {
    const doneOp = key => {
      if (key === 'a') {
        done();
      }
    };
    const instance = getInstance(<Dropdown defaultOpen onSearch={doneOp} data={data} />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');

    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
  });

  it('Should call `onSelect` by key=Enter ', done => {
    const doneOp = (value, item) => {
      if (value === 'Louisa' && item.value === 'Louisa') {
        done();
      }
    };
    const instance = getInstance(
      <Dropdown defaultOpen data={data} onSelect={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
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

  it('Should focus item by key=ArrowDown ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={'Eugenia'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });

    if (
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').innerText === 'Kariane'
    ) {
      done();
    }
  });

  it('Should focus item by key=ArrowUp ', done => {
    const instance = getInstance(<Dropdown defaultOpen data={data} defaultValue={'Kariane'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowUp' });
    if (
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').innerText === 'Eugenia'
    ) {
      done();
    }
  });

  it('Should call `onChange` by key=Enter ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <Dropdown defaultOpen data={data} onChange={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<Dropdown defaultOpen data={data} onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.target);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<Dropdown defaultOpen data={data} onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.target);
  });

  it('Should have a custom className', () => {
    const instance = getInstance(<Dropdown className="custom" defaultOpen data={data} />);
    assert.include(instance.root.className, 'custom');
    expect(instance.overlay.className).to.not.include('custom');
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

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<Dropdown open data={data} toggleAs={Button} />);
    assert.ok(instance.querySelector('.rs-btn'));
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <Dropdown defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-picker-select-menu-item');

    assert.equal(list.length, 1);
    assert.ok(list[0].innerText, 'Louisa');
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

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<Dropdown data={data} value={2} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').innerText, 'Select');
    assert.notInclude(instance.className, 'rs-picker-has-value');
  });

  it('Should focus the search box', () => {
    const pickerRef = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(<Dropdown ref={pickerRef} data={data} />, createTestContainer());
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(pickerRef.current.target);
    });

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.keyDown(pickerRef.current.target, { key: 'a' });
      assert.equal(document.activeElement, pickerRef.current.overlay.querySelector('input'));
    });
  });
});
