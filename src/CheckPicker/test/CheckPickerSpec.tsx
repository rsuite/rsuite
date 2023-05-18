import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import sinon from 'sinon';
import { getInstance } from '@test/testUtils';

import CheckPicker from '../CheckPicker';
import Button from '../../Button';
import '../styles/index.less';
import userEvent from '@testing-library/user-event';
import { testStandardProps } from '@test/commonCases';

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
  testStandardProps(<CheckPicker data={[]} />);

  it('Should clean selected default value', () => {
    render(<CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<CheckPicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    render(<CheckPicker defaultOpen data={data} value={['Eugenia']} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByRole('combobox')).to.have.text('Eugenia1');
  });

  it('Should output a dropdown', () => {
    const Title = 'Title';
    const { container } = render(<CheckPicker data={[]}>{Title}</CheckPicker>);

    expect(container.firstChild).to.have.class('rs-picker-check');
  });

  it('Should output a button', () => {
    render(<CheckPicker data={[]} toggleAs="button" />);
    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should be disabled', () => {
    const { container } = render(<CheckPicker data={[]} disabled />);

    expect(container.firstChild).to.have.class('rs-picker-disabled');
  });

  it('Should be block', () => {
    const { container } = render(<CheckPicker data={[]} block />);

    expect(container.firstChild).to.have.class('rs-picker-block');
  });

  it('Should be readOnly', () => {
    const { container } = render(<CheckPicker data={[]} readOnly />);

    expect(container.firstChild).to.have.class('rs-picker-read-only');
  });

  it('Should be plaintext', () => {
    const { container } = render(<CheckPicker data={[]} plaintext />);
    expect(container.firstChild).to.have.class('rs-picker-plaintext');
  });

  it('Should active item by `value`', () => {
    const value = ['Louisa'];
    render(<CheckPicker defaultOpen data={data} value={value} />);

    expect(screen.getByRole('combobox')).to.have.text('Louisa1');
    expect(screen.getByRole('option', { name: 'Louisa' })).to.have.attr('aria-selected', 'true');
  });

  it('Should active item by `defaultValue`', () => {
    const value = ['Louisa'];
    render(<CheckPicker defaultOpen data={data} defaultValue={value} />);

    expect(screen.getByRole('combobox')).to.have.text('Louisa1');
    expect(screen.getByRole('option', { name: 'Louisa' })).to.have.attr('aria-selected', 'true');
  });

  it('Should render a group', () => {
    render(<CheckPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getByRole('group')).to.exist;
  });

  it('Should toggle expansion of a group by clicking on the group title', () => {
    render(<CheckPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    userEvent.click(screen.getByText('Master'));

    expect(screen.queryAllByRole('option')).to.have.lengthOf(0);
  });

  it('Should have a placeholder', () => {
    render(<CheckPicker data={[]} className="custom" placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should render value by `renderValue`', () => {
    render(
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

    expect(screen.getByRole('combobox')).to.have.text('1,2');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const { rerender } = render(
      <CheckPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={[1]}
      />
    );
    expect(screen.getByRole('combobox')).to.have.text(`1${placeholder}`);

    // Invalid value
    rerender(<CheckPicker renderValue={v => [v, placeholder]} data={[]} value={[2]} />);

    expect(screen.getByRole('combobox')).to.have.text(`2${placeholder}`);
  });

  it('Should render a placeholder when value error', () => {
    render(
      <CheckPicker
        placeholder="test"
        data={[
          { label: '1', value: '1' },
          { label: '2', value: '2' }
        ]}
        value={['4']}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChange = sinon.spy();
    render(
      <CheckPicker defaultOpen onChange={onChange} data={[{ label: 'Option 1', value: '1' }]} />
    );

    fireEvent.click(screen.getByText('Option 1'));

    expect(onChange).to.have.been.calledOnce;
    expect(onChange.getCall(0).args[0]).to.eql(['1']);
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<CheckPicker data={data} defaultValue={['Eugenia']} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

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
    render(<CheckPicker data={data} defaultValue={['Louisa']} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should focus item by key=ArrowDown ', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' }).firstChild).to.have.class(
      'rs-check-item-focus'
    );
  });

  it('Should update scroll position when the focus is not within the viewport and key=ArrowDown', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} menuMaxHeight={72} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(screen.getByRole('listbox').scrollTop).to.equal(36);

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });

    expect(screen.getByRole('listbox').scrollTop).to.equal(0);
  });

  it('Should update scroll position when the focus is not within the viewport and key=ArrowUp', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} menuMaxHeight={72} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });
    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(screen.getByRole('listbox').scrollTop).to.equal(36);

    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(screen.getByRole('listbox').scrollTop).to.equal(0);
  });

  it('Should focus item by key=ArrowUp ', () => {
    const instance = getInstance(
      <CheckPicker defaultOpen data={data} defaultValue={['Kariane']} />
    );

    fireEvent.keyDown(instance.target, { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' }).firstChild).to.have.class(
      'rs-check-item-focus'
    );
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
    // FIXME Figure out whether CheckPicker actually has onBlur prop
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const instance = getInstance(<CheckPicker data={data} onBlur={onBlurSpy} />);

    fireEvent.blur(instance.target);

    await waitFor(() => {
      expect(onBlurSpy).to.have.been.calledOnce;
    });
  });

  it('Should call onFocus callback', async () => {
    const onFocusSpy = sinon.spy();
    // FIXME Figure out whether CheckPicker actually has onFocus prop
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  it('Allow `label` to be an empty string', () => {
    render(
      <CheckPicker
        placeholder="test"
        data={[{ label: '', value: '1' }]}
        value={['1']}
        defaultOpen
      />
    );
    expect(screen.getByRole('option')).to.text('');
  });

  it('Should be sticky', () => {
    render(<CheckPicker placeholder="test" sticky data={data} value={['Kariane']} defaultOpen />);

    expect(screen.getAllByRole('option')[0]).to.text('Kariane');
  });

  it('Should be render selected options be sticky', () => {
    render(
      <CheckPicker
        placeholder="test"
        sticky
        data={data}
        value={['Kariane', 'Louisa', 'Eugenia']}
        defaultOpen
      />
    );

    expect(screen.getAllByRole('checkbox', { checked: true })).to.have.lengthOf(3);

    expect(screen.getAllByRole('checkbox')[0]).to.be.checked;
    expect(screen.getAllByRole('checkbox')[1]).to.be.checked;
    expect(screen.getAllByRole('checkbox')[2]).to.be.checked;
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<CheckPicker open data={data} toggleAs={Button} />);
    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(<CheckPicker defaultOpen data={data} searchBy={(_a, _b, c) => c.value === 'Louisa'} />);
    const list = screen.getAllByRole('option');

    expect(list).to.have.lengthOf(1);
    expect(list[0]).to.have.text('Louisa');
  });

  it('Should not be call renderValue()', () => {
    render(<CheckPicker data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.text('Select');
  });

  it('Should call renderValue', () => {
    const { rerender, container } = render(
      <CheckPicker data={[]} value={['Test']} renderValue={() => '1'} />
    );
    expect(screen.getByRole('combobox')).to.have.text('1');
    expect(container.firstChild).to.have.class('rs-picker-has-value');

    rerender(<CheckPicker data={[]} value={['Test']} renderValue={() => null} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');

    rerender(<CheckPicker data={[]} value={['Test']} renderValue={() => undefined} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should not call `onClean` callback on Input ', () => {
    const onCleanSpy = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClean={onCleanSpy} defaultOpen />);
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(instance.target, { key: 'ArrowDown' });
    fireEvent.keyDown(instance.target, { key: 'Enter' });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(onCleanSpy).to.not.have.been.called;
  });

  it('Should call onClose callback by key="Escape"', async () => {
    const onClose = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClose={onClose} defaultOpen />);
    fireEvent.keyDown(instance.target, { key: 'Escape' });

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should call onClose callback by key="Tab"', async () => {
    const onClose = sinon.spy();
    const instance = getInstance(<CheckPicker data={data} onClose={onClose} defaultOpen />);
    fireEvent.keyDown(instance.target, { key: 'Tab' });

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
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

  it('Should open the options list after pressing the enter key', () => {
    render(<CheckPicker data={data} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(screen.queryByRole('listbox')).to.exist;
  });

  it('Should not respond to keyboard events after setting readOnly', () => {
    render(<CheckPicker data={data} readOnly />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(screen.queryByRole('listbox')).not.to.exist;
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
      render(
        <div data-testid="content">
          <CheckPicker data={data} value={['Eugenia', 'Kariane']} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Eugenia,Kariane2');
    });
    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          <CheckPicker data={data} value={[]} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
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
