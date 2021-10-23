import React from 'react';
import { render } from '@testing-library/react';
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
    expect(instance.querySelector('.rs-picker-toggle-placeholder').textContent).to.equal('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<InputPicker />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<InputPicker defaultOpen data={data} value={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-value').textContent).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const instance = getDOMNode(<InputPicker />);

    assert.ok(instance.className.match(/\bpicker-input\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<InputPicker disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be plaintext', () => {
    const instance1 = getInstance(<InputPicker plaintext data={data} value={'Eugenia'} />);
    const instance2 = getInstance(<InputPicker plaintext data={data} />);
    const instance3 = getInstance(<InputPicker plaintext data={data} placeholder="-" />);
    const instance4 = getInstance(
      <InputPicker plaintext data={data} placeholder="-" value={'Eugenia'} />
    );

    assert.equal(instance1.target.textContent, 'Eugenia');
    assert.equal(instance2.target.textContent, 'Not selected');
    assert.equal(instance3.target.textContent, '-');
    assert.equal(instance4.target.textContent, 'Eugenia');
  });

  it('Should be readOnly', () => {
    const input1Ref = React.createRef();
    const input2Ref = React.createRef();

    render(
      <div>
        <InputPicker ref={input1Ref} />
        <InputPicker ref={input2Ref} readOnly />
      </div>
    );

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.focus(
        input1Ref.current.root.querySelector('.rs-picker-search-input')
      );
      ReactTestUtils.Simulate.focus(
        input2Ref.current.root.querySelector('.rs-picker-search-input')
      );
    });

    assert.ok(input1Ref.current.overlay);
    assert.ok(input2Ref.current.root.querySelector('input[readonly]'));
    assert.equal(input2Ref.current.overlay, undefined);
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

    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').textContent, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').textContent,
      value
    );
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={value} />);
    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').textContent, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').textContent,
      value
    );
  });

  it('Should render a group', () => {
    const instance = getInstance(<InputPicker defaultOpen groupBy="role" data={data} />);

    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<InputPicker className="custom" placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <InputPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menuContainer = instance.overlay.querySelector('.rs-picker-select-menu-item-active');
    assert.equal(menuContainer.textContent, '');
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
    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, 'foo-bar');
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

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').textContent, `2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<InputPicker renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<InputPicker value={2} placeholder={'test'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'test');
  });

  it('Should call `onChange` callback with correct value', done => {
    const doneOp = data => {
      try {
        assert.equal(data, 'Eugenia');
        done();
      } catch (err) {
        done(err);
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
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Backspace' });
  });

  it('Should call `onSelect` with correct args by key=Enter ', done => {
    const doneOp = (value, item) => {
      try {
        assert.equal(value, 'Louisa');
        assert.equal(item.value, 'Louisa');
        done();
      } catch (err) {
        done(err);
      }
    };
    const instance = getInstance(
      <InputPicker defaultOpen data={data} onSelect={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<InputPicker data={data} defaultValue={'Louisa'} />);
    assert.ok(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onSearch` callback with correct search keyword', done => {
    const doneOp = key => {
      try {
        assert.equal(key, 'a');
        done();
      } catch (err) {
        done(err);
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

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });

    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').textContent,
      'Kariane'
    );
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<InputPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowUp' });

    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').textContent,
      'Eugenia'
    );
  });

  it('Should call `onChange` by key=Enter ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <InputPicker defaultOpen data={data} onChange={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
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
    const list = instance.overlay.querySelectorAll('.rs-picker-select-menu-item');
    assert.equal(list.length, 1);
    assert.ok(list[0].textContent, 'Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<InputPicker value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<InputPicker value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<InputPicker value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').textContent, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<InputPicker data={data} value={2} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.notInclude(instance.className, 'rs-picker-has-value');
  });

  it('Should set a tabindex for input', () => {
    const instance = getDOMNode(<InputPicker tabIndex={10} />);
    assert.equal(instance.querySelector('.rs-picker-search-input').getAttribute('tabindex'), '10');
  });

  it('Should call `onCreate` callback with correct value', done => {
    const doneOp = value => {
      try {
        assert.equal(value, 'abc');
        done();
      } catch (err) {
        done(err);
      }
    };

    const inputRef = React.createRef();

    render(<InputPicker ref={inputRef} defaultOpen data={data} onCreate={doneOp} creatable />);

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.focus(inputRef.current.root);
      const input = inputRef.current.root.querySelector('.rs-picker-search-input');
      input.value = 'abc';
      ReactTestUtils.Simulate.change(input);
    });

    ReactTestUtils.act(() => {
      const input = inputRef.current.root.querySelector('.rs-picker-search-input');
      ReactTestUtils.Simulate.keyDown(input, { key: 'Enter' });
    });
  });
});
