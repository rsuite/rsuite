import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TreePicker from '..';
import CheckTreePicker from '../../CheckTreePicker';
import Tree from '../../Tree';
import CheckTree from '../../CheckTree';
import '../styles/index.scss';
import '../../Tree/styles/index.scss';
import '../../CheckTree/styles/index.scss';
import '../../CheckTreePicker/styles/index.scss';

const components = [
  { name: 'Tree', Component: Tree, multiple: false, picker: false },
  { name: 'CheckTree', Component: CheckTree, multiple: true, picker: false },
  { name: 'TreePicker', Component: TreePicker, multiple: false, picker: true },
  { name: 'CheckTreePicker', Component: CheckTreePicker, multiple: true, picker: true }
];

describe.each(components)('$name field mapping', ({ Component, multiple, picker }) => {
  describe.each([false, true])('virtualized=%s', virtualized => {
    it('expands and collapses repeatedly with valueKey=data', async () => {
      const onExpand = vi.fn();
      render(
        <Component
          {...(picker ? { open: true } : {})}
          virtualized={virtualized}
          valueKey="data"
          onExpand={onExpand}
          data={[
            { data: 'parent', label: 'Parent', children: [{ data: 'child', label: 'Child' }] }
          ]}
        />
      );
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByRole('button', { name: 'Expand Parent' }));
        await screen.findByRole('treeitem', { name: 'Child' });
        expect(screen.getByRole('treeitem', { name: 'Parent' }).getAttribute('aria-expanded')).toBe(
          'true'
        );
        fireEvent.click(screen.getByRole('button', { name: 'Collapse Parent' }));
        await waitFor(() => expect(screen.queryByRole('treeitem', { name: 'Child' })).toBeNull());
        expect(screen.getByRole('treeitem', { name: 'Parent' }).getAttribute('aria-expanded')).toBe(
          'false'
        );
      }
      expect(onExpand.mock.calls.map(args => args[0])).toEqual([
        ['parent'],
        [],
        ['parent'],
        [],
        ['parent'],
        []
      ]);
    });

    it('updates childrenKey with the same source array', async () => {
      const data = [
        {
          value: 'parent',
          label: 'Parent',
          children: [{ value: 'old', label: 'Old child' }],
          nodes: [{ value: 'new', label: 'New child' }]
        }
      ];
      const view = (childrenKey: string) => (
        <Component
          {...(picker ? { open: true } : {})}
          virtualized={virtualized}
          data={data}
          childrenKey={childrenKey}
          expandItemValues={['parent']}
        />
      );
      const { rerender } = render(view('children'));
      await screen.findByRole('treeitem', { name: 'Old child' });
      rerender(view('nodes'));
      await screen.findByRole('treeitem', { name: 'New child' });
      expect(screen.queryByRole('treeitem', { name: 'Old child' })).toBeNull();
    });

    it('selects with the updated valueKey while the source array stays the same', async () => {
      const data = [
        {
          value: 'parent',
          code: 'p',
          label: 'Parent',
          children: [{ value: 'child', code: 'c', label: 'Child' }]
        }
      ];
      const onChange = vi.fn();
      const view = (valueKey: string) => (
        <Component
          {...(picker ? { open: true } : {})}
          virtualized={virtualized}
          data={data}
          valueKey={valueKey}
          {...(multiple ? { cascade: false } : {})}
          expandItemValues={[valueKey === 'value' ? 'parent' : 'p']}
          onChange={onChange}
        />
      );
      const { rerender } = render(view('value'));
      await screen.findByRole('treeitem', { name: 'Child' });
      rerender(view('code'));
      const child = await screen.findByRole('treeitem', { name: 'Child' });
      const tree = screen.getByRole('tree');
      fireEvent.keyDown(tree, { key: 'Home' });
      await waitFor(() =>
        expect(document.activeElement).toBe(screen.getByRole('treeitem', { name: 'Parent' }))
      );
      fireEvent.keyDown(tree, { key: 'ArrowDown' });
      await waitFor(() => expect(document.activeElement).toBe(child));
      fireEvent.keyDown(child, { key: 'Enter' });
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.calls[0][0]).toEqual(multiple ? ['c'] : 'c');
    });

    it('reapplies the current search when labelKey changes', async () => {
      const data = [{ value: 'child', label: 'Old label', title: 'New label' }];
      const view = (labelKey: string) => (
        <Component
          {...(picker ? { open: true } : {})}
          virtualized={virtualized}
          data={data}
          labelKey={labelKey}
          searchKeyword="New"
        />
      );
      const { rerender } = render(view('label'));
      expect(screen.queryByRole('treeitem')).toBeNull();
      rerender(view('title'));
      await screen.findByRole('treeitem', { name: 'New label' });
    });
  });
});
