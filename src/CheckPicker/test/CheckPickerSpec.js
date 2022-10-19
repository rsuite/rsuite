import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
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

    fireEvent.click(instance.root.querySelector(cleanClassName));

    expect(instance.root.querySelector(placeholderClassName)).to.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const instance = getDOMNode(<CheckPicker data={[]} />);

    expect(instance).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    const instance = getDOMNode(<CheckPicker defaultOpen data={data} value={['Eugenia']} />);

    fireEvent.click(instance.querySelector(cleanClassName));
    expect(instance.querySelector(valueClassName)).to.text('Eugenia');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const instance = getDOMNode(<CheckPicker data={[]}>{Title}</CheckPicker>);

    expect(instance).to.have.class('rs-picker-check');
  });

  it('Should output a button', () => {
    const instance = getInstance(<CheckPicker data={[]} toggleAs="button" />);
    expect(instance.root.querySelector('button')).to.be.exist;
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<CheckPicker data={[]} disabled />);

    expect(instance).to.have.class('rs-picker-disabled');
  });

  it('Should be block', () => {
    const instance = getDOMNode(<CheckPicker data={[]} block />);

    expect(instance).to.have.class('rs-picker-block');
  });

  it('Should be readOnly', () => {
    const instance = getDOMNode(<CheckPicker data={[]} readOnly />);

    expect(instance).to.have.class('rs-picker-read-only');
  });

  it('Should be plaintext', () => {
    const instance = getDOMNode(<CheckPicker data={[]} plaintext />);
    expect(instance).to.have.class('rs-picker-plaintext');
  });

  it('Should active item by `value`', () => {
    const value = ['Louisa'];
    const instance = getInstance(<CheckPicker defaultOpen data={data} value={value} />);

    expect(instance.root.querySelector(valueClassName)).to.text('Louisa');
    expect(instance.overlay.querySelector(itemActiveClassName)).to.text('Louisa');
  });

  it('Should active item by `defaultValue`', () => {
    const value = ['Louisa'];
    const instance = getInstance(<CheckPicker defaultOpen data={data} defaultValue={value} />);

    expect(instance.root.querySelector(valueClassName)).to.text('Louisa');
    expect(instance.overlay.querySelector(itemActiveClassName)).to.text('Louisa');
  });

  it('Should render a group', () => {
    const instance = getInstance(<CheckPicker defaultOpen groupBy="role" data={data} />);

    expect(instance.overlay.querySelector('.rs-picker-menu-group')).to.exist;
  });

  it('Should have a placeholder', () => {
    const instance = getDOMNode(<CheckPicker data={[]} className="custom" placeholder="test" />);

    expect(instance.querySelector(placeholderClassName)).to.text('test');
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

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text('1,2');
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

    expect(instance.querySelector('.rs-picker-toggle-value')).to.text(`1${placeholder}`);
    expect(instance2.querySelector('.rs-picker-toggle-value')).to.text(`2${placeholder}`);
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

    expect(instance.querySelector(placeholderClassName)).to.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChange = sinon.spy();
    const { getByText } = render(
      <CheckPicker defaultOpen onChange={onChange} data={[{ label: 'Option 1', value: '1' }]} />
    );

    fireEvent.click(getByText('Option 1'));

    expect(onChange).to.have.been.calledOnce;
    expect(onChange.getCall(0).args[0]).to.eql(['1']);
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    const instance = getDOMNode(
      <CheckPicker data={data} defaultValue={['Eugenia']} onClean={onCleanSpy} />
    );

    fireEvent.click(instance.querySelector('.rs-picker-toggle-clean'));

    expect(onCleanSpy).to.have.been.calledOnce;
  });

  it('Should call `onClean` callback by key="Backspace" ', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClean={onCleanSpy} defaultOpen />);

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });
    fireEvent.keyDown(instance.target, { key: 'Backspace' });

    expect(onCleanSpy).to.have.been.called;
  });

  it('Should call `onClean` callback by key="Backspace" on overlay ', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClean={onCleanSpy} defaultOpen />);

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.overlay, { key: 'Enter' });
    fireEvent.keyDown(instance.overlay, { key: 'Backspace' });

    expect(onCleanSpy).to.have.been.called;
  });

  it('Should call `onOpen` callback', async () => {
    const onOpenSpy = sinon.spy();
    const picker = getInstance(<CheckPicker onOpen={onOpenSpy} data={data} />);

    picker.open();

    await waitFor(() => {
      expect(onOpenSpy).to.have.been.called;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onCloseSpy = sinon.spy();
    const picker = getInstance(<CheckPicker defaultOpen onClose={onCloseSpy} data={data} />);
    picker.close();

    await waitFor(() => {
      expect(onCloseSpy).to.have.been.called;
    });
  });

  it('Should output a clean button', () => {
    const instance = getDOMNode(<CheckPicker data={data} defaultValue={['Louisa']} />);

    expect(instance.querySelector(cleanClassName)).to.exist;
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(instance.overlay.querySelector(itemFocusClassName)).to.text('Kariane');
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Kariane']} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(instance.overlay.querySelector(itemFocusClassName)).to.text('Eugenia');
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChangeSpy = sinon.spy();
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} onChange={onChangeSpy} defaultValue={['Kariane']} />
    );

    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onChangeSpy).to.have.been.calledOnce;
  });

  it('Should call `onSelect` by key=Enter ', async () => {
    const onSelectSpy = sinon.spy();
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} onSelect={onSelectSpy} defaultValue={['Kariane']} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });

    expect(onSelectSpy).to.have.been.calledOnce;
    expect(onSelectSpy.firstCall.firstArg).to.eql(['Kariane', 'Louisa']);
    expect(onSelectSpy.firstCall.args[1].value).to.equal('Louisa');
  });

  it('Should call onBlur callback', async () => {
    const onBlurSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onBlur={onBlurSpy} />);

    fireEvent.blur(instance.target);

    await waitFor(() => {
      expect(onBlurSpy).to.have.been.calledOnce;
    });
  });

  it('Should call onFocus callback', async () => {
    const onFocusSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onFocus={onFocusSpy} />);

    fireEvent.focus(instance.target);

    await waitFor(() => {
      expect(onFocusSpy).to.have.been.calledOnce;
    });
  });

  it('Should have a custom className', () => {
    const instance = getInstance(
      <CheckPicker className="custom" defaultOpen data={[{ label: '', value: '1' }]} />
    );

    expect(instance.root.className).to.include('custom');
    expect(instance.overlay.className).to.not.include('custom');
  });

  it('Should have a custom style', () => {
    const instance = getDOMNode(<CheckPicker data={[]} style={{ fontSize: 12 }} />);

    expect(instance).to.have.style('font-size', '12px');
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
    expect(checkbox).to.text('');
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<CheckPicker data={[]} classPrefix="custom-prefix" />);

    expect(instance.className).to.contain('custom-prefix');
  });

  it('Should be sticky', () => {
    const instance = getInstance(
      <CheckPicker placeholder="test" sticky data={data} value={['Kariane']} defaultOpen />
    );

    const menu = instance.overlay.querySelector('.rs-checkbox');

    expect(menu).to.text('Kariane');
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

    expect(instance.overlay.querySelectorAll('.rs-checkbox-checked')).to.length(3);
  });

  it('Should render a button by toggleAs={Button}', () => {
    const instance = getInstance(<CheckPicker open data={data} toggleAs={Button} />);
    expect(instance.root.querySelector('.rs-btn')).to.exist;
  });

  it('Should render the specified menu content by `searchBy`', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} searchBy={(a, b, c) => c.value === 'Louisa'} />
    );
    const list = instance.overlay.querySelectorAll('.rs-check-item');

    expect(list).to.length(1);
    expect(list[0]).to.text('Louisa');
  });

  it('Should not be call renderValue()', () => {
    const instance = getDOMNode(<CheckPicker data={[]} renderValue={() => 'value'} />);

    expect(instance.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
  });

  it('Should call renderValue', () => {
    const instance1 = getDOMNode(<CheckPicker data={[]} value="Test" renderValue={() => '1'} />);
    const instance2 = getDOMNode(<CheckPicker data={[]} value="Test" renderValue={() => null} />);
    const instance3 = getDOMNode(
      <CheckPicker data={[]} value="Test" renderValue={() => undefined} />
    );

    expect(instance1.querySelector('.rs-picker-toggle-value')).to.text('1');
    expect(instance2.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');
    expect(instance3.querySelector('.rs-picker-toggle-placeholder')).to.text('Select');

    expect(instance1.className).to.include('rs-picker-has-value');
    expect(instance2.className).to.not.include('rs-picker-has-value');
    expect(instance3.className).to.not.include('rs-picker-has-value');
  });

  it('Should not call `onClean` callback on Input ', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClean={onCleanSpy} defaultOpen />);
    const input = instance.overlay.querySelector('.rs-picker-search-bar-input');

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(onCleanSpy).to.not.have.been.called;
  });

  it('Should call onClose callback by key="Escape"', done => {
    const instance = getInstance(<CheckPicker data={data} onClose={done} defaultOpen />);
    fireEvent.keyDown(instance.target, { key: 'Escape' });
  });

  it('Should call onClose callback by key="Tab"', done => {
    const instance = getInstance(<CheckPicker data={data} onClose={done} defaultOpen />);
    fireEvent.keyDown(instance.target, { key: 'Tab' });
  });

  describe('With a label', () => {
    it('Should render a label before placeholder', () => {
      render(<CheckPicker label="User" data={[]} data-testid="picker" />);

      expect(screen.getByTestId('picker')).to.have.text('UserSelect');
    });

    it('Should render a label before selected value', () => {
      render(
        <CheckPicker label="User" data={data} value={['Eugenia', 'Kariane']} data-testid="picker" />
      );

      expect(screen.getByTestId('picker')).to.have.text('UserEugenia,Kariane2');
    });
  });

  describe('Loading state', () => {
    it('Should display a spinner when loading=true', () => {
      render(<CheckPicker data={data} loading />);

      expect(screen.getByTestId('spinner')).to.exist;
    });

    it('Should display label and spinner when label is specified', () => {
      render(<CheckPicker label="User" data={data} loading />);

      expect(screen.getByRole('combobox')).to.have.text('User');
      expect(screen.getByTestId('spinner')).to.exist;
    });

    it('Should not open menu on click when loading=true', () => {
      render(<CheckPicker data={data} loading />);

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.queryByRole('listbox')).not.to.exist;
    });
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
    it('Should call onOpen', async () => {
      const onOpenSpy = sinon.spy();
      const instance = getInstance(<CheckPicker onOpen={onOpenSpy} data={data} />);

      act(() => {
        instance.open();
      });
      await waitFor(() => {
        expect(onOpenSpy).to.have.been.calledOnce;
      });
    });

    it('Should call onClose', async () => {
      const onCloseSpy = sinon.spy();

      const instance = getInstance(<CheckPicker onClose={onCloseSpy} data={data} />);

      act(() => {
        instance.open();
      });
      act(() => {
        instance.close();
      });

      await waitFor(() => {
        expect(onCloseSpy).to.have.been.calledOnce;
      });
    });

    it('Should get public objects and methods', () => {
      const instance = getInstance(<CheckPicker data={data} open virtualized />);

      expect(instance.root).to.exist;
      expect(instance.target).to.exist;
      expect(instance.updatePosition).to.instanceOf(Function);
      expect(instance.open).to.instanceOf(Function);
      expect(instance.close).to.instanceOf(Function);

      expect(instance.overlay).to.exist;
      expect(instance.list).to.exist;
    });
  });
});
