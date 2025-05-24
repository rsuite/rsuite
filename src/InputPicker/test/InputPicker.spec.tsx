import React from 'react';
import InputPicker from '../InputPicker';
import Button from '../../Button';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { mockGroupData } from '@test/mocks/data-mock';
import { PickerHandle } from '@/internals/Picker';
import {
  testStandardProps,
  testControlledUnControlled,
  testFormControl,
  testPickers
} from '@test/cases';

const data = mockGroupData(['Eugenia', 'Kariane', 'Louisa'], { role: 'Master' });

describe('InputPicker', () => {
  testStandardProps(<InputPicker data={data} />, {
    sizes: ['lg', 'md', 'sm', 'xs'],
    getUIElement: () => {
      return screen.getByRole('combobox');
    }
  });
  testPickers(InputPicker, { virtualized: true });
  testControlledUnControlled(InputPicker, {
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

  testFormControl(InputPicker, {
    value: 'Eugenia',
    componentProps: { data },
    getUIElement: () => screen.getByRole('combobox')
  });

  it('Should clean selected default value', () => {
    render(<InputPicker data={data} defaultValue={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render with "default" appearance by default', () => {
    render(<InputPicker data={[]} />);

    expect(screen.getByTestId('picker')).to.have.attr('data-variant', 'default');
    expect(screen.getByTestId('picker')).to.have.attr('data-picker', 'input');
  });

  it('Should not clean selected value', () => {
    render(<InputPicker data={data} value={'Eugenia'} />);

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('combobox')).to.have.text('Eugenia');
  });

  it('Should be plaintext', () => {
    const { rerender } = render(<InputPicker plaintext data={data} value={'Eugenia'} />);
    expect(screen.getByText('Eugenia')).to.exist;

    rerender(<InputPicker plaintext data={data} />);
    expect(screen.getByText('Not selected')).to.exist;

    rerender(<InputPicker plaintext data={data} placeholder="-" />);
    expect(screen.getByText('-')).to.exist;

    rerender(<InputPicker plaintext data={data} placeholder="-" value={'Eugenia'} />);
    expect(screen.getByText('Eugenia')).to.exist;
  });

  it('Should be readOnly', () => {
    const input1Ref = React.createRef<PickerHandle>();
    const input2Ref = React.createRef<PickerHandle>();

    render(
      <div>
        <InputPicker data={[]} ref={input1Ref} />
        <InputPicker data={[]} ref={input2Ref} readOnly />
      </div>
    );

    fireEvent.focus(screen.getAllByRole('textbox')[0]);
    fireEvent.focus(screen.getAllByRole('textbox')[1]);

    expect((input1Ref.current as PickerHandle).overlay).to.exist;
    expect(screen.getAllByRole('textbox')[1]).to.have.attr('readonly');
    expect(() => {
      (input2Ref.current as PickerHandle).overlay;
    }).to.throw('The overlay is not found. Please confirm whether the picker is open.');
  });

  it('Should output a button', () => {
    render(<InputPicker data={[]} toggleAs="button" />);

    expect(screen.getByRole('combobox')).to.have.tagName('BUTTON');
  });

  it('Should update display options when `data` is updated', () => {
    const { rerender } = render(<InputPicker open data={[{ label: 'Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal(['Item']);

    rerender(<InputPicker open data={[{ label: 'New Item', value: 1 }]} />);

    expect(screen.getAllByRole('option').map(option => option.textContent)).to.deep.equal([
      'New Item'
    ]);
  });

  it('Should active item by `value`', () => {
    const value = 'Louisa';
    render(<InputPicker defaultOpen data={data} value={value} />);

    expect(screen.getByRole('combobox')).to.have.text(value);
    expect(screen.getByRole('option', { name: value })).to.have.attr('aria-selected', 'true');
  });

  it('Should active item by `defaultValue`', () => {
    const value = 'Louisa';
    render(<InputPicker defaultOpen data={data} defaultValue={value} />);

    expect(screen.getByRole('combobox')).to.have.text(value);
    expect(screen.getByRole('option', { name: value })).to.have.attr('aria-selected', 'true');
  });

  it('Should render a group', () => {
    render(<InputPicker defaultOpen groupBy="role" data={data} />);

    expect(within(screen.getByRole('listbox')).getByRole('group')).to.exist;
  });

  it('Should toggle expansion of a group by clicking on the group title', () => {
    render(<InputPicker defaultOpen groupBy="role" data={data} />);

    expect(screen.getAllByRole('option')).to.have.lengthOf(3);

    // Fold group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.queryAllByRole('option')).to.have.lengthOf(0);

    // Expand group "Master"
    userEvent.click(screen.getByText('Master'));
    expect(screen.getAllByRole('option')).to.have.lengthOf(3);
  });

  it('Should have a placeholder', () => {
    render(<InputPicker data={[]} className="custom" placeholder="test" />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Allow `label` to be an empty string', () => {
    render(
      <InputPicker placeholder="test" data={[{ label: '', value: '1' }]} value={'1'} defaultOpen />
    );

    expect(screen.getByRole('option', { selected: true })).to.text('');
  });

  it('Should render value by `renderValue`', () => {
    render(
      <InputPicker
        className="custom"
        placeholder="test"
        data={[{ label: 'foo', value: 'bar' }]}
        value={'bar'}
        renderValue={(value, item) => `${(item as any).label as string}-${value}`}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text('foo-bar');
  });

  it('Should output a value by renderValue()', () => {
    const placeholder = 'value';

    // Valid value
    const { rerender } = render(
      <InputPicker
        renderValue={v => [v, placeholder]}
        data={[{ value: 1, label: '1' }]}
        value={1}
      />
    );

    expect(screen.getByRole('combobox')).to.have.text(`1${placeholder}`);

    // Invalid value
    rerender(<InputPicker renderValue={v => [v, placeholder]} data={[]} value={2} />);

    expect(screen.getByRole('combobox')).to.have.text(`2${placeholder}`);
  });

  it('Should not be call renderValue()', () => {
    render(<InputPicker data={[]} renderValue={() => 'value'} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
  });

  it('Should render a placeholder when value error', () => {
    render(<InputPicker data={[]} value={2} placeholder={'test'} />);

    expect(screen.getByRole('combobox')).to.have.text('test');
  });

  it('Should call `onChange` callback with correct value', () => {
    const onChange = vi.fn();
    render(<InputPicker defaultOpen data={data} onChange={onChange} />);

    fireEvent.click(screen.getByRole('option', { name: 'Eugenia' }));

    expect(onChange).toHaveBeenCalledWith(expect.any(String), expect.any(Object));
    expect(onChange.mock.calls[0][0]).toBe('Eugenia');
  });

  it('Should call `onSelect` with correct args by key=Enter ', () => {
    const onSelect = vi.fn();
    render(<InputPicker defaultOpen data={data} onSelect={onSelect} defaultValue={'Kariane'} />);

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    // onSelect is called with (value, item, event)
    expect(onSelect).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        label: expect.anything(),
        value: 'Louisa',
        role: 'Master'
      }),
      expect.any(Object)
    );
    expect(onSelect.mock.calls[0][0]).toBe('Louisa');
  });

  it('Should output a clean button', () => {
    render(<InputPicker data={data} defaultValue={'Louisa'} />);

    expect(screen.getByRole('button', { name: /clear/i })).to.exist;
  });

  it('Should call `onSearch` callback with correct search keyword', () => {
    const onSearch = vi.fn();
    render(<InputPicker data={[]} defaultOpen onSearch={onSearch} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'a' } });

    expect(onSearch).toHaveBeenCalledTimes(1);
    // onSearch is called with (searchKeyword, event)
    expect(onSearch.mock.calls[0][0]).toBe('a');
  });

  it('Should focus item by key=ArrowDown ', () => {
    render(<InputPicker defaultOpen data={data} defaultValue={'Eugenia'} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });

    expect(screen.getByRole('option', { name: 'Kariane' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should focus item by key=ArrowUp ', () => {
    render(<InputPicker defaultOpen data={data} defaultValue={'Kariane'} />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowUp' });

    expect(screen.getByRole('option', { name: 'Eugenia' }).firstChild).to.have.class(
      'rs-picker-select-menu-item-focus'
    );
  });

  it('Should call `onChange` by key=Enter ', () => {
    const onChange = vi.fn();
    render(<InputPicker defaultOpen data={data} onChange={onChange} defaultValue={'Kariane'} />);

    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('Should call onBlur callback', () => {
    const onBlur = vi.fn();
    render(<InputPicker data={[]} onBlur={onBlur} />);
    fireEvent.blur(screen.getByRole('textbox'));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('Should call onFocus callback', () => {
    const onFocus = vi.fn();
    render(<InputPicker data={[]} onFocus={onFocus} />);
    fireEvent.focus(screen.getByRole('textbox'));

    expect(onFocus).toHaveBeenCalled();
  });

  it('Should render a button by toggleAs={Button}', () => {
    render(<InputPicker open data={data} toggleAs={Button} />);

    expect(screen.getByRole('combobox')).to.have.class('rs-btn');
  });

  it('Should render the specified menu content by `searchBy`', () => {
    render(<InputPicker defaultOpen data={data} searchBy={(_a, _b, c) => c.value === 'Louisa'} />);
    const list = screen.getAllByRole('option');

    expect(list).to.be.lengthOf(1);
    expect(list[0]).to.text('Louisa');
  });

  describe('handleClean', () => {
    it('Should not render clean button when disabled', () => {
      render(<InputPicker data={data} value="Eugenia" disabled />);

      const cleanButton = screen.queryByLabelText('Clear');

      expect(cleanButton).to.not.exist;
    });

    it('Should not call `onClean` callback when disabled', () => {
      const onClean = vi.fn();
      render(<InputPicker defaultOpen data={data} value="Eugenia" disabled onClean={onClean} />);

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Backspace' });

      expect(onClean).not.toHaveBeenCalled();
    });

    it('Should call `onClean` callback', () => {
      const onClean = vi.fn();
      render(<InputPicker data={data} defaultValue={'Eugenia'} onClean={onClean} />);
      fireEvent.click(screen.getByRole('button', { name: /clear/i }));

      expect(onClean).toHaveBeenCalledTimes(1);
    });

    it('Should call `onClean` callback by keyDown', () => {
      const onClean = vi.fn();
      render(<InputPicker data={data} defaultOpen defaultValue={'Eugenia'} onClean={onClean} />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Backspace' });

      expect(onClean).toHaveBeenCalledTimes(1);
    });

    it('Should not trigger clean when clicking delete with search keyword', () => {
      const onChange = vi.fn();
      const onSearch = vi.fn();
      const onClean = vi.fn();
      render(
        <InputPicker
          data={data}
          defaultOpen
          defaultValue="Eugenia"
          onChange={onChange}
          onSearch={onSearch}
          onClean={onClean}
        />
      );

      const input = screen.getByRole('textbox');

      fireEvent.change(input, { target: { value: 'a' } });

      // onSearch is called with (searchKeyword, event)
      expect(onSearch.mock.calls[0][0]).toBe('a');

      fireEvent.keyDown(input, { key: 'Backspace' });

      expect(onChange).not.toHaveBeenCalled();
      expect(onClean).not.toHaveBeenCalled();
    });

    it('Should trigger clean when clicking clean button normally', () => {
      const onChange = vi.fn();
      render(<InputPicker data={data} value="Eugenia" onChange={onChange} />);

      // Find and click the clean button
      const cleanButton = screen.getByLabelText('Clear');
      fireEvent.click(cleanButton);

      // onChange is called with (value, event)
      expect(onChange.mock.calls[0][0]).toBe(null);
    });
  });

  it('Should call renderValue', () => {
    const { rerender } = render(<InputPicker data={[]} value={'Test'} renderValue={() => '1'} />);
    expect(screen.getByRole('combobox')).to.have.text('1');
    expect(screen.getByRole('combobox')).to.have.attr('data-has-value', 'true');

    rerender(<InputPicker data={[]} value={'Test'} renderValue={() => null} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(screen.getByRole('combobox')).to.not.have.attr('data-has-value', 'true');

    rerender(<InputPicker data={[]} value={'Test'} renderValue={() => undefined} />);
    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(screen.getByRole('combobox')).to.not.have.attr('data-has-value', 'true');
  });

  it('Children should not be selected', () => {
    const data = [{ value: 1, label: 'A', children: [{ value: 2, label: 'B' }] }];
    const { container } = render(<InputPicker data={data} value={2} />);

    expect(screen.getByRole('combobox')).to.have.text('Select');
    expect(container.firstChild).to.not.have.class('rs-picker-has-value');
  });

  it('Should call `onCreate` callback with correct value', () => {
    const inputRef = React.createRef<PickerHandle>();

    const onCreate = vi.fn();
    render(<InputPicker ref={inputRef} defaultOpen data={data} onCreate={onCreate} creatable />);

    fireEvent.focus((inputRef.current as PickerHandle).root as HTMLElement);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onCreate).toHaveBeenCalledTimes(1);
    // onCreate is called with (value, item, event)
    expect(onCreate.mock.calls[0][0]).toBe('abc');
  });

  it('Should hide "Create option" action if `shouldDisplayCreateOption` returns false', () => {
    const data = [
      { label: 'Alice', value: 1 },
      { label: 'Bob', value: 2 }
    ];

    // Display "Create option" action only when no item's `label` matches searchKeyword
    const shouldDisplayCreateOption = vi.fn((searchKeyword, filteredData) =>
      filteredData.every(item => item.label !== searchKeyword)
    );
    render(
      <InputPicker
        defaultOpen
        data={data}
        creatable
        shouldDisplayCreateOption={shouldDisplayCreateOption}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Alice' } });

    expect(shouldDisplayCreateOption).toHaveBeenCalledWith('Alice', [{ label: 'Alice', value: 1 }]);
    expect(screen.queryByText(/^Create option/)).to.not.exist;
  });

  describe('Accessibility', () => {
    it('Should have a role combobox', () => {
      render(<InputPicker data={data} />);

      expect(screen.getByRole('combobox')).to.exist;
    });

    it('Should have a role listbox', () => {
      render(<InputPicker data={data} defaultOpen />);

      expect(screen.getByRole('listbox')).to.exist;
    });

    it('Should have a role option', () => {
      render(<InputPicker data={data} defaultOpen />);

      expect(screen.getAllByRole('option')).to.have.lengthOf(3);
    });

    it('Should set a tabindex for input', () => {
      render(<InputPicker data={[]} tabIndex={10} />);

      expect(screen.getByRole('combobox')).to.have.attribute('tabindex', '10');
    });

    it('Should be the focus switch option via keyboard', () => {
      render(<InputPicker data={data} />);
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(document.activeElement).to.have.text('Eugenia');
    });
  });
});
