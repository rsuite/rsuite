import React from 'react';
import InputPicker from '../InputPicker';
import TagPicker from '../../TagPicker';
import TagInput from '../../TagInput';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe.each([
  { name: 'InputPicker', Picker: InputPicker, multi: false },
  { name: 'TagPicker', Picker: TagPicker, multi: true }
])('$name falsy options', ({ Picker, multi }) => {
  it.each([false, true].flatMap(virtualized => [0, ''].map(value => ({ virtualized, value }))))(
    'Should select the existing $value option after creatable search (virtualized: $virtualized)',
    ({ virtualized, value }) => {
      const item = { label: 'Existing option', value };
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const onCreate = vi.fn();
      render(
        <Picker
          defaultOpen
          data={[item]}
          creatable
          virtualized={virtualized}
          shouldDisplayCreateOption={() => false}
          onChange={onChange}
          onSelect={onSelect}
          onCreate={onCreate}
        />
      );
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'Existing' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      const selectedValue = multi ? [value] : value;
      expect(onChange).toHaveBeenCalledExactlyOnceWith(selectedValue, expect.anything());
      expect(onSelect).toHaveBeenCalledExactlyOnceWith(selectedValue, item, expect.anything());
      expect(onCreate).not.toHaveBeenCalled();
      expect(screen.getByRole('combobox')).to.have.attr('data-has-value', 'true');
    }
  );

  it.each([false, true].flatMap(virtualized => [0, ''].map(value => ({ virtualized, value }))))(
    'Should not select a disabled $value option on Enter (virtualized: $virtualized)',
    ({ virtualized, value }) => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      render(
        <Picker
          defaultOpen
          data={[{ label: 'Disabled option', value }]}
          defaultValue={multi ? [value] : value}
          disabledItemValues={[value]}
          virtualized={virtualized}
          onChange={onChange}
          onSelect={onSelect}
        />
      );
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    }
  );

  it('Should not create an empty option after clearing a creatable search', () => {
    const onChange = vi.fn();
    const onCreate = vi.fn();
    render(
      <Picker
        defaultOpen
        data={[]}
        creatable
        shouldDisplayCreateOption={() => true}
        onChange={onChange}
        onCreate={onCreate}
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New option' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    expect(onCreate).not.toHaveBeenCalled();
  });
});

it('Should reject empty TagInput text while still creating the string zero', () => {
  const onChange = vi.fn();
  const onCreate = vi.fn();
  render(<TagInput defaultOpen defaultValue={['']} onChange={onChange} onCreate={onCreate} />);
  const input = screen.getByRole('textbox');
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onChange).not.toHaveBeenCalled();
  expect(onCreate).not.toHaveBeenCalled();

  fireEvent.change(input, { target: { value: '0' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(onChange).toHaveBeenCalledExactlyOnceWith(['', '0'], expect.anything());
  expect(onCreate).toHaveBeenCalledExactlyOnceWith(
    ['', '0'],
    expect.objectContaining({ value: '0', label: '0' }),
    expect.anything()
  );
});
