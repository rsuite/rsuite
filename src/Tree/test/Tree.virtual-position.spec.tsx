import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tree from '../Tree';
import CheckTree from '../../CheckTree';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';
import type { ListHandle } from '@/internals/Windowing';
import type { TreeNode } from '@/internals/Tree/types';

function expectPosition(name: string, position: number, size: number, level: number) {
  const item = screen.getByRole('treeitem', { name });
  expect(item).to.have.attribute('aria-posinset', String(position));
  expect(item).to.have.attribute('aria-setsize', String(size));
  expect(item).to.have.attribute('aria-level', String(level));
}

describe.each([
  { name: 'Tree', Component: Tree },
  { name: 'CheckTree', Component: CheckTree }
])('$name virtual node positions', ({ Component }) => {
  it('reports logical root positions outside the initial mounted window', async () => {
    const data = Array.from({ length: 1000 }, (_, index) => ({
      value: `node-${index}`,
      label: `Node ${index}`
    }));
    const listRef = React.createRef<ListHandle>();

    render(<Component data={data} virtualized height={180} listRef={listRef} />);

    await waitFor(() => expectPosition('Node 0', 1, 1000, 1));
    expect(screen.queryByRole('treeitem', { name: 'Node 700' })).toBeNull();

    act(() => listRef.current?.scrollToItem?.(700, 'start'));
    await waitFor(() => expectPosition('Node 700', 701, 1000, 1));
    expect(screen.getAllByRole('treeitem').length).toBeLessThan(20);

    act(() => listRef.current?.scrollToItem?.(999, 'end'));
    await waitFor(() => expectPosition('Node 999', 1000, 1000, 1));
  });

  it('counts nested siblings while preserving colliding custom fields through collapse and search', async () => {
    const callerSymbol = Symbol('caller-node-metadata');
    const leafA = { posInSet: -1, title: 'Leaf A', setSize: 'leaf-a-owner' };
    const leafB = { posInSet: 'leaf-b', title: 'Leaf B', setSize: 'leaf-b-owner' };
    const disabled = { posInSet: 0, title: 'Disabled child', setSize: 'disabled-owner' };
    const branch = {
      posInSet: 42,
      title: 'Branch',
      setSize: 'branch-owner',
      [callerSymbol]: 'caller-value',
      nodes: [leafA, leafB]
    };
    const child = { posInSet: 'child-c', title: 'Child C', setSize: 'child-c-owner' };
    const department = {
      posInSet: 'department',
      title: 'Department',
      setSize: 'department-owner',
      nodes: [disabled, branch, child]
    };
    const other = { posInSet: 'other', title: 'Other root', setSize: 'other-owner' };
    const data = [department, other];
    const originals = [department, other, disabled, branch, child, leafA, leafB].map(node => ({
      node,
      value: node.posInSet,
      setSize: node.setSize,
      symbols: Object.getOwnPropertySymbols(node)
    }));
    const expectCallerFields = () => {
      for (const { node, value, setSize, symbols } of originals) {
        expect(node.posInSet).toBe(value);
        expect(node.setSize).toBe(setSize);
        expect(Object.getOwnPropertySymbols(node)).toEqual(symbols);
      }
      expect(branch[callerSymbol]).toBe('caller-value');
      expect(
        screen.getByRole('treeitem', { name: 'Leaf B' }).querySelector('[data-owner-size]')
      ).to.have.attribute('data-owner-size', 'leaf-b-owner');
    };
    const onExpand = vi.fn();
    const props = {
      data,
      virtualized: true,
      height: 360,
      valueKey: 'posInSet',
      labelKey: 'title',
      childrenKey: 'nodes',
      disabledItemValues: [0, -1],
      onExpand,
      renderTreeNode: node => <span data-owner-size={node.setSize}>{node.title}</span>
    };
    const { rerender } = render(<Component {...props} expandItemValues={['department', 42]} />);

    await waitFor(() => expectPosition('Leaf B', 2, 2, 3));
    expectPosition('Department', 1, 2, 1);
    expectPosition('Other root', 2, 2, 1);
    expectPosition('Disabled child', 1, 3, 2);
    expectPosition('Branch', 2, 3, 2);
    expectPosition('Child C', 3, 3, 2);
    expectPosition('Leaf A', 1, 2, 3);
    expect(screen.getByRole('treeitem', { name: 'Disabled child' })).to.have.attribute(
      'aria-disabled',
      'true'
    );
    expectCallerFields();

    rerender(<Component {...props} expandItemValues={[42]} />);
    await waitFor(() => {
      expect(screen.queryByRole('treeitem', { name: 'Branch' })).toBeNull();
      expectPosition('Other root', 2, 2, 1);
    });

    rerender(<Component {...props} expandItemValues={['department', 42]} />);
    await waitFor(() => expectPosition('Leaf B', 2, 2, 3));

    rerender(<Component {...props} expandItemValues={['department', 42]} searchKeyword="Leaf B" />);
    await waitFor(() => {
      expectPosition('Department', 1, 1, 1);
      expectPosition('Branch', 1, 1, 2);
      expectPosition('Leaf B', 1, 1, 3);
    });
    expectCallerFields();
    expect(onExpand).not.toHaveBeenCalled();
  });

  it('updates sibling sets when search results and data order change', async () => {
    const first = { value: 'first', label: 'Match first' };
    const hidden = { value: 'hidden', label: 'Omitted child' };
    const second = { value: 'second', label: 'Match second' };
    const parent = { value: 'parent', label: 'Department', children: [first, hidden, second] };
    const other = { value: 'other', label: 'Match root' };
    const omitted = { value: 'omitted', label: 'Omitted root' };
    const props = {
      virtualized: true,
      height: 360,
      expandItemValues: ['parent'],
      disabledItemValues: ['second']
    };
    const { rerender } = render(
      <Component {...props} data={[parent, omitted, other]} searchKeyword="Match" />
    );

    await waitFor(() => expectPosition('Match second', 2, 2, 2));
    expectPosition('Department', 1, 2, 1);
    expectPosition('Match root', 2, 2, 1);
    expectPosition('Match first', 1, 2, 2);
    expect(screen.queryByRole('treeitem', { name: 'Omitted child' })).toBeNull();

    const reordered = [other, omitted, { ...parent, children: [second, hidden, first] }];
    rerender(<Component {...props} data={reordered} searchKeyword="Match" />);

    await waitFor(() => {
      expectPosition('Department', 2, 2, 1);
      expectPosition('Match second', 1, 2, 2);
      expectPosition('Match first', 2, 2, 2);
    });

    rerender(<Component {...props} data={reordered} searchKeyword="" />);
    await waitFor(() => {
      expectPosition('Department', 3, 3, 1);
      expectPosition('Omitted child', 2, 3, 2);
      expectPosition('Match first', 3, 3, 2);
    });
  });

  it('counts loaded children without predicting an unavailable remote total', async () => {
    const data = [
      { value: 'load', label: 'Load children', children: [] },
      { value: 'other', label: 'Other root' }
    ];
    let resolveChildren!: (children: TreeNode[]) => void;
    const getChildren = vi.fn(
      () => new Promise<TreeNode[]>(resolve => (resolveChildren = resolve))
    );

    render(<Component data={data} virtualized height={180} getChildren={getChildren} />);

    await waitFor(() => expectPosition('Load children', 1, 2, 1));
    fireEvent.click(screen.getByRole('button', { name: 'Expand Load children' }));
    expect(getChildren).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('treeitem', { name: 'Loaded first' })).toBeNull();
    expectPosition('Load children', 1, 2, 1);

    await act(async () => {
      resolveChildren([
        { value: 'loaded-first', label: 'Loaded first' },
        { value: 'loaded-second', label: 'Loaded second' }
      ]);
    });

    await waitFor(() => expectPosition('Loaded second', 2, 2, 2));
    expectPosition('Loaded first', 1, 2, 2);
    expectPosition('Other root', 2, 2, 1);
    expect(getChildren).toHaveBeenCalledTimes(1);
  });

  it('preserves DOM-derived positions for nonvirtual trees', async () => {
    const data = [
      { value: 'parent', label: 'Parent', children: [{ value: 'child', label: 'Child' }] }
    ];

    render(<Component data={data} defaultExpandAll />);

    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Child' })).to.exist);
    for (const item of screen.getAllByRole('treeitem')) {
      expect(item).to.not.have.attribute('aria-posinset');
      expect(item).to.not.have.attribute('aria-setsize');
    }
  });
});

describe.each([
  { name: 'TreePicker', Component: TreePicker },
  { name: 'CheckTreePicker', Component: CheckTreePicker }
])('$name virtual node positions', ({ Component }) => {
  it('inherits logical sibling positions in the picker popup', async () => {
    const data = [
      {
        value: 'parent',
        label: 'Parent',
        children: [
          { value: 'child-a', label: 'Child A' },
          { value: 'child-b', label: 'Child B' }
        ]
      },
      { value: 'other', label: 'Other root' }
    ];

    render(<Component data={data} virtualized defaultOpen defaultExpandItemValues={['parent']} />);

    await waitFor(() => expectPosition('Child B', 2, 2, 2));
    expectPosition('Parent', 1, 2, 1);
    expectPosition('Other root', 2, 2, 1);
  });
});
