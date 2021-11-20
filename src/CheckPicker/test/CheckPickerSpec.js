import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { globalKey, getDOMNode, getInstance } from '@test/testUtils';

import CheckPicker from '../CheckPicker';
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
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} />
    );
    ReactTestUtils.Simulate.click(instance.root.querySelector(cleanClassName));
    expect(instance.root.querySelector(placeholderClassName).textContent).to.equal('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<CheckPicker />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<CheckPicker defaultOpen data={data} value={['Eugenia']} />);

    ReactTestUtils.Simulate.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(valueClassName).textContent).to.equal('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<CheckPicker>{Title}</CheckPicker>);

    assert.ok(instance.className.match(/\bpicker-check\b/));
  });

  it('Should output a button', () => {
    const instance = getInstance(<CheckPicker toggleAs="button" />);
    assert.ok(instance.root.querySelector('button'));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<CheckPicker disabled />);

    assert.ok(instance.className.match(/\bdisabled\b/));
  });

  it('Should be block', () => {
    const instance = getDOMNode(<CheckPicker block />);

    assert.ok(instance.className.match(/\bblock\b/));
  });

  it('Should be readOnly', () => {
    const instance = getDOMNode(<CheckPicker readOnly />);
    assert.include(instance.className, 'rs-picker-read-only');
  });

  it('Should be plaintext', () => {
    const instance = getDOMNode(<CheckPicker plaintext />);
    assert.include(instance.className, 'rs-picker-plaintext');
  });

  it('Should active item by `value`', () => {
    const value = ['Louisa'];
    const instance = getInstance(<CheckPicker defaultOpen data={data} value={value} />);
    assert.equal(instance.root.querySelector(valueClassName).textContent, 'Louisa');
    assert.equal(instance.overlay.querySelector(itemActiveClassName).textContent, value);
  });

  it('Should active item by `defaultValue`', () => {
    const value = ['Louisa'];
    const instance = getInstance(<CheckPicker defaultOpen data={data} defaultValue={value} />);
    assert.equal(instance.root.querySelector(valueClassName).textContent, 'Louisa');
    assert.equal(instance.overlay.querySelector(itemActiveClassName).textContent, value);
  });

  it('Should render a group', () => {
    const instance = getInstance(<CheckPicker defaultOpen groupBy="role" data={data} />);
    assert.ok(instance.overlay.querySelector('.rs-picker-menu-group'));
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<CheckPicker className="custom" placeholder="test" />);

    assert.equal(instance.querySelector(placeholderClassName).textContent, 'test');
  });

  it('Should render value by `renderValue`', () => {
    const instance = getDOMNode(
      <CheckPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['1', '2']}
        renderValue={value => value.join(',')}
      />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, '1,2');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const instance = getDOMNode(
      <CheckPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );

    // Invalid value
    const instance2 = getDOMNode(
      <CheckPicker renderValue={v => [v, placeholder]} data={[]} value={[2]} />
    );

    assert.equal(instance.querySelector('.rs-picker-toggle-value').textContent, `1${placeholder}`);
    assert.equal(instance2.querySelector('.rs-picker-toggle-value').textContent, `2${placeholder}`);
  });

  it('Should render a placeholder when value error', () => {
    const instance = getDOMNode(
      <CheckPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );

    assert.equal(instance.querySelector(placeholderClassName).textContent, 'test');
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <CheckPicker defaultOpen onChange={doneOp} data={[{ label: '1', value: '1' }]} />
    );
    ReactTestUtils.Simulate.change(instance.overlay.querySelectorAll('input')[1]);
  });

  it('Should call `onClean` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <CheckPicker data={data} defaultValue={['Eugenia']} onClean={doneOp} />
    );

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-picker-toggle-clean'));
  });

  it('Should call `onClean` callback by key="Backspace" ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<CheckPicker data={data} onClean={doneOp} defaultOpen />);

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Backspace' });
  });

  it('Should call `onClean` callback by key="Backspace" on overlay ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<CheckPicker data={data} onClean={doneOp} defaultOpen />);

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.overlay, { key: 'Enter' });
    ReactTestUtils.Simulate.keyDown(instance.overlay, { key: 'Backspace' });
  });

  it('Should call `onOpen` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<CheckPicker onOpen={doneOp} data={data} />);
    picker.open();
  });

  it('Should call `onClose` callback', done => {
    const doneOp = () => {
      done();
    };
    const picker = getInstance(<CheckPicker defaultOpen onClose={doneOp} data={data} />);
    picker.close();
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<CheckPicker data={data} defaultValue={['Louisa']} />);
    assert.ok(instance.querySelector(cleanClassName));
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });

    assert.equal(instance.overlay.querySelector(itemFocusClassName).textContent, 'Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Kariane']} />
    );

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowUp' });

    assert.equal(instance.overlay.querySelector(itemFocusClassName).textContent, 'Eugenia');
  });

  it('Should call `onChange` by key=Enter ', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} onChange={doneOp} defaultValue={['Kariane']} />
    );
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
  });

  it('Should call `onSelect` by key=Enter ', done => {
    const doneOp = (value, item) => {
      try {
        assert.lengthOf(value, 2);
        assert.equal(item.value, 'Louisa');
        done();
      } catch (err) {
        done(err);
      }
    };
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} onSelect={doneOp} defaultValue={['Kariane']} />
    );
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
  });

  it('Should call onBlur callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<CheckPicker data={data} onBlur={doneOp} />);

    ReactTestUtils.Simulate.blur(instance.target);
  });

  it('Should call onFocus callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(<CheckPicker data={data} onFocus={doneOp} />);
    ReactTestUtils.Simulate.focus(instance.target);
  });

  it('Should have a custom className', () => {
    const instance = getInstance(
      <CheckPicker className="custom" defaultOpen data={[{ label: '', value: '1' }]} />
    );
    assert.include(instance.root.className, 'custom');
    expect(instance.overlay.className).to.not.include('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<CheckPicker style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Allow `label` to be an empty string', () => {
    const instance = getInstance(
      <CheckPicker
        placeholder="test"
        data={[{ label: '', value: '1' }]}
        value={['1']}
        defaultOpen
      />
    );
    const checkbox = instance.overlay.querySelector('.rs-checkbox-checked');
    assert.equal(checkbox.textContent, '');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CheckPicker classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should be sticky', () => {
    const instance = getInstance(
      <CheckPicker placeholder="test" sticky data={data} value={['Kariane']} defaultOpen />
    );

    const menu = instance.overlay.querySelector('.rs-checkbox');

    assert.equal(menu.textContent, 'Kariane');
  });

  it('Should be render selected options be sticky', () => {
    const instance = getInstance(
      <CheckPicker
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
    const instance = getInstance(<CheckPicker open data={data} toggleAs={Button} />);
    assert.ok(instance.root.querySelector('.rs-btn'));
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-check-item');
    assert.equal(list.length, 1);
    assert.ok(list[0].textContent, 'Louisa');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<CheckPicker renderValue={() => 'value'} />);
    assert.equal(instance.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<CheckPicker value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<CheckPicker value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(<CheckPicker value="Test" renderValue={() => undefined} />);

    assert.equal(instance1.querySelector('.rs-picker-toggle-value').textContent, '1');
    assert.equal(instance2.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');
    assert.equal(instance3.querySelector('.rs-picker-toggle-placeholder').textContent, 'Select');

    assert.include(instance1.className, 'rs-picker-has-value');
    assert.notInclude(instance2.className, 'rs-picker-has-value');
    assert.notInclude(instance3.className, 'rs-picker-has-value');
  });

  it('Should not call `onClean` callback on Input ', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClean={onCleanSpy} defaultOpen />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');

    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'ArrowDown' });
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Enter' });
    ReactTestUtils.Simulate.keyDown(input, { key: 'Backspace' });

    assert.isTrue(onCleanSpy.notCalled);
  });

  it('Should call onClose callback by key="Escape"', done => {
    const instance = getInstance(<CheckPicker data={data} onClose={done} defaultOpen />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Escape' });
  });

  it('Should call onClose callback by key="Tab"', done => {
    const instance = getInstance(<CheckPicker data={data} onClose={done} defaultOpen />);
    ReactTestUtils.Simulate.keyDown(instance.target, { key: 'Tab' });
  });

  describe('Plain text', () => {
    it("Should render selected options' labels (comma-separated) and selected options count", () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <CheckPicker data={data} value={['Eugenia', 'Kariane']} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Eugenia,Kariane2');
    });
    it('Should render "Not selected" if value is empty', () => {
      const { getByTestId } = render(
        <div data-testid="content">
          <CheckPicker data={data} value={[]} plaintext />
        </div>
      );

      expect(getByTestId('content')).to.have.text('Not selected');
    });
  });

  describe('ref testing', () => {
    it('Should call onOpen', done => {
      const doneOp = () => {
        done();
      };

      const instance = getInstance(<CheckPicker onOpen={doneOp} data={data} />);
      instance.open();
    });

    it('Should call onClose', done => {
      const doneOp = () => {
        done();
      };

      const instance = getInstance(<CheckPicker onClose={doneOp} data={data} />);
      instance.open();
      instance.close();
    });
  });
});
