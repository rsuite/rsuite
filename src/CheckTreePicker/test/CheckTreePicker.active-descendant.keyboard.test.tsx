import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CheckTreePicker from '..';
import type { PickerHandle } from '@/internals/Picker';
import '../styles/index.scss';

const values = [0, '', 'normal', 'space \t%value'];
let keys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => keys.push(event);
beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => document.removeEventListener('keydown', recordKey, true));

async function key(name: string) {
  await act(async () => {
    await userEvent.keyboard(`{${name}}`);
  });
  expect(keys.at(-1)?.isTrusted).toBe(true);
}

async function expectActiveRow(toggle: HTMLElement, label: string) {
  await waitFor(() => {
    const row = screen.getByRole('treeitem', { name: label });
    expect(row).toHaveFocus();
    expect(toggle).toHaveAttribute('aria-activedescendant', row.id);
    expect(document.getElementById(toggle.getAttribute('aria-activedescendant')!)).toBe(row);
  });
}

it.each([false, true])(
  'associates distinct numeric/string zero rows and selects each raw value once (virtual=%s)',
  async virtualized => {
    const onEntered = vi.fn();
    const onChange = vi.fn();
    render(
      <CheckTreePicker
        data={[
          { label: 'Numeric zero', nodeId: 0 },
          { label: 'String zero', nodeId: '0' }
        ]}
        valueKey="nodeId"
        virtualized={virtualized}
        searchable={false}
        responsive={false}
        onEntered={onEntered}
        onChange={onChange}
      />
    );
    const toggle = screen.getByRole('combobox');
    toggle.focus();
    await key('Enter');
    await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
    const numeric = screen.getByRole('treeitem', { name: 'Numeric zero' });
    const string = screen.getByRole('treeitem', { name: 'String zero' });
    expect(numeric.id).not.toBe(string.id);
    await key('ArrowDown');
    await expectActiveRow(toggle, 'Numeric zero');
    await key('Enter');
    expect(onChange).toHaveBeenCalledExactlyOnceWith([0], expect.anything());
    await key('ArrowDown');
    await expectActiveRow(toggle, 'String zero');
    await key('Enter');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual([0, '0']);
    expect(onChange.mock.calls.every(call => call[1].nativeEvent.isTrusted)).toBe(true);
    expect(keys.length).toBe(5);
    expect(keys.every(event => event.isTrusted)).toBe(true);
  }
);

describe.each(values)('raw node value %j', value => {
  it.each(
    [false, true].flatMap(virtualized =>
      ['value', 'nodeId'].map(valueKey => ({ virtualized, valueKey }))
    )
  )(
    'associates the author ID with the focused row and selects its raw value (virtual=$virtualized, valueKey=$valueKey)',
    async ({ virtualized, valueKey }) => {
      const onEntered = vi.fn();
      const onChange = vi.fn();
      render(
        <CheckTreePicker
          id="check-tree-owner"
          data={[
            { label: 'First row', [valueKey]: 'first' },
            { label: 'Target row', [valueKey]: value },
            { label: 'Last row', [valueKey]: 'last' }
          ]}
          valueKey={valueKey}
          searchable={false}
          responsive={false}
          virtualized={virtualized}
          onEntered={onEntered}
          onChange={onChange}
        />
      );
      const toggle = screen.getByRole('combobox');
      expect(toggle.id).toBe('check-tree-owner');
      toggle.focus();
      await key('Enter');
      await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      await key('ArrowDown');
      await waitFor(() =>
        expect(screen.getByRole('treeitem', { name: 'First row' })).toHaveFocus()
      );
      await key('ArrowDown');
      await expectActiveRow(toggle, 'Target row');
      expect(screen.getByRole('treeitem', { name: 'Target row' })).toHaveAttribute(
        'data-key',
        `${typeof value === 'number' ? 'Number' : 'String'}_${value}`
      );
      await key('Enter');
      expect(onChange).toHaveBeenCalledExactlyOnceWith([value], expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
      expect(keys.length).toBe(4);
      expect(keys.every(event => event.isTrusted)).toBe(true);
    }
  );

  it('clears an unmounted virtual descendant and reopens without a stale reference or implicit checked-row focus', async () => {
    const ref = React.createRef<PickerHandle>();
    const onEntered = vi.fn();
    const onExited = vi.fn();
    const onChange = vi.fn();
    const data = Array.from({ length: 1000 }, (_, index) => ({
      label: index === 999 ? 'Target row' : `Node ${index}`,
      nodeId: index === 999 ? value : `node-${index}`
    }));
    render(
      <CheckTreePicker
        ref={ref}
        data={data}
        valueKey="nodeId"
        virtualized
        treeHeight={180}
        listProps={{ height: 180, itemSize: 36 }}
        searchable={false}
        responsive={false}
        onEntered={onEntered}
        onExited={onExited}
        onChange={onChange}
      />
    );
    const toggle = screen.getByRole('combobox');
    toggle.focus();
    await key('Enter');
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
    await key('ArrowDown');
    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Node 0' })).toHaveFocus());
    await key('End');
    await expectActiveRow(toggle, 'Target row');
    await key('Enter');
    expect(onChange).toHaveBeenCalledExactlyOnceWith([value], expect.anything());
    expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
    act(() => ref.current?.list?.scrollToItem?.(0));
    await waitFor(() => {
      expect(screen.queryByRole('treeitem', { name: 'Target row' })).toBeNull();
      expect(toggle).not.toHaveAttribute('aria-activedescendant');
    });
    toggle.focus();
    await key('Escape');
    await waitFor(() => expect(onExited).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.queryByRole('tree', { hidden: true })).toBeNull());
    await key('Enter');
    await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(2));
    expect(toggle).toHaveFocus();
    expect(toggle).not.toHaveAttribute('aria-activedescendant');
    await key('ArrowDown');
    await expectActiveRow(toggle, 'Node 0');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(keys.length).toBe(7);
    expect(keys.every(event => event.isTrusted)).toBe(true);
  });
});
