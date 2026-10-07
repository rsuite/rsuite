import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import AutoComplete from '../../../AutoComplete';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import '../../../SelectPicker/styles/index.scss';
import '../../../CheckPicker/styles/index.scss';
import '../../../AutoComplete/styles/index.scss';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';

const values = [
  'foo bar',
  'foo%20bar',
  'foo\tbar',
  'foo%09bar',
  'foo\nbar',
  'foo%0abar',
  'foo\fbar',
  'foo%0cbar',
  'foo\rbar',
  'foo%0dbar',
  'foo%bar',
  'foo%25bar'
];
const data = values.map((value, index) => ({ value, label: `Option ${index}` }));
type Callbacks = { onChange: ReturnType<typeof vi.fn>; onEntered: ReturnType<typeof vi.fn> };
type PickerCase = {
  name: string;
  tree: boolean;
  multiple: boolean;
  render: (callbacks: Callbacks) => React.ReactElement;
};
const pickers: PickerCase[] = [
  {
    name: 'SelectPicker',
    tree: false,
    multiple: false,
    render: callbacks => <SelectPicker data={data} defaultOpen searchable={false} {...callbacks} />
  },
  {
    name: 'CheckPicker',
    tree: false,
    multiple: true,
    render: callbacks => <CheckPicker data={data} defaultOpen searchable={false} {...callbacks} />
  },
  {
    name: 'AutoComplete',
    tree: false,
    multiple: false,
    render: callbacks => <AutoComplete data={data} open filterBy={() => true} {...callbacks} />
  },
  ...[false, true].flatMap(virtualized => [
    {
      name: `TreePicker virtualized=${virtualized}`,
      tree: true,
      multiple: false,
      render: (callbacks: Callbacks) => (
        <TreePicker
          data={data}
          defaultOpen
          searchable={false}
          virtualized={virtualized}
          treeHeight={180}
          listProps={{ height: 180, itemSize: 36 }}
          {...callbacks}
        />
      )
    },
    {
      name: `CheckTreePicker virtualized=${virtualized}`,
      tree: true,
      multiple: true,
      render: (callbacks: Callbacks) => (
        <CheckTreePicker
          data={data}
          defaultOpen
          searchable={false}
          virtualized={virtualized}
          treeHeight={180}
          listProps={{ height: 180, itemSize: 36 }}
          {...callbacks}
        />
      )
    }
  ])
];

async function nativeKey(key: string) {
  await act(() => userEvent.keyboard(`{${key}}`));
}

describe.each(pickers)('$name encoded option IDs', picker => {
  it.each([0, 1, 10, 11])(
    'selects the original value at index %i with native keys',
    async index => {
      const onChange = vi.fn();
      const onEntered = vi.fn();
      const keys: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => keys.push(event);
      const view = render(picker.render({ onChange, onEntered }));
      try {
        await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
        const combobox = screen.getByRole('combobox');
        const role = picker.tree ? 'treeitem' : 'option';
        const popup = document.getElementById(combobox.getAttribute('aria-controls')!);
        expect(popup).not.toBeNull();
        const initialRows = screen.getAllByRole(role);
        expect(new Set(initialRows.map(row => row.id)).size).toBe(initialRows.length);
        for (const row of initialRows) expect(row.id).not.toMatch(/[\t\n\f\r ]/);
        act(() => (picker.tree ? screen.getByRole(role, { name: 'Option 0' }) : combobox).focus());
        document.addEventListener('keydown', capture, true);
        for (let step = 0; step <= index; step++) {
          await nativeKey(picker.tree && step === 0 ? 'Home' : 'ArrowDown');
          const row = screen.getByRole(role, { name: `Option ${step}` });
          const activeId = combobox.getAttribute('aria-activedescendant');
          expect(activeId).toBe(row.id);
          expect(activeId).not.toMatch(/[\t\n\f\r ]/);
          expect(document.getElementById(activeId!)).toBe(row);
          expect(popup).to.contain(row);
          expect(
            Array.from(document.querySelectorAll('[id]')).filter(node => node.id === activeId)
          ).toHaveLength(1);
          expect(row.getBoundingClientRect().height).toBeGreaterThan(0);
        }
        expect(onChange).not.toHaveBeenCalled();
        await nativeKey('Enter');
        expect(keys.map(event => event.key)).toEqual([
          picker.tree ? 'Home' : 'ArrowDown',
          ...Array(index).fill('ArrowDown'),
          'Enter'
        ]);
        expect(keys.every(event => event.isTrusted)).toBe(true);
        expect(onChange).toHaveBeenCalledExactlyOnceWith(
          picker.multiple ? [values[index]] : values[index],
          expect.anything()
        );
        expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
      } finally {
        document.removeEventListener('keydown', capture, true);
        view.unmount();
      }
    }
  );
});

describe('AutoComplete popup references', () => {
  it.each([undefined, 'custom-autocomplete'])(
    'clears references after Escape with id=%s',
    async id => {
      const onChange = vi.fn();
      const view = render(
        <AutoComplete id={id} data={data} filterBy={() => true} onChange={onChange} />
      );
      const keys: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => keys.push(event);
      document.addEventListener('keydown', capture, true);
      try {
        const input = screen.getByRole('combobox');
        expect(input).to.have.attribute('aria-expanded', 'false');
        expect(input).not.to.have.attribute('aria-controls');
        expect(input).not.to.have.attribute('aria-activedescendant');
        await act(() => userEvent.click(input));
        const listbox = await screen.findByRole('listbox');
        expect(input).to.have.attribute('aria-expanded', 'true');
        expect(input).to.have.attribute('aria-controls', listbox.id);
        await nativeKey('ArrowDown');
        const option = screen.getByRole('option', { name: 'Option 0' });
        expect(input).to.have.attribute('aria-activedescendant', option.id);
        expect(listbox).to.contain(option);
        await nativeKey('Escape');
        expect(keys.map(event => event.key)).toEqual(['ArrowDown', 'Escape']);
        expect(keys.every(event => event.isTrusted)).toBe(true);
        expect(input).to.have.attribute('aria-expanded', 'false');
        expect(input).not.to.have.attribute('aria-controls');
        expect(input).not.to.have.attribute('aria-activedescendant');
        await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
        expect(input).to.have.focus;
        expect(onChange).not.toHaveBeenCalled();
      } finally {
        document.removeEventListener('keydown', capture, true);
        view.unmount();
      }
    }
  );
});
