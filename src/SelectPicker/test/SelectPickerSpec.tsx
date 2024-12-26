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
import SelectPicker from '../SelectPicker';
import Input from '../../Input';
import Button from '../../Button';
import { PickerHandle } from '@/internals/Picker';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('SelectPicker', () => {
  testStandardProps(<SelectPicker data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });

  testPickers(SelectPicker, { virtualized: true });
  testControlledUnControlled(SelectPicker, {
    componentProps: { data, defaultOpen: true },
    value: 'Eugenia',
    defaultValue: 'Kariane',
    changedValue: 'Louisa',
    simulateEvent: {
      changeValue: () => {
        const input = screen.getAllByRole('option')[2];
        userEvent.click(input);

        return { changedValue: 'Louisa' };
      }
    },
    expectedValue: (value: string) => {
      expect(screen.getByTestId('picker-toggle-input')).to.have.attribute(
        'value',
        value.toString()
      );
    }
  });

  testFormControl(SelectPicker, {
    value: 'Eugenia',
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should clean selected default value', () => {
    render(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should have "default" appearance by default', () => {
    const { container } = render(<SelectPicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-default');
  });

  it('Should not clean selected value', () => {
    render(<SelectPicker defaultOpen data={data} value={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Eugenia');
  });

  it('Should output a dropdown', () => {
    const { container } = render(<SelectPicker data={[]} />);

    expect(container.firstChild).to.have.class('rs-picker-select');
  });

  it('Should render a hidden <input> with given "name" attribute', () => {
    const { container } = render(<SelectPicker data={[]} name="field" />);

    expect(container.querySelector('input')).to.have.attr('name', 'field');
  });

  it('Should output a button', () => {
    render(<SelectPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should update display options when `data` is updated', () => {
    const { rerender } = render(<SelectPicker open data={[{ label: 'Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal(['Item']);

    rerender(<SelectPicker open data={[{ label: 'New Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal([
      'New Item'
    ]);
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    render(<SelectPicker defaultOpen data={data} value={value} />);

    expect(screen.getByRole('combobox')).to.have.text('Louisa');
    expect(screen.getByRole('option', { selected: true })).to.have.text('Louisa');
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    render(<SelectPicker defaultOpen data={data} defaultValue={value} />);

    expect(screen.getByRole('combobox')).to.have.text('Louisa');
    expect(screen.getByRole('option', { selected: true })).to.have.text('Louisa');
  });

  it('Should render a group', () => {
    render(<SelectPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getByRole('group')).to.exist;
  });

  it('Should toggle expansion of a group by clicking on the group title', () => {
    render(<SelectPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    // Fold group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.queryAllByRole('option')).to.have.lengthOf(0);

    // Expand group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should have a placeholder', () => {
    render(<SelectPicker data={[]} className="custom" placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    render(
      <SelectPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );

    expect(screen.getByRole('option', { selected: true })).to.text('');
  });

  it('Should render value by `renderValue`', () => {
    render(
      <SelectPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(_value, item, label) =>
          `${label}-${(item as { label: string; value: string }).value}`
        }
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    render(
      <SelectPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    // Invalid value
    render(<SelectPicker renderValue={v => [v, placeholder]} data={[]} value={2} />);

    // Invalid value
    render(<SelectPicker data={[]} renderValue={v => [v, placeholder]} value={''} />);

    expect(screen.getAllByRole('combobox')[0]).to.have.text(`1${placeholder}`);
    expect(screen.getAllByRole('combobox')[1]).to.have.text(`2${placeholder}`);
    expect(screen.getAllByRole('combobox')[2]).to.have.text(placeholder);
  });

  it('Should not be call renderValue()', () => {
    render(<SelectPicker data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(<SelectPicker data={[]} value={2} placeholder={'test'} />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChange = sinon.spy();
    render(<SelectPicker defaultOpen onChange={onChange} data={data} />);

    fireEvent.click(screen.getByRole('option', { name: 'Eugenia' }));

    expect(onChange).to.have.been.calledWith('Eugenia');
  });

  it('Should call `onClean` callback', () => {
    const onCleanSpy = sinon.spy();
    render(<SelectPicker data={data} defaultValue={'Eugenia'} onClean={onCleanSpy} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(onCleanSpy).to.calledOnce;
  });

  it('Should not output a search bar', () => {
    render(<SelectPicker searchable={false} defaultOpen data={data} />);

    expect(screen.queryByRole('searchbox')).not.to.exist;
  });

  it('Should output a clean button', () => {
    render(<SelectPicker data={data} defaultValue={'Louisa'} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearchSpy = sinon.spy();
    render(<SelectPicker defaultOpen onSearch={onSearchSpy} data={data} />);

    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearchSpy).to.have.been.calledWith('a');
  });

  it('Should call `onSelect` with correct args by key=Enter ', () => {
    const onSelect = sinon.spy();
    render(<SelectPicker defaultOpen data={data} onSelect={onSelect} defaultValue={'Kariane'} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onSelect).to.have.been.calledWith('Louisa');
  });

  it('Should focus item by key=ArrowDown ', () => {
    render(<SelectPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should focus item by key=ArrowUp ', () => {
    render(<SelectPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChange = sinon.spy();
    render(<SelectPicker defaultOpen data={data} onChange={onChange} defaultValue={'Kariane'} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

    expect(onChange).to.calledOnce;
  });

  it('Should call onBlur callback', async () => {
    const onBlur = sinon.spy();

    render(<SelectPicker defaultOpen data={data} onBlur={onBlur} />);

    fireEvent.blur(screen.getByRole('combobox'));

    await waitFor(() => {
      expect(onBlur).to.calledOnce;
    });
  });

  it('Should call onFocus callback', () => {
    const onFocus = sinon.spy();

    render(<SelectPicker defaultOpen data={data} onFocus={onFocus} />);

    fireEvent.focus(screen.getByRole('combobox'));

    expect(onFocus).to.calledOnce;
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<SelectPicker open data={data} toggleAs={Button} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(<SelectPicker defaultOpen data={data} searchBy={(_a, _b, c) => c.value === 'Louisa'} />);

    const options = screen.getAllByRole('option');

    expect(options).to.have.lengthOf(1);
    expect(options[0]).to.have.text('Louisa');
  });

  it('Should call renderValue', () => {
    const { container: container1 } = render(
      <SelectPicker data={[]} value="Test" renderValue={() => '1'} />
    );
    const { container: container2 } = render(
      <SelectPicker data={[]} value="Test" renderValue={() => null} />
    );
    const { container: container3 } = render(
      <SelectPicker data={[]} value="Test" renderValue={() => undefined} />
    );

    expect(screen.getAllByRole('combobox')[0]).to.text('1');
    expect(screen.getAllByRole('combobox')[1]).to.text('Select');
    expect(screen.getAllByRole('combobox')[2]).to.text('Select');

    expect(container1.firstChild).to.have.class('rs-picker-has-value');
    expect(container2.firstChild).to.not.have.class('rs-picker-has-value');
    expect(container3.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const { container } = render(<SelectPicker data={data} value={2} />);

    expect(screen.getByRole('combobox')).to.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should focus the search box', () => {
    const pickerRef = React.createRef<PickerHandle>();
    const inputRef = React.createRef<HTMLInputElement>();

    render(
      <SelectPicker
        ref={pickerRef}
        data={data}
        renderExtraFooter={() => <Input ref={inputRef} />}
      />
    );

    const target = (pickerRef.current as PickerHandle).target;

    fireEvent.click(target as HTMLElement);

    // https://codesandbox.io/s/silent-voice-6kzx7
    (inputRef.current as HTMLInputElement).focus();
    fireEvent.keyDown(inputRef.current as HTMLInputElement, { key: 'a' });

    expect(inputRef.current).to.have.focus;

    fireEvent.keyDown(target as HTMLElement, { key: 'a' });

    expect(screen.getByRole('searchbox')).to.have.focus;
  });

  describe('With a label', () => {
    it('Should render a label before placeholder', () => {
      render(<SelectPicker label="User" data={[]} data-testid="picker" />);

      expect(screen.getByTestId('picker')).to.have.text('UserSelect');
    });

    it('Should render a label before selected value', () => {
      render(<SelectPicker label="User" data={data} value="Eugenia" data-testid="picker" />);

      expect(screen.getByTestId('picker')).to.have.text('UserEugenia');
    });
  });

  it('Should call onSearch when closed', async () => {
    const onSearchSpy = sinon.spy();
    const handleClose = sinon.spy();
    render(
      <>
        <button data-testid="exit">exit</button>
        <SelectPicker onClose={handleClose} defaultOpen onSearch={onSearchSpy} data={data} />
      </>
    );
    const exit = screen.getByTestId('exit') as HTMLElement;

    // close select
    fireEvent.mouseDown(exit, { bubbles: true });

    await waitFor(() => {
      expect(onSearchSpy).to.calledOnce;
      expect(onSearchSpy.firstCall.firstArg).to.equal('');
    });
  });

  describe('Troubleshooting', () => {
    it('Should not throw when `listProps.itemSize` is a number', () => {
      expect(() => {
        render(
          <SelectPicker
            data={[{ label: 'Master', value: 'Master' }]}
            virtualized
            listProps={{ itemSize: 66 }}
            open
          />
        );
      }).to.not.throw();
    });
  });

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<SelectPicker data={data} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role listbox', () => {
      render(<SelectPicker data={data} defaultOpen />);

      expect(screen.getByRole('listbox')).to.exist;
    });

    it('Should have a role option', () => {
      render(<SelectPicker data={data} defaultOpen />);

      expect(screen.getAllByRole('option')).to.have.lengthOf(3);
    });

    it('Should have a role searchbox', () => {
      render(<SelectPicker data={data} defaultOpen />);

      expect(screen.getByRole('searchbox')).to.exist;
    });

    it('Should be the focus switch option via keyboard', () => {
      render(<SelectPicker data={data} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(document.activeElement).to.have.text('Eugenia');
    });
  });

  it('Should focus on search input by key=character', () => {
    render(<SelectPicker defaultOpen data={data} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 't' });

    expect(screen.getByRole('searchbox')).to.have.focus;
  });
});
