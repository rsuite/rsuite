import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/utils';
import { mockGroupData } from '@test/mocks/data-mock';
import CheckPicker from '../CheckPicker';
import Button from '../../Button';
import '../styles/index.less';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('CheckPicker', () => {
  testStandardProps(<CheckPicker data={[]} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(CheckPicker, { virtualized: true });
  testControlledUnControlled(CheckPicker, {
    componentProps: { data, defaultOpen: true },
    value: ['Eugenia'],
    defaultValue: ['Kariane'],
    changedValue: ['Louisa'],
    simulateEvent: {
      changeValue: (prevValue: any) => {
        const input = screen.getAllByRole('checkbox')[2];
        userEvent.click(input);

        return { changedValue: [...prevValue, 'Louisa'] };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute(
        'value',
        value.toString()
      );
    }
  });

  testFormControl(CheckPicker, {
    value: ['Eugenia'],
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

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
    const { container } = render(<CheckPicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-check');
  });

  it('Should output a button', () => {
    render(<CheckPicker data={[]} toggleAs="button" />);
    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should update display options when `data` is updated', () => {
    const { rerender } = render(<CheckPicker open data={[{ label: 'Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal(['Item']);

    rerender(<CheckPicker open data={[{ label: 'New Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal([
      'New Item'
    ]);
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
    const onClean = sinon.spy();
    render(<CheckPicker data={data} defaultValue={['Eugenia']} onClean={onClean} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onClean).to.have.been.calledOnce;
  });

  it('Should call `onClean` callback by key="Backspace" ', () => {
    const onClean = sinon.spy();

    render(<CheckPicker data={data} onClean={onClean} defaultOpen />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' });

    expect(onClean).to.have.been.called;
  });

  it('Should call `onClean` callback by key="Backspace" on overlay ', () => {
    const onClean = sinon.spy();
    render(<CheckPicker data={data} onClean={onClean} defaultOpen />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Backspace' });

    expect(onClean).to.have.been.called;
  });

  it('Should call `onOpen` callback', async () => {
    const onOpen = sinon.spy();
    const ref = React.createRef<any>();
    render(<CheckPicker ref={ref} onOpen={onOpen} data={data} />);

    ref.current.open();

    await waitFor(() => {
      expect(onOpen).to.have.been.called;
    });
  });

  it('Should call `onClose` callback', async () => {
    const onClose = sinon.spy();
    const ref = React.createRef<any>();
    render(<CheckPicker ref={ref} defaultOpen onClose={onClose} data={data} />);

    ref.current.close();

    await waitFor(() => {
      expect(onClose).to.have.been.called;
    });
  });

  it('Should output a clean button', () => {
    render(<CheckPicker data={data} defaultValue={['Louisa']} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should focus item by key=ArrowDown ', () => {
    render(<CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' }).firstChild).to.have.class(
      'rs-check-item-focus'
    );
  });

  it('Should update scroll position when the focus is not within the viewport and key=ArrowDown', () => {
    render(<CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} menuMaxHeight={72} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    expect(screen.getByRole('listbox').scrollTop).to.not.equal(0);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    expect(screen.getByRole('listbox').scrollTop).to.equal(0);
  });

  it('Should update scroll position when the focus is not within the viewport and key=ArrowUp', () => {
    render(<CheckPicker defaultOpen data={data} defaultValue={['Eugenia']} menuMaxHeight={72} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });

    expect(screen.getByRole('listbox').scrollTop).to.not.equal(0);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });

    expect(screen.getByRole('listbox').scrollTop).to.equal(0);
  });

  it('Should focus item by key=ArrowUp ', () => {
    render(<CheckPicker defaultOpen data={data} defaultValue={['Kariane']} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' }).firstChild).to.have.class(
      'rs-check-item-focus'
    );
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChange = sinon.spy();
    render(<CheckPicker defaultOpen data={data} onChange={onChange} defaultValue={['Kariane']} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should call `onSelect` by key=Enter ', async () => {
    const onSelect = sinon.spy();
    render(<CheckPicker defaultOpen data={data} onSelect={onSelect} defaultValue={['Kariane']} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onSelect).to.have.been.calledOnce;
    expect(onSelect.firstCall.firstArg).to.eql(['Kariane', 'Louisa']);
    expect(onSelect.firstCall.args[1].value).to.equal('Louisa');
  });

  it('Should call onBlur callback', async () => {
    const onBlur = sinon.spy();
    render(<CheckPicker data={data} onBlur={onBlur} />);

    fireEvent.blur(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onBlur).to.have.been.calledOnce;
    });
  });

  it('Should call onFocus callback', async () => {
    const onFocus = sinon.spy();

    render(<CheckPicker data={data} onFocus={onFocus} />);

    fireEvent.focus(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onFocus).to.have.been.calledOnce;
    });
  });

  it('Should have a custom className', () => {
    const { container } = render(
      <CheckPicker className="custom" defaultOpen data={[{ label: '', value: '1' }]} />
    );

    expect(container.firstChild).to.have.class('custom');
    expect(screen.getByTestId('picker-popup')).to.not.have.class('custom');
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

  it('Should trigger onOpen & onClose with open props set', () => {
    const onOpenSpy = sinon.spy();
    const onCloseSpy = sinon.spy();
    const { rerender } = render(
      <CheckPicker data={data} onOpen={onOpenSpy} onClose={onCloseSpy} open />
    );

    fireEvent.click(screen.getByRole('combobox'));

    expect(onCloseSpy).to.have.been.calledOnce;

    rerender(<CheckPicker data={data} onOpen={onOpenSpy} onClose={onCloseSpy} open={false} />);

    fireEvent.click(screen.getByRole('combobox'));

    expect(onOpenSpy).to.have.been.calledOnce;
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
    const onClean = sinon.spy();
    render(<CheckPicker data={data} onClean={onClean} defaultOpen />);
    const searchbox = screen.getByRole('searchbox');

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
    fireEvent.keyDown(searchbox, { key: 'Backspace' });

    expect(onClean).to.not.have.been.called;
  });

  it('Should call onClose callback by key="Escape"', async () => {
    const onClose = sinon.spy();
    render(<CheckPicker data={data} onClose={onClose} defaultOpen />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

    await waitFor(() => {
      expect(onClose).to.have.been.calledOnce;
    });
  });

  it('Should call onClose callback by key="Tab"', async () => {
    const onClose = sinon.spy();
    render(<CheckPicker data={data} onClose={onClose} defaultOpen />);
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Tab' });

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

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<CheckPicker data={data} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role listbox', () => {
      render(<CheckPicker data={data} defaultOpen />);

      expect(screen.getByRole('listbox')).to.exist;
    });

    it('Should have a role option', () => {
      render(<CheckPicker data={data} defaultOpen />);

      expect(screen.getAllByRole('option')).to.have.lengthOf(3);
    });

    it('Should have a role searchbox', () => {
      render(<CheckPicker data={data} defaultOpen />);

      expect(screen.getByRole('searchbox')).to.exist;
    });

    it('Should be the focus switch option via keyboard', () => {
      render(<CheckPicker data={data} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(document.activeElement).to.have.text('Eugenia');
    });

    it('Should focus on search input by key=character', () => {
      render(<CheckPicker defaultOpen data={data} />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 't' });

      expect(screen.getByRole('searchbox')).to.have.focus;
    });
  });
});
