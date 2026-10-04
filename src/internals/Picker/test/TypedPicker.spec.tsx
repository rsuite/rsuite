import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  expectTypedValue,
  mountTypedPicker,
  typedMenu,
  typedPickerCases
} from './TypedPickerTestSupport';

describe.each(typedPickerCases)('$name typed option identity', testCase => {
  it.each([false, true])(
    'navigates distinct numeric/string values with custom keys=%s',
    async customKeys => {
      const { onChange } = mountTypedPicker(testCase, { customKeys });
      const combobox = screen.getByRole('combobox');
      const number = typedMenu().getByRole('option', { name: 'Number zero' });
      const string = typedMenu().getByRole('option', { name: 'String zero' });
      expect(number).to.have.attr('data-key', '0');
      expect(string).to.have.attr('data-key', '0');
      expect(number.id).not.to.equal(string.id);
      act(() => combobox.focus());
      fireEvent.keyDown(combobox, { key: 'ArrowDown' });
      fireEvent.keyDown(combobox, { key: 'ArrowDown' });
      expect(combobox).to.have.attr('aria-activedescendant', string.id);
      expect(document.getElementById(string.id)).to.equal(string);
      fireEvent.keyDown(combobox, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(
        expectTypedValue(testCase, '0'),
        expect.anything()
      );
    }
  );

  it('keeps each row attached to its raw value when data order changes', () => {
    const Component = testCase.Component as React.ElementType;
    const data = [
      { label: 'Number zero', value: 0 },
      { label: 'String zero', value: '0' }
    ];
    const view = render(<Component defaultOpen data={data} />);
    const number = typedMenu().getByRole('option', { name: 'Number zero' });
    const string = typedMenu().getByRole('option', { name: 'String zero' });
    view.rerender(<Component defaultOpen data={[data[1], data[0]]} />);
    expect(typedMenu().getByRole('option', { name: 'Number zero' })).to.equal(number);
    expect(typedMenu().getByRole('option', { name: 'String zero' })).to.equal(string);
  });

  it('skips disabled numeric zero without replacing the enabled string zero', async () => {
    const { onChange } = mountTypedPicker(testCase, { disabledNumber: true });
    const combobox = screen.getByRole('combobox');
    act(() => combobox.focus());
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    const string = typedMenu().getByRole('option', { name: 'String zero' });
    expect(testCase.editable ? combobox : string).to.have.focus;
    fireEvent.keyDown(combobox, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      expectTypedValue(testCase, '0'),
      expect.anything()
    );
  });

  it('focuses the correct mounted virtual row before selecting its raw value', async () => {
    const { onChange } = mountTypedPicker(testCase, { virtualized: true });
    const combobox = screen.getByRole('combobox');
    act(() => combobox.focus());
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    await waitFor(() => {
      const string = typedMenu().getByRole('option', { name: 'String zero' });
      expect(testCase.editable ? combobox : string).to.have.focus;
      expect(combobox).to.have.attr('aria-activedescendant', string.id);
      expect(document.getElementById(string.id)).to.equal(string);
    });
    fireEvent.keyDown(combobox, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      expectTypedValue(testCase, '0'),
      expect.anything()
    );
  });
});
