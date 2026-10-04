import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MultiCascader from '..';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

let keys: KeyboardEvent[];
const recordKey = (event: KeyboardEvent) => keys.push(event);
beforeEach(() => {
  keys = [];
  document.addEventListener('keydown', recordKey, true);
});
afterEach(() => {
  document.removeEventListener('keydown', recordKey, true);
  expect(keys.every(event => event.isTrusted)).toBe(true);
});

const press = async (key: string) => act(async () => userEvent.keyboard(`{${key}}`));
const node = (name: string) => screen.getByRole('treeitem', { name });
const expectFocus = async (name: string) => waitFor(() => expect(node(name)).toHaveFocus());

describe('MultiCascader native column navigation', () => {
  it.each([42, 'child-key'])(
    'retains the child column when focusing leaf value %s and returns to its parent',
    async value => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      render(
        <MultiCascader
          defaultOpen
          data={[
            { label: 'Parent', value: 'parent', children: [{ label: 'Child', value }] },
            { label: 'Last', value: 'last' }
          ]}
          onChange={onChange}
          onSelect={onSelect}
        />
      );
      act(() => screen.getByRole('combobox').focus());
      await press('ArrowDown');
      await expectFocus('Parent');
      expect(node('Child')).toBeVisible();
      await press('ArrowRight');
      await expectFocus('Child');
      expect(screen.getAllByRole('group')).toHaveLength(2);
      await press('ArrowLeft');
      await expectFocus('Parent');
      expect(node('Child')).toBeVisible();
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
      expect(keys.filter(event => event.key.startsWith('Arrow'))).toHaveLength(3);
    }
  );

  it.each([false, true])(
    'keeps a controlled multilevel path with custom keys=%s and skips disabled children',
    async custom => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const onCheck = vi.fn();
      const childrenKey = custom ? 'nodes' : 'children';
      const labelKey = custom ? 'title' : 'label';
      const valueKey = custom ? 'code' : 'value';
      const data = [
        {
          [labelKey]: 'Root',
          [valueKey]: 8,
          [childrenKey]: [
            {
              [labelKey]: 'Branch',
              [valueKey]: 'branch',
              [childrenKey]: [
                { [labelKey]: 'Disabled leaf', [valueKey]: 'blocked' },
                { [labelKey]: 'Enabled leaf', [valueKey]: 42 }
              ]
            }
          ]
        }
      ];
      function Example() {
        const [value, setValue] = React.useState<(string | number)[]>([]);
        return (
          <MultiCascader
            defaultOpen
            data={data}
            childrenKey={childrenKey}
            labelKey={labelKey}
            valueKey={valueKey}
            value={value}
            cascade={false}
            disabledItemValues={['blocked']}
            onChange={(nextValue, event) => {
              onChange(nextValue, event);
              setValue(nextValue);
            }}
            onSelect={onSelect}
            onCheck={onCheck}
          />
        );
      }
      render(<Example />);
      act(() => screen.getByRole('combobox').focus());
      await press('ArrowDown');
      await expectFocus('Root');
      await press('ArrowRight');
      await expectFocus('Branch');
      await press('ArrowRight');
      await expectFocus('Enabled leaf');
      expect(screen.getAllByRole('group')).toHaveLength(3);
      expect(node('Disabled leaf')).toHaveAttribute('aria-disabled', 'true');
      await press('Enter');
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange.mock.calls[0][0]).toEqual([42]);
      expect(onChange.mock.calls[0][1].isTrusted).toBe(true);
      expect(onCheck.mock.calls[0][1]).toBe(data[0][childrenKey][0][childrenKey][1]);
      expect(screen.getByRole('checkbox', { name: 'Enabled leaf' })).toBeChecked();
      await press('ArrowLeft');
      await expectFocus('Branch');
      await press('ArrowLeft');
      await expectFocus('Root');
      expect(node('Branch')).toBeVisible();
      expect(screen.queryByRole('treeitem', { name: 'Enabled leaf' })).toBeNull();
      expect(screen.getAllByRole('group')).toHaveLength(2);
      expect(screen.getByRole('combobox')).toHaveTextContent('Enabled leaf');
      expect(onChange).toHaveBeenCalledOnce();
      expect(onSelect).not.toHaveBeenCalled();
    }
  );

  it('uses the loaded child parent relationship without fetching again while moving between columns', async () => {
    let resolveChildren: (children: { label: string; value: number }[]) => void = () => {};
    const getChildren = vi.fn(
      () =>
        new Promise<{ label: string; value: number }[]>(resolve => {
          resolveChildren = resolve;
        })
    );
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const onCheck = vi.fn();
    const data = [{ label: 'Parent', value: 'parent', children: [] }];
    const children = [{ label: 'Loaded child', value: 42 }];
    render(
      <MultiCascader
        defaultOpen
        data={data}
        cascade={false}
        getChildren={getChildren}
        onSelect={onSelect}
        onCheck={onCheck}
        onChange={onChange}
      />
    );
    await act(async () => userEvent.click(node('Parent')));
    expect(getChildren).toHaveBeenCalledOnce();
    await act(async () => resolveChildren(children));
    expect(node('Loaded child')).toBeVisible();
    act(() => node('Parent').focus());
    await press('ArrowRight');
    await expectFocus('Loaded child');
    await press('Enter');
    expect(onChange.mock.calls[0][0]).toEqual([42]);
    expect(onChange.mock.calls[0][1].isTrusted).toBe(true);
    expect(onCheck.mock.calls[0][1]).toBe(children[0]);
    await press('ArrowLeft');
    await expectFocus('Parent');
    expect(node('Loaded child')).toBeVisible();
    expect(getChildren).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect.mock.calls[0][0]).toBe(data[0]);
  });

  it('keeps the parent path when columns are entered and left in RTL', async () => {
    render(
      <CustomProvider rtl>
        <MultiCascader
          defaultOpen
          data={[
            { label: 'Parent', value: 'parent', children: [{ label: 'Child', value: 'child' }] }
          ]}
        />
      </CustomProvider>
    );
    act(() => screen.getByRole('combobox').focus());
    await press('ArrowDown');
    await expectFocus('Parent');
    await press('ArrowLeft');
    await expectFocus('Child');
    await press('ArrowRight');
    await expectFocus('Parent');
    expect(node('Child')).toBeVisible();
  });

  it('preserves external focus assigned by a public column focus handler', async () => {
    render(
      <>
        <button>Outside action</button>
        <MultiCascader
          defaultOpen
          data={[
            { label: 'Parent', value: 'parent', children: [{ label: 'Child', value: 'child' }] }
          ]}
          renderColumn={children => (
            <div
              onFocus={event => {
                if ((event.target as HTMLElement).dataset.key === 'child')
                  screen.getByRole('button', { name: 'Outside action' }).focus();
              }}
            >
              {children}
            </div>
          )}
        />
      </>
    );
    act(() => screen.getByRole('combobox').focus());
    await press('ArrowDown');
    await expectFocus('Parent');
    await press('ArrowRight');
    expect(node('Child')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Outside action' })).toHaveFocus();
  });

  it('preserves mouse-selected paths, controlled raw values and callback focus ownership', async () => {
    const onSelect = vi.fn();
    const onChange = vi.fn();
    const data = [
      { label: 'Parent', value: 'parent', children: [{ label: 'Child', value: 'child' }] }
    ];
    function Example() {
      const [value, setValue] = React.useState<string[]>([]);
      return (
        <>
          <button>Outside action</button>
          <MultiCascader
            defaultOpen
            cascade={false}
            data={data}
            value={value}
            onSelect={onSelect}
            onChange={(nextValue, event) => {
              onChange(nextValue, event);
              setValue(nextValue);
              screen.getByRole('button', { name: 'Outside action' }).focus();
            }}
          />
        </>
      );
    }
    render(<Example />);
    await act(async () => userEvent.click(node('Parent')));
    expect(node('Child')).toBeVisible();
    await act(async () => userEvent.click(screen.getByRole('checkbox', { name: 'Child' })));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0][0]).toEqual(['child']);
    expect(onChange.mock.calls[0][1].isTrusted).toBe(true);
    expect(screen.getByRole('checkbox', { name: 'Child' })).toBeChecked();
    expect(screen.getByRole('button', { name: 'Outside action' })).toHaveFocus();
    expect(onSelect.mock.calls[0][1].map(item => item.value)).toEqual(['parent']);
    expect(onSelect.mock.calls[0][2].isTrusted).toBe(true);
    expect(node('Child')).toBeVisible();
  });
});
