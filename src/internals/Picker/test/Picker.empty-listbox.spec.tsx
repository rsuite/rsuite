import React from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Bravo', value: 'bravo' }
];
const message = 'No matching items';
interface FixtureProps {
  data: typeof data;
  'aria-label': string;
  responsive: false;
  virtualized: boolean;
  defaultOpen?: boolean;
  locale: { noResultsText: string };
  onSelect: (...args: unknown[]) => void;
  onChange: (...args: unknown[]) => void;
}
const pickers = [
  {
    name: 'SelectPicker',
    renderPicker: (props: FixtureProps) => <SelectPicker {...props} />,
    multiple: false,
    editable: false
  },
  {
    name: 'CheckPicker',
    renderPicker: (props: FixtureProps) => <CheckPicker {...props} />,
    multiple: true,
    editable: false
  },
  {
    name: 'InputPicker',
    renderPicker: (props: FixtureProps) => <InputPicker {...props} />,
    multiple: false,
    editable: true
  },
  {
    name: 'TagPicker',
    renderPicker: (props: FixtureProps) => <TagPicker {...props} />,
    multiple: true,
    editable: true
  }
];

function emptyOption(combobox: HTMLElement) {
  const id = combobox.getAttribute('aria-controls');
  expect(id).toBeTruthy();
  const listbox = document.getElementById(id!);
  expect(listbox).toBeInTheDocument();
  expect(listbox).toHaveAttribute('role', 'listbox');
  const option = within(listbox!).getByRole('option', { name: message });
  expect(option).toHaveAttribute('aria-disabled', 'true');
  expect(option).toHaveAttribute('aria-selected', 'false');
  expect(option).not.toHaveAttribute('tabindex');
  expect(option).not.toHaveAttribute('data-key');
  expect(option).not.toHaveAttribute('id');
  expect(within(listbox!).queryAllByRole('option', { selected: true })).toHaveLength(0);
  expect(combobox).not.toHaveAttribute('aria-activedescendant');
  return listbox!;
}

describe.each(pickers)('$name empty listbox semantics', ({ renderPicker, multiple, editable }) => {
  it.each([false, true])(
    'retains a controlled listbox for initially empty data and recovers native selection (virtualized=%s)',
    async virtualized => {
      const onSelect = vi.fn();
      const onChange = vi.fn();
      const props = {
        'aria-label': 'Items',
        responsive: false as const,
        virtualized,
        defaultOpen: true,
        locale: { noResultsText: message },
        onSelect,
        onChange
      };
      const { rerender } = render(renderPicker({ ...props, data: [] }));
      const combobox = screen.getByRole('combobox', { name: 'Items' });
      await waitFor(() => expect(combobox).toHaveAttribute('aria-expanded', 'true'));
      emptyOption(combobox);
      act(() => combobox.focus());
      await act(async () => userEvent.keyboard('{ArrowDown}{Enter}'));
      expect(onSelect).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(combobox).not.toHaveAttribute('aria-activedescendant');

      rerender(renderPicker({ ...props, data }));
      if (combobox.getAttribute('aria-expanded') !== 'true')
        await act(async () => userEvent.click(combobox));
      await screen.findByRole('option', { name: 'Alpha' });
      expect(screen.queryByRole('option', { name: message })).toBeNull();
      if (editable)
        await waitFor(() => {
          const id = combobox.getAttribute('aria-activedescendant');
          expect(id).toBeTruthy();
          expect(document.getElementById(id!)).toHaveTextContent('Alpha');
        });
      act(() => combobox.focus());
      await act(async () => userEvent.keyboard('{ArrowDown}'));
      await waitFor(() => {
        const id = combobox.getAttribute('aria-activedescendant');
        expect(id).toBeTruthy();
        expect(document.getElementById(id!)).toHaveTextContent(editable ? 'Bravo' : 'Alpha');
      });
      await act(async () => userEvent.keyboard('{Enter}'));
      expect(onSelect).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledOnce();
      const value = editable ? 'bravo' : 'alpha';
      expect(onChange.mock.calls[0][0]).toEqual(multiple ? [value] : value);
      expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).toBe(true);
    }
  );

  it.each([false, true])(
    'retains popup ownership through an unmatched query and clearing it (virtualized=%s)',
    async virtualized => {
      const onSelect = vi.fn();
      const onChange = vi.fn();
      render(
        renderPicker({
          'aria-label': 'Items',
          data,
          responsive: false,
          virtualized,
          locale: { noResultsText: message },
          onSelect,
          onChange
        })
      );
      const combobox = screen.getByRole('combobox', { name: 'Items' });
      await act(async () => userEvent.click(combobox));
      await waitFor(() => {
        expect(document.getElementById(combobox.getAttribute('aria-controls')!)).toHaveAttribute(
          'role',
          'listbox'
        );
      });
      const listbox = document.getElementById(combobox.getAttribute('aria-controls')!)!;
      const search = editable ? combobox : screen.getByRole('searchbox');
      await act(async () => userEvent.type(search, 'not-an-item'));
      await screen.findByText(message);
      expect(emptyOption(combobox).id).toBe(listbox.id);
      expect(search).toHaveFocus();
      await act(async () => userEvent.keyboard('{ArrowDown}'));
      expect(onSelect).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(combobox).not.toHaveAttribute('aria-activedescendant');

      await act(async () => userEvent.clear(search));
      await screen.findByRole('option', { name: 'Bravo' });
      expect(document.getElementById(combobox.getAttribute('aria-controls')!)).toHaveAttribute(
        'id',
        listbox.id
      );
      expect(screen.queryByRole('option', { name: message })).toBeNull();
      await act(async () => userEvent.click(screen.getByText('Bravo')));
      expect(onSelect).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange.mock.calls[0][0]).toEqual(multiple ? ['bravo'] : 'bravo');
      expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).toBe(true);
    }
  );
});

describe.each([false, true])('CheckPicker=%s empty-data scrolling', check => {
  it.each([false, true])(
    'reveals a distant selected item when data arrives (virtualized=%s)',
    async virtualized => {
      const onChange = vi.fn();
      const common = {
        'aria-label': 'Items',
        responsive: false as const,
        virtualized,
        defaultOpen: true,
        listboxMaxHeight: 180,
        onChange
      };
      const content = (items: typeof data) =>
        check ? (
          <CheckPicker {...common} data={items} defaultValue={['row-90']} />
        ) : (
          <SelectPicker {...common} data={items} defaultValue="row-90" />
        );
      const { rerender } = render(content([]));
      const combobox = screen.getByRole('combobox', { name: 'Items' });
      await waitFor(() => expect(combobox).toHaveAttribute('aria-expanded', 'true'));
      rerender(
        content(
          Array.from({ length: 100 }, (_, index) => ({
            label: `Row ${index}`,
            value: `row-${index}`
          }))
        )
      );
      await waitFor(() => {
        const option = screen.getByRole('option', { name: 'Row 90' });
        const listbox = document.getElementById(combobox.getAttribute('aria-controls')!)!;
        const row = option.getBoundingClientRect();
        const bounds = listbox.getBoundingClientRect();
        expect(row.top).toBeGreaterThanOrEqual(bounds.top - 1);
        expect(row.bottom).toBeLessThanOrEqual(bounds.bottom + 1);
      });
      expect(onChange).not.toHaveBeenCalled();
    }
  );
});
