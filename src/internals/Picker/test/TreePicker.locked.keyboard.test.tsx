import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TreePicker from '../../../TreePicker';
import CheckTreePicker from '../../../CheckTreePicker';
import '../../../TreePicker/styles/index.scss';
import '../../../CheckTreePicker/styles/index.scss';

const data = [
  { label: 'Alpha', value: 'alpha' },
  { label: 'Beta', value: 'beta' }
];
const pickers: [string, React.ElementType][] = [
  ['TreePicker', TreePicker],
  ['CheckTreePicker', CheckTreePicker]
];
type Flag = 'enabled' | 'disabled' | 'readOnly' | 'loading';
const cases: [string, Flag, React.ElementType][] = pickers.flatMap(([name, Picker]) =>
  (['enabled', 'disabled', 'readOnly', 'loading'] as const).map(
    (flag): [string, Flag, React.ElementType] => [name, flag, Picker]
  )
);
const restoreCases: [string, Flag, React.ElementType][] = pickers.flatMap(([name, Picker]) =>
  (['readOnly', 'loading'] as const).map((flag): [string, Flag, React.ElementType] => [
    name,
    flag,
    Picker
  ])
);

let keys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => keys.push(event);
const press = (key: string) => act(async () => userEvent.keyboard(`{${key}}`));

beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
});

afterEach(() => document.removeEventListener('keydown', recordKey, true));

const setup = async (Picker: React.ElementType) => {
  const onChange = vi.fn();
  const onSelect = vi.fn();
  const onKeyDown = vi.fn();
  const { rerender } = render(
    <Picker data={data} defaultOpen onChange={onChange} onSelect={onSelect} />
  );
  act(() => screen.getByRole('combobox').focus());
  await press('ArrowDown');
  const alpha = screen.getByRole('treeitem', { name: 'Alpha' });
  await waitFor(() => expect(alpha).toHaveFocus());

  const setFlag = (flag: Flag) => {
    const state = flag === 'enabled' ? {} : { [flag]: true };
    rerender(
      <Picker
        data={data}
        defaultOpen
        {...state}
        onChange={onChange}
        onSelect={onSelect}
        onKeyDown={onKeyDown}
      />
    );
  };

  return { alpha, onChange, onSelect, onKeyDown, setFlag };
};

const expectTrustedKeys = (count: number) => {
  expect(keys).toHaveLength(count);
  expect(keys.every(event => event.isTrusted)).toBe(true);
};

const expectBetaSelection = (
  name: string,
  onChange: ReturnType<typeof vi.fn>,
  onSelect: ReturnType<typeof vi.fn>
) => {
  expect(onChange).toHaveBeenCalled();
  for (const [value, event] of onChange.mock.calls) {
    expect(value).toEqual(name === 'CheckTreePicker' ? ['beta'] : 'beta');
    expect(event.nativeEvent.isTrusted).toBe(true);
  }
  expect(onSelect).toHaveBeenCalled();
  for (const [node, , event] of onSelect.mock.calls) {
    expect(node).toMatchObject(data[1]);
    expect(event.nativeEvent.isTrusted).toBe(true);
  }
};

describe('Tree picker open menu locked keyboard navigation', () => {
  it.each(cases)('%s after %s transition', async (name, flag, Picker) => {
    const { alpha, onChange, onSelect, onKeyDown, setFlag } = await setup(Picker);
    setFlag(flag);
    await press('ArrowDown');
    const afterDown = document.activeElement;
    await press('Enter');

    expectTrustedKeys(3);
    expect(onKeyDown.mock.calls.map(call => call[0].key)).toEqual(['ArrowDown', 'Enter']);
    expect(onKeyDown.mock.calls.every(call => call[0].nativeEvent.isTrusted)).toBe(true);
    if (flag === 'enabled') {
      expect(afterDown).toHaveAttribute('aria-label', 'Beta');
      expectBetaSelection(name, onChange, onSelect);
    } else {
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
      expect(afterDown).toBe(alpha);
      expect(alpha).toHaveFocus();
    }
  });

  it.each(restoreCases)('%s resumes after %s is removed', async (name, flag, Picker) => {
    const { alpha, onChange, onSelect, onKeyDown, setFlag } = await setup(Picker);
    setFlag(flag);
    await press('ArrowDown');
    await press('Enter');
    expect(alpha).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();

    setFlag('enabled');
    await press('ArrowDown');
    expect(screen.getByRole('treeitem', { name: 'Beta' })).toHaveFocus();
    await press('Enter');
    expectBetaSelection(name, onChange, onSelect);
    expectTrustedKeys(5);
    expect(onKeyDown.mock.calls.map(call => call[0].key)).toEqual([
      'ArrowDown',
      'Enter',
      'ArrowDown',
      'Enter'
    ]);
    expect(onKeyDown.mock.calls.every(call => call[0].nativeEvent.isTrusted)).toBe(true);
  });
});
