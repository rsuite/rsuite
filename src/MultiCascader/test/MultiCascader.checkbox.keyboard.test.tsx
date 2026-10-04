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
const node = (name: string) => screen.getByRole('treeitem', { name });
const focus = async (name: string) => waitFor(() => expect(node(name)).toHaveFocus());
const enterChildren = async () => {
  act(() => screen.getByRole('combobox').focus());
  await press('ArrowDown');
  await focus('Parent');
  await press('ArrowRight');
};

function setup(data: any[], initialValue: (string | number)[] = [], props: any = {}) {
  const onChange = vi.fn();
  const onCheck = vi.fn();
  function Example({ currentData = data, readOnly = false }) {
    const [value, setValue] = React.useState(initialValue);
    return (
      <MultiCascader
        defaultOpen
        cascade={false}
        data={currentData}
        value={value}
        {...props}
        readOnly={readOnly}
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

const expectToggle = (
  onChange: ReturnType<typeof vi.fn>,
  onCheck: ReturnType<typeof vi.fn>,
  leaf: any,
  value: unknown,
  before: unknown[] = []
) => {
  expect(onChange.mock.calls.map(call => call[0])).toEqual([[...before, value], before]);
  expect(onCheck.mock.calls.map(call => call[2])).toEqual([true, false]);
  expect(onCheck.mock.calls.every(call => call[1] === leaf)).toBe(true);
  expect(onChange.mock.calls.every(call => call[1].isTrusted)).toBe(true);
};

describe('MultiCascader typed checkbox keyboard selection', () => {
  it.each([false, true])('toggles the second mixed sibling, reverse=%s', async reverse => {
    const first = { label: 'First child', value: reverse ? '0' : 0 };
    const second = { label: 'Second child', value: reverse ? 0 : '0' };
    const { onChange, onCheck } = setup([
      { label: 'Parent', value: 'parent-key', children: [first, second] }
    ]);
    await enterChildren();
    await focus('First child');
    await press('ArrowDown');
    await focus('Second child');
    await press('Enter');
    expect(screen.getByRole('checkbox', { name: 'Second child' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'First child' })).not.toBeChecked();
    await press('Enter');
    expectToggle(onChange, onCheck, second, second.value);
    expect(screen.getByRole('checkbox', { name: 'Second child' })).not.toBeChecked();
    expect(node('Second child')).toHaveFocus();
  });

  it.each([false, true])(
    'reads the focused checkbox when its mixed sibling is already selected, custom=%s',
    async custom => {
      const valueKey = custom ? 'code' : 'value';
      const labelKey = custom ? 'title' : 'label';
      const childrenKey = custom ? 'nodes' : 'children';
      const firstValue = custom ? '0' : 0;
      const secondValue = custom ? 0 : '0';
      const first = { [labelKey]: 'First child', [valueKey]: firstValue };
      const second = { [labelKey]: 'Second child', [valueKey]: secondValue };
      const { onChange, onCheck } = setup(
        [{ [labelKey]: 'Parent', [valueKey]: 'parent-key', [childrenKey]: [first, second] }],
        [firstValue],
        { valueKey, labelKey, childrenKey }
      );
      await enterChildren();
      await focus('First child');
      await press('ArrowDown');
      await focus('Second child');
      await press('Enter');
      expect(screen.getByRole('checkbox', { name: 'First child' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Second child' })).toBeChecked();
      await press('Enter');
      expectToggle(onChange, onCheck, second, secondValue, [firstValue]);
      expect(screen.getByRole('checkbox', { name: 'First child' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Second child' })).not.toBeChecked();
    }
  );

  it('keeps controlled checked values after raw child objects are reordered', async () => {
    const numeric = { label: 'Numeric zero', value: 0 };
    const string = { label: 'String zero', value: '0' };
    const data = [{ label: 'Parent', value: 'parent-key', children: [numeric, string] }];
    const { Example, rerender, onChange, onCheck } = setup(data, ['0']);
    rerender(<Example currentData={[{ ...data[0], children: [string, numeric] }]} />);
    await enterChildren();
    await focus('String zero');
    expect(screen.getByRole('checkbox', { name: 'String zero' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Numeric zero' })).not.toBeChecked();
    await press('Enter');
    await press('ArrowDown');
    await focus('Numeric zero');
    await press('Enter');
    await press('Enter');
    expect(onChange.mock.calls.map(call => call[0])).toEqual([[], [0], []]);
    expect(onCheck.mock.calls.map(call => call[1])).toEqual([string, numeric, numeric]);
    expect(onCheck.mock.calls[0][1]).toBe(string);
    expect(onCheck.mock.calls[1][1]).toBe(numeric);
    expect(onChange.mock.calls.every(call => call[1].isTrusted)).toBe(true);
    expect(screen.getByRole('checkbox', { name: 'Numeric zero' })).not.toBeChecked();
  });

  it.each(['quote"key', 'path\\segment'])(
    'toggles literal value %j without parsing it as a selector',
    async value => {
      const leaf = { label: 'Leaf', value };
      const { onChange, onCheck } = setup([
        { label: 'Parent', value: 'parent-key', children: [leaf] }
      ]);
      await enterChildren();
      await focus('Leaf');
      await press('Enter');
      expect(screen.getByRole('checkbox', { name: 'Leaf' })).toBeChecked();
      await press('Enter');
      expectToggle(onChange, onCheck, leaf, value);
    }
  );

  it.each([0, ''])('preserves actual focused falsy leaf %j selection', async value => {
    const leaf = { label: 'Leaf', value };
    const { onChange, onCheck } = setup([
      { label: 'Parent', value: 'parent-key', children: [leaf] }
    ]);
    await enterChildren();
    await focus('Leaf');
    await press('Enter');
    await press('Enter');
    expectToggle(onChange, onCheck, leaf, value);
  });

  it('skips the disabled numeric sibling and reads the enabled string checkbox', async () => {
    const disabled = { label: 'Disabled zero', value: 0 };
    const enabled = { label: 'Enabled zero', value: '0' };
    const { onChange, onCheck } = setup(
      [{ label: 'Parent', value: 'parent-key', children: [disabled, enabled] }],
      [],
      { disabledItemValues: [0] }
    );
    await enterChildren();
    await focus('Enabled zero');
    expect(node('Disabled zero')).toHaveAttribute('aria-disabled', 'true');
    await press('Enter');
    await press('Enter');
    expectToggle(onChange, onCheck, enabled, '0');
    expect(screen.getByRole('checkbox', { name: 'Disabled zero' })).not.toBeChecked();
  });

  it('keeps the existing readOnly keyboard guard', async () => {
    const leaf = { label: 'Leaf', value: 'leaf-key' };
    const data = [{ label: 'Parent', value: 'parent-key', children: [leaf] }];
    const { Example, rerender, onChange, onCheck } = setup(data);
    await enterChildren();
    await focus('Leaf');
    rerender(<Example readOnly />);
    await press('Enter');
    expect(onChange).not.toHaveBeenCalled();
    expect(onCheck).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox', { name: 'Leaf' })).not.toBeChecked();
  });
});
