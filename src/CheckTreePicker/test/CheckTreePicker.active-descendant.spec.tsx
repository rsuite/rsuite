import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CheckTreePicker from '..';
import '../styles/index.scss';

describe.each([false, true])('mounted active descendant (virtual=%s)', virtualized => {
  const data = [
    { label: 'First row', value: 'first' },
    { label: 'Target row', value: 'target' },
    { label: 'Last row', value: 'last' }
  ];

  it('preserves an explicitly supplied active descendant', async () => {
    render(
      <CheckTreePicker
        defaultOpen
        data={data}
        virtualized={virtualized}
        aria-activedescendant="caller-owned-row"
      />
    );
    const toggle = screen.getByRole('combobox');
    act(() => toggle.focus());
    fireEvent.keyDown(toggle, { key: 'ArrowDown' });
    await waitFor(() => expect(screen.getByRole('treeitem', { name: 'First row' })).toHaveFocus());
    expect(toggle).toHaveAttribute('aria-activedescendant', 'caller-owned-row');
  });

  it('keeps separately mounted picker references isolated', async () => {
    render(
      <>
        <CheckTreePicker defaultOpen data={data} virtualized={virtualized} aria-label="First" />
        <CheckTreePicker
          defaultOpen
          data={[{ label: 'Other row', value: 'first' }]}
          virtualized={virtualized}
          aria-label="Second"
        />
      </>
    );
    const first = screen.getByRole('combobox', { name: 'First' });
    const second = screen.getByRole('combobox', { name: 'Second' });
    act(() => first.focus());
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    await waitFor(() =>
      expect(first).toHaveAttribute(
        'aria-activedescendant',
        screen.getByRole('treeitem', { name: 'First row' }).id
      )
    );
    expect(second).not.toHaveAttribute('aria-activedescendant');
    act(() => second.focus());
    fireEvent.keyDown(second, { key: 'ArrowDown' });
    await waitFor(() =>
      expect(second).toHaveAttribute(
        'aria-activedescendant',
        screen.getByRole('treeitem', { name: 'Other row' }).id
      )
    );
    expect(first.getAttribute('aria-activedescendant')).not.toBe(
      second.getAttribute('aria-activedescendant')
    );
  });

  it('clears a focused row removed by a controlled search', async () => {
    const { rerender } = render(
      <CheckTreePicker defaultOpen data={data} virtualized={virtualized} searchKeyword="" />
    );
    const toggle = screen.getByRole('combobox');
    act(() => toggle.focus());
    fireEvent.keyDown(toggle, { key: 'ArrowDown' });
    await waitFor(() => {
      const row = screen.getByRole('treeitem', { name: 'First row' });
      expect(row).toHaveFocus();
      expect(toggle).toHaveAttribute('aria-activedescendant', row.id);
    });
    rerender(
      <CheckTreePicker defaultOpen data={data} virtualized={virtualized} searchKeyword="Target" />
    );
    await waitFor(() => {
      expect(screen.queryByRole('treeitem', { name: 'First row' })).toBeNull();
      expect(toggle).not.toHaveAttribute('aria-activedescendant');
    });
  });

  it('clears a focused row removed by the owner data update', async () => {
    const { rerender } = render(
      <CheckTreePicker defaultOpen data={data} virtualized={virtualized} />
    );
    const toggle = screen.getByRole('combobox');
    act(() => toggle.focus());
    fireEvent.keyDown(toggle, { key: 'ArrowDown' });
    await waitFor(() => {
      const row = screen.getByRole('treeitem', { name: 'First row' });
      expect(row).toHaveFocus();
      expect(toggle).toHaveAttribute('aria-activedescendant', row.id);
    });
    rerender(<CheckTreePicker defaultOpen data={data.slice(1)} virtualized={virtualized} />);
    await waitFor(() => {
      expect(screen.queryByRole('treeitem', { name: 'First row' })).toBeNull();
      expect(toggle).not.toHaveAttribute('aria-activedescendant');
    });
  });
});
