import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import Cascader from '../../../Cascader';
import MultiCascader from '../../../MultiCascader';
import CustomProvider from '../../../CustomProvider';
import '../../../Cascader/styles/index.scss';
import '../../../MultiCascader/styles/index.scss';

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
const expectFocus = async (name: string) => waitFor(() => expect(node(name)).toHaveFocus());

const pickers: [string, React.ElementType][] = [
  ['Cascader', Cascader],
  ['MultiCascader', MultiCascader]
];

for (const [name, Component] of pickers) {
  describe(`${name} parent-value keyboard navigation`, () => {
    for (const custom of [false, true]) {
      it.each([0, '', 'parent-key'])(
        `returns to raw parent %j with custom fields=${custom}, then navigates its root siblings`,
        async value => {
          const labelKey = custom ? 'title' : 'label';
          const valueKey = custom ? 'code' : 'value';
          const childrenKey = custom ? 'nodes' : 'children';
          const child = { [labelKey]: 'Child', [valueKey]: 'child-key' };
          const parent = { [labelKey]: 'Parent', [valueKey]: value, [childrenKey]: [child] };
          const data = [parent, { [labelKey]: 'Last', [valueKey]: 'last-key' }];
          const onChange = vi.fn();
          const onSelect = vi.fn();
          render(
            <Component
              defaultOpen
              data={data}
              labelKey={labelKey}
              valueKey={valueKey}
              childrenKey={childrenKey}
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
          await press('ArrowLeft');
          await expectFocus('Parent');
          expect(node('Parent')).toHaveAttribute('data-picker-key', `${typeof value}:${value}`);
          expect(node('Child')).toBeVisible();
          await press('ArrowDown');
          await expectFocus('Last');
          expect(node('Last')).toHaveAttribute('data-picker-key', 'string:last-key');
          expect(parent[childrenKey][0]).toBe(child);
          expect(onChange).not.toHaveBeenCalled();
          expect(onSelect).not.toHaveBeenCalled();
          expect(keys).toHaveLength(4);
        }
      );
    }

    it.each([0, ''])('returns to raw parent %j with reversed RTL arrows', async value => {
      const onChange = vi.fn();
      const onSelect = vi.fn();
      render(
        <CustomProvider rtl>
          <Component
            defaultOpen
            data={[
              { label: 'Parent', value, children: [{ label: 'Child', value: 'child-key' }] },
              { label: 'Last', value: 'last-key' }
            ]}
            onChange={onChange}
            onSelect={onSelect}
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
      expect(node('Parent')).toHaveAttribute('data-picker-key', `${typeof value}:${value}`);
      await press('ArrowDown');
      await expectFocus('Last');
      expect(onChange).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
      expect(keys).toHaveLength(4);
    });
  });
}
