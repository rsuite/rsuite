import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TreePicker from '..';
import type { PickerHandle } from '@/internals/Picker';
import '../styles/index.scss';

const data = [
  { label: 'Numeric zero', value: 0 },
  { label: 'String zero', value: '0' }
];
const props = {
  id: 'author-tree',
  defaultOpen: true,
  searchable: false,
  treeHeight: 180,
  listProps: { height: 180, itemSize: 36 }
};
async function expectDescendant(label: string) {
  await waitFor(() => {
    const row = screen.getByRole('treeitem', { name: label });
    const id = screen.getByRole('combobox').getAttribute('aria-activedescendant');
    expect(id).to.equal(row.id);
    expect(document.getElementById(id!)).to.equal(row);
  });
}

describe.each([false, true])('TreePicker mounted row IDs virtual=%s', virtualized => {
  it('clears a child hidden by a controlled parent collapse', async () => {
    const nested = [
      { label: 'Parent', value: 'parent', children: [{ label: 'Numeric zero', value: 0 }] }
    ];
    const { rerender } = render(
      <TreePicker
        {...props}
        data={nested}
        virtualized={virtualized}
        defaultValue={0}
        expandItemValues={['parent']}
      />
    );
    await expectDescendant('Numeric zero');
    rerender(
      <TreePicker
        {...props}
        data={nested}
        virtualized={virtualized}
        defaultValue={0}
        expandItemValues={[]}
      />
    );
    await waitFor(
      () => expect(screen.queryByRole('treeitem', { name: 'Numeric zero' })).to.be.null
    );
    expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
  });

  it('clears a focused row that becomes disabled', async () => {
    const { rerender } = render(<TreePicker {...props} data={data} virtualized={virtualized} />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    await expectDescendant('Numeric zero');
    rerender(
      <TreePicker {...props} data={data} virtualized={virtualized} disabledItemValues={[0]} />
    );
    await waitFor(() =>
      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant')
    );
    expect(screen.getByRole('treeitem', { name: 'Numeric zero' })).to.have.attribute(
      'aria-disabled',
      'true'
    );
  });

  it('clears a focused row removed by filtering', async () => {
    const { rerender } = render(<TreePicker {...props} data={data} virtualized={virtualized} />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    await expectDescendant('Numeric zero');
    rerender(
      <TreePicker {...props} data={data} virtualized={virtualized} searchKeyword="Missing" />
    );
    await waitFor(() => expect(screen.queryAllByRole('treeitem')).to.have.length(0));
    expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
  });

  it('clears a focused row removed from owner data', async () => {
    const { rerender } = render(<TreePicker {...props} data={data} virtualized={virtualized} />);
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    await expectDescendant('Numeric zero');
    rerender(<TreePicker {...props} data={[data[1]]} virtualized={virtualized} />);
    await waitFor(
      () => expect(screen.queryByRole('treeitem', { name: 'Numeric zero' })).to.be.null
    );
    expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
  });

  it('hides the descendant when controlled closed while rows still exit', async () => {
    const { rerender } = render(
      <TreePicker {...props} data={data} open virtualized={virtualized} />
    );
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    await expectDescendant('Numeric zero');
    const row = screen.getByRole('treeitem', { name: 'Numeric zero' });
    rerender(<TreePicker {...props} data={data} open={false} virtualized={virtualized} />);
    expect(row.isConnected).to.be.true;
    expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
  });
});

it('preserves the caller active-descendant override', () => {
  render(<TreePicker {...props} data={data} aria-activedescendant="author-row" />);
  fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
  expect(screen.getByRole('combobox')).to.have.attribute('aria-activedescendant', 'author-row');
});

it('clears the active descendant when its virtual row is scrolled out of the mounted window', async () => {
  const picker = React.createRef<PickerHandle>();
  const rows = Array.from({ length: 1000 }, (_, index) => ({
    label: `Node ${index}`,
    value: index
  }));
  render(<TreePicker {...props} ref={picker} data={rows} virtualized />);
  fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
  await expectDescendant('Node 0');
  act(() => picker.current?.list?.scrollToItem?.(999));
  await waitFor(() => expect(screen.queryByRole('treeitem', { name: 'Node 0' })).to.be.null);
  expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
});

it('does not give nil focus to options with literal nullish names', () => {
  render(
    <TreePicker
      {...props}
      data={[
        { label: 'Null', value: 'null' },
        { label: 'Undefined', value: 'undefined' }
      ]}
    />
  );
  expect(screen.getByRole('combobox')).not.to.have.attribute('aria-activedescendant');
});
