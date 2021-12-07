import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, getInstance } from '@test/testUtils';
import SelectPicker from '../SelectPicker';
import Input from '../../Input';
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
    const instance = getDOMNode(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-placeholder').textContent).to.equal('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<SelectPicker />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<SelectPicker defaultOpen data={data} value={'Eugenia'} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
    expect(instance.querySelector('.rs-picker-toggle-value').textContent).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<SelectPicker>{Title}</SelectPicker>);
    assert.ok(instance.className.match(/\bpicker-select\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<SelectPicker disabled />);
    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should output a button', () => {
    const instance = getDOMNode(<SelectPicker toggleAs="button" />);
    assert.ok(instance.querySelector('button'));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<SelectPicker block />);
    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    const instance = getInstance(<SelectPicker defaultOpen data={data} value={value} />);

    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').textContent, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').textContent,
      value
    );
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    const instance = getInstance(<SelectPicker defaultOpen data={data} defaultValue={value} />);
    assert.equal(instance.root.querySelector('.rs-picker-toggle-value').textContent, value);
    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-active').textContent,
      value
    );
  });

  it('Should render a group', () => {
    const instance = getInstance(<SelectPicker defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<SelectPicker className="custom" placeholder="test" />);

    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'test');
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <SelectPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );
    const menu = instance.overlay.querySelector('.rs-picker-select-menu-item-active');
    assert.equal(menu.textContent, '');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <SelectPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item, label) => `${label}-${item.value}`}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, 'foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <SelectPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <SelectPicker renderValue={v => [v, placeholder]} data={[]} value={2} />
    );

    // Invalid value
    const instance3 = getDOMNode(<SelectPicker renderValue={v => [v, placeholder]} value={''} />);

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').textContent, `2${placeholder}`);
    assert.equal(instance3.querySelector('.rs-picker-toggle-value').textContent, placeholder);
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<SelectPicker renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(<SelectPicker value={2} placeholder={'test'} />);
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
    const instance = getInstance(<SelectPicker defaultOpen onChange={doneOp} data={data} />);

    ReactTestUtils.Simulate.click(instance.overlay.querySelector('.rs-picker-select-menu-item'));
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <SelectPicker data={data} defaultValue={'Eugenia'} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should not output a search bar', () => {
    const instance = getInstance(<SelectPicker searchable={false} defaultOpen data={data} />);

    assert.ok(!instance.overlay.querySelector('.rs-picker-search-bar-input'));
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<SelectPicker data={data} defaultValue={'Louisa'} />);
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
    const instance = getInstance(<SelectPicker defaultOpen onSearch={doneOp} data={data} />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');

    input.value = 'a';

    ReactTestUtils.Simulate.change(input);
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
      <SelectPicker defaultOpen data={data} onSelect={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<SelectPicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<SelectPicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });

    assert.equal(
      instance.overlay.querySelector('.rs-picker-select-menu-item-focus').textContent,
      'Kariane'
    );
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(<SelectPicker defaultOpen data={data} defaultValue={'Kariane'} />);
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
      <SelectPicker defaultOpen data={data} onChange={doneOp} defaultValue={'Kariane'} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<SelectPicker defaultOpen data={data} onBlur={doneOp} />);
    ReactTestUtils.Simulate.blur(instance.target);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<SelectPicker defaultOpen data={data} onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.target);
  });

  it('Should have a custom className', () => {
    const instance = getInstance(<SelectPicker className="custom" defaultOpen data={data} />);
    assert.include(instance.root.className, 'custom');
    expect(instance.overlay.className).to.not.include('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<SelectPicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<SelectPicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getDOMNode(<SelectPicker open data={data} toggleAs={Button} />);
    assert.ok(instance.querySelector('.rs-btn'));
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <SelectPicker defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-picker-select-menu-item');

    assert.equal(list.length, 1);
    assert.ok(list[0].textContent, 'Louisa');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<SelectPicker value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<SelectPicker value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<SelectPicker value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').textContent, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const instance = getDOMNode(<SelectPicker data={data} value={2} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.notInclude(instance.className, 'rs-picker-has-value');
  });

  it('Should focus the search box', () => {
    const pickerRef = React.createRef();
    const inputRef = React.createRef();

    render(
      <SelectPicker
        ref={pickerRef}
        data={data}
        renderExtraFooter={() => <Input ref={inputRef} />}
      />
    );

    const target = pickerRef.current.target;

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.click(target);
    });

    ReactTestUtils.act(() => {
      // https://codesandbox.io/s/silent-voice-6kzx7
      inputRef.current.focus();
      ReactTestUtils.Simulate.keyDown(inputRef.current, { key: 'a' });
    });
    assert.equal(document.activeElement, inputRef.current);

    ReactTestUtils.act(() => {
      ReactTestUtils.Simulate.keyDown(target, { key: 'a' });
    });

    assert.equal(
      document.activeElement,
      pickerRef.current.overlay.querySelector('.rs-picker-search-bar-input')
    );
  });

  describe('Plain text', () => {
    it("Should render selected option's label", () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <SelectPicker data={data} value="Eugenia" plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Eugenia');
    });
    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <SelectPicker data={data} value={null} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });
});
