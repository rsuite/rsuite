import React from 'react';
import InputPicker from '../InputPicker';
import TagPicker from '../../TagPicker';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import '../styles/index.scss';
import '../../TagPicker/styles/index.scss';

// Native keyboard integrations run in the serial *.keyboard.test.tsx CI step.
describe.each([
  { name: 'InputPicker', Picker: InputPicker, multi: false },
  { name: 'TagPicker', Picker: TagPicker, multi: true }
])('$name native falsy selection', ({ Picker, multi }) => {
  it.each([false, true].flatMap(virtualized => [0, ''].map(value => ({ virtualized, value }))))(
    'Should select $value with Enter after ArrowDown (virtualized: $virtualized)',
    async ({ virtualized, value }) => {
      const item = { label: 'Falsy option', value };
      const onChange = vi.fn();
      const onSelect = vi.fn();
      render(
        <Picker
          defaultOpen
          virtualized={virtualized}
          data={[item, { label: 'Other option', value: 11 }]}
          onChange={onChange}
          onSelect={onSelect}
        />
      );
      await act(async () => {
        // Focus only once; Enter follows the option's actual native focus.
        screen.getByRole('combobox').focus();
        await userEvent.keyboard('{ArrowDown}');
      });
      expect(screen.getByRole('combobox')).to.have.focus;
      expect(screen.getByRole('combobox')).to.have.attr(
        'aria-activedescendant',
        screen.getByRole('option', { name: 'Falsy option' }).id
      );
      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      const selectedValue = multi ? [value] : value;
      expect(onChange).toHaveBeenCalledExactlyOnceWith(selectedValue, expect.anything());
      expect(onSelect).toHaveBeenCalledExactlyOnceWith(selectedValue, item, expect.anything());
      expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).to.be.true;
      expect(screen.getByTestId('picker').querySelector('.rs-picker-toggle')).to.have.attr(
        'data-has-value',
        'true'
      );

      if (multi) {
        expect(screen.getByText('Falsy option', { selector: '.rs-tag-text' })).to.exist;
        const option = screen
          .getAllByRole('option', { name: 'Falsy option' })
          .find(node => node.hasAttribute('data-key'));
        expect(option).to.have.attr('aria-selected', 'true');
        await act(async () => {
          await userEvent.keyboard('{Enter}');
        });
        expect(onChange).toHaveBeenLastCalledWith([], expect.anything());
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[1][1].nativeEvent.isTrusted).to.be.true;
        expect(screen.queryByText('Falsy option', { selector: '.rs-tag-text' })).to.be.null;
        expect(option).to.have.attr('aria-selected', 'false');
      }
    }
  );
});
