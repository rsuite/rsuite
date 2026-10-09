import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tree from '..';
import CheckTree from '../../CheckTree';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';

const components: {
  name: string;
  Component: React.ComponentType<any>;
  multiple: boolean;
}[] = [
  { name: 'Tree', Component: Tree, multiple: false },
  { name: 'CheckTree', Component: CheckTree, multiple: true },
  { name: 'TreePicker', Component: TreePicker, multiple: false },
  { name: 'CheckTreePicker', Component: CheckTreePicker, multiple: true }
];

describe.each(components)('$name falsy keyboard values', ({ Component, multiple }) => {
  it.each([0, ''])('selects value %j with ArrowDown', value => {
    const onChange = vi.fn();
    render(
      <Component
        data={[
          { label: 'Falsy node', value },
          { label: 'Other node', value: 'other' }
        ]}
        defaultOpen
        searchable={false}
        onChange={onChange}
      />
    );
    const tree = screen.getByRole('tree');
    fireEvent.keyDown(tree, { key: 'ArrowDown' });
    const node = screen.getByRole('treeitem', { name: 'Falsy node' });
    expect(document.activeElement).to.equal(node);
    fireEvent.keyDown(node, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [value] : value, expect.anything());
  });

  it.each([0, ''])('continues ArrowDown navigation after value %j', value => {
    render(
      <Component
        data={[
          { label: 'Falsy node', value },
          { label: 'Other node', value: 'other' }
        ]}
        defaultOpen
        searchable={false}
      />
    );
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    const node = screen.getByRole('treeitem', { name: 'Falsy node' });
    fireEvent.keyDown(node, { key: 'ArrowDown' });
    expect(document.activeElement).to.equal(screen.getByRole('treeitem', { name: 'Other node' }));
  });

  it.each([0, ''])('selects value %j after Home and End navigation', value => {
    const onChange = vi.fn();
    render(
      <Component
        data={[
          { label: 'Other node', value: 'other' },
          { label: 'Falsy node', value }
        ]}
        defaultOpen
        searchable={false}
        onChange={onChange}
      />
    );
    const tree = screen.getByRole('tree');
    fireEvent.keyDown(tree, { key: 'Home' });
    const first = screen.getByRole('treeitem', { name: 'Other node' });
    expect(document.activeElement).to.equal(first);
    fireEvent.keyDown(first, { key: 'End' });
    const node = screen.getByRole('treeitem', { name: 'Falsy node' });
    expect(document.activeElement).to.equal(node);
    fireEvent.keyDown(node, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [value] : value, expect.anything());
  });

  it.each([0, ''])('selects value %j with custom data keys', value => {
    const onChange = vi.fn();
    render(
      <Component
        data={[{ title: 'Falsy node', code: value }]}
        valueKey="code"
        labelKey="title"
        defaultOpen
        searchable={false}
        onChange={onChange}
      />
    );
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('treeitem', { name: 'Falsy node' }), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(multiple ? [value] : value, expect.anything());
  });

  it.each([0, ''])('skips disabled value %j', value => {
    const onChange = vi.fn();
    render(
      <Component
        data={[
          { label: 'Falsy node', value },
          { label: 'Other node', value: 'other' }
        ]}
        disabledItemValues={[value]}
        defaultOpen
        searchable={false}
        onChange={onChange}
      />
    );
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    const node = screen.getByRole('treeitem', { name: 'Other node' });
    expect(document.activeElement).to.equal(node);
    fireEvent.keyDown(node, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      multiple ? ['other'] : 'other',
      expect.anything()
    );
  });
});
