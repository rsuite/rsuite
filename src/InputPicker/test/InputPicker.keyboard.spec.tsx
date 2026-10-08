import React from 'react';
import { getTransitionEnd } from '../../Animation/utils';
import InputPicker from '../InputPicker';
import TagPicker from '../../TagPicker';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import '../styles/index.scss';
import '../../TagPicker/styles/index.scss';

describe.each([
  { name: 'InputPicker', Picker: InputPicker, multi: false },
  { name: 'TagPicker', Picker: TagPicker, multi: true }
])('$name native falsy selection', ({ Picker, multi }) => {
  it.each([false, true].flatMap(virtualized => [0, '', 11].map(value => ({ virtualized, value }))))(
    'Should select $value with Enter after ArrowDown (virtualized: $virtualized)',
    async ({ virtualized, value }) => {
      const item = { label: 'Target option', value };
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const onEntered = vi.fn();
      render(
        <Picker
          defaultOpen
          virtualized={virtualized}
          data={[item, { label: 'Other option', value: 99 }]}
          onChange={onChange}
          onSelect={onSelect}
          onEntered={onEntered}
        />
      );
      // Complete popup setup independently of animation timing before native input.
      fireEvent(screen.getByTestId('picker-popup'), new Event(getTransitionEnd()));
      expect(onEntered).toHaveBeenCalledTimes(1);
      await act(async () => {
        // Focus only once; navigation and Enter retain the editable input focus.
        screen.getByRole('combobox').focus();
        await userEvent.keyboard('{ArrowDown}');
      });
      const activeOption = screen.getByRole('option', { name: 'Target option' });
      expect(screen.getByRole('combobox')).to.have.focus;
      expect(screen.getByRole('combobox')).to.have.attribute(
        'aria-activedescendant',
        activeOption.id
      );
      expect(document.getElementById(activeOption.id)).toBe(activeOption);
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
        expect(screen.getByText('Target option', { selector: '.rs-tag-text' })).to.exist;
        const option = screen
          .getAllByRole('option', { name: 'Target option' })
          .find(node => node.hasAttribute('data-key'));
        expect(option).to.have.attr('aria-selected', 'true');
        await act(async () => {
          await userEvent.keyboard('{Enter}');
        });
        expect(onChange).toHaveBeenLastCalledWith([], expect.anything());
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[1][1].nativeEvent.isTrusted).to.be.true;
        expect(screen.queryByText('Target option', { selector: '.rs-tag-text' })).to.be.null;
        expect(option).to.have.attr('aria-selected', 'false');
      }
    }
  );
});
