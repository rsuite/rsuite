import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { expect, it, vi } from 'vitest';
import MultiCascadeTree from '..';
import '../styles/index.scss';

it('preserves controlled raw checkbox values and callbacks when mixed search results reorder', async () => {
  const numeric = { label: 'Numeric target', value: 0 };
  const string = { label: 'String target', value: '0' };
  const data = [{ label: 'Parent', value: 'parent-key', children: [numeric, string] }];
  const onChange = vi.fn();
  const onCheck = vi.fn();
  const keys: KeyboardEvent[] = [];
  const recordKey = (event: KeyboardEvent) => keys.push(event);
  document.addEventListener('keydown', recordKey, true);
  function Example({ currentData = data }) {
    const [value, setValue] = React.useState<(number | string)[]>([0]);
    return (
      <MultiCascadeTree
        searchable
        cascade={false}
        data={currentData}
        value={value}
        onCheck={onCheck}
        onChange={(next, event) => {
          onChange(next, event);
          setValue(next);
        }}
      />
    );
  }
  const { rerender } = render(<Example />);
  try {
    const input = screen.getByRole('searchbox');
    await act(async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'target');
    });
    await waitFor(() => expect(screen.getAllByRole('treeitem')).toHaveLength(2));
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
    rerender(<Example currentData={[{ ...data[0], children: [string, numeric] }]} />);
    await waitFor(() =>
      expect(screen.getAllByRole('treeitem')[0]).toHaveTextContent('String target')
    );
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
    expect(input).toHaveFocus();
    await act(async () => userEvent.click(screen.getAllByRole('checkbox')[0]));
    await act(async () => userEvent.click(screen.getAllByRole('checkbox')[1]));
    expect(onChange.mock.calls.map(call => call[0])).toEqual([[0, '0'], ['0']]);
    expect(onCheck.mock.calls[0][1]).toBe(string);
    expect(onCheck.mock.calls[1][1]).toBe(numeric);
    expect(onCheck.mock.calls.map(call => call[2])).toEqual([true, false]);
    expect(onChange.mock.calls.every(call => call[1].isTrusted)).toBe(true);
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
    expect(keys).toHaveLength(6);
    expect(keys.every(event => event.isTrusted)).toBe(true);
  } finally {
    document.removeEventListener('keydown', recordKey, true);
  }
});
