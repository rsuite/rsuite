import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MultiCascader from '..';
import '../styles/index.scss';

let keys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => keys.push(event);
beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => {
  document.removeEventListener('keydown', recordKey, true);
  expect(keys.length).toBeGreaterThan(0);
  expect(keys.every(event => event.isTrusted)).toBe(true);
});
const press = async (key: string) => act(async () => userEvent.keyboard(`{${key}}`));

function setup(data: any[], initialValue: (number | string)[] = []) {
  const onChange = vi.fn();
  const onCheck = vi.fn();
  function Example({ currentData = data }) {
    const [value, setValue] = React.useState(initialValue);
    return (
      <MultiCascader
        defaultOpen
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
  return { ...render(<Example />), Example, onChange, onCheck };
}

const search = async (count: number) => {
  const input = screen.getByRole('searchbox');
  await act(async () => {
    await userEvent.click(input);
    await userEvent.type(input, 'target');
  });
  await waitFor(() => expect(screen.getAllByRole('treeitem')).toHaveLength(count));
  return input;
};
const expectValues = (
  onChange: ReturnType<typeof vi.fn>,
  onCheck: ReturnType<typeof vi.fn>,
  leaf: any,
  value: unknown
) => {
  expect(onChange.mock.calls.map(call => call[0])).toEqual([[value], []]);
  expect(onCheck.mock.calls.map(call => call[2])).toEqual([true, false]);
  expect(onCheck.mock.calls.every(call => call[1] === leaf)).toBe(true);
  expect(onChange.mock.calls.every(call => call[1].isTrusted)).toBe(true);
};

describe('MultiCascader search keyboard selection', () => {
  it.each([false, true])(
    'toggles the second mixed result with raw type, reverse=%s',
    async reverse => {
      const first = { label: 'First target', value: reverse ? '0' : 0 };
      const second = { label: 'Second target', value: reverse ? 0 : '0' };
      const { onChange, onCheck } = setup([
        { label: 'Parent', value: 'parent-key', children: [first, second] }
      ]);
      const input = await search(2);
      await press('ArrowDown');
      await press('ArrowDown');
      await press('Enter');
      expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
      expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
      await press('Enter');
      expectValues(onChange, onCheck, second, second.value);
      expect(input).toHaveFocus();
    }
  );

  it('preserves distinct-value search toggling', async () => {
    const first = { label: 'First target', value: 'first-key' };
    const second = { label: 'Second target', value: 'second-key' };
    const { onChange, onCheck } = setup([
      { label: 'Parent', value: 'parent-key', children: [first, second] }
    ]);
    const input = await search(2);
    await press('ArrowDown');
    await press('ArrowDown');
    await press('Enter');
    await press('Enter');
    expectValues(onChange, onCheck, second, 'second-key');
    expect(input).toHaveFocus();
  });

  it.each(['quote"key', 'path\\segment'])('toggles literal search value %j', async value => {
    const leaf = { label: 'Leaf target', value };
    const { onChange, onCheck } = setup([
      { label: 'Parent', value: 'parent-key', children: [leaf] }
    ]);
    const input = await search(1);
    await press('ArrowDown');
    await press('Enter');
    expect(screen.getByRole('checkbox')).toBeChecked();
    await press('Enter');
    expectValues(onChange, onCheck, leaf, value);
    expect(input).toHaveFocus();
  });

  it('keeps controlled checked values and search input focus when results are reordered', async () => {
    const numeric = { label: 'Numeric target', value: 0 };
    const string = { label: 'String target', value: '0' };
    const data = [{ label: 'Parent', value: 'parent-key', children: [numeric, string] }];
    const { Example, rerender, onChange, onCheck } = setup(data, ['0']);
    const input = await search(2);
    expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
    rerender(<Example currentData={[{ ...data[0], children: [string, numeric] }]} />);
    await waitFor(() =>
      expect(screen.getAllByRole('treeitem')[0]).toHaveTextContent('String target')
    );
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked();
    expect(input).toHaveFocus();
    await press('ArrowDown');
    await press('Enter');
    await press('ArrowDown');
    await press('Enter');
    await press('Enter');
    expect(onChange.mock.calls.map(call => call[0])).toEqual([[], [0], []]);
    expect(onCheck.mock.calls[0][1]).toBe(string);
    expect(onCheck.mock.calls[1][1]).toBe(numeric);
    expect(onCheck.mock.calls[2][1]).toBe(numeric);
    expect(onChange.mock.calls.every(call => call[1].isTrusted)).toBe(true);
    expect(input).toHaveFocus();
  });
});
