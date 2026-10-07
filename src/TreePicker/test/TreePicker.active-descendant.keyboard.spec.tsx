import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import TreePicker from '..';
import CheckTreePicker from '../../CheckTreePicker';
import '../styles/index.scss';
import '../../CheckTreePicker/styles/index.scss';

const nodes = [
  { value: 1, label: 'Numeric one' },
  { value: 0, label: 'Numeric zero' },
  { value: '', label: 'Empty string' },
  { value: '1', label: 'String one' }
];
const components = [
  { name: 'TreePicker', Component: TreePicker, multiple: false },
  { name: 'CheckTreePicker', Component: CheckTreePicker, multiple: true }
];
async function nativeKey(key: string) {
  await act(async () => {
    await userEvent.keyboard(`{${key}}`);
  });
}

describe.each(components)('$name tree active descendant', ({ name, Component, multiple }) => {
  describe.each([false, true])('virtualized=%s', virtualized => {
    it.each(nodes)('links keyboard focus to $label before one Enter selection', async target => {
      const onChange = vi.fn();
      const keys: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => keys.push(event);
      render(
        <Component
          id={`active-descendant-${name}`}
          data={nodes.map(node => ({ ...node }))}
          virtualized={virtualized}
          defaultOpen
          searchable={false}
          treeHeight={180}
          listProps={{ height: 180, itemSize: 36 }}
          onChange={onChange}
        />
      );
      const first = screen.getByRole('treeitem', { name: 'Numeric one' });
      act(() => first.focus());
      expect(first).to.have.focus;
      document.addEventListener('keydown', capture, true);
      try {
        await nativeKey('Home');
        const index = nodes.findIndex(node => node.label === target.label);
        // Each target independently exercises native Home and the necessary ArrowDown steps.
        for (let step = 0; step < index; step++) await nativeKey('ArrowDown');
        const row = screen.getByRole('treeitem', { name: target.label });
        await waitFor(() => {
          const active = document.activeElement;
          const inputFocus =
            active?.getAttribute('role') === 'searchbox' ||
            active?.getAttribute('role') === 'combobox';
          expect(active === row || inputFocus, 'keyboard focus remains on the target or its input')
            .to.be.true;
        });
        expect(onChange).not.toHaveBeenCalled();
        expect(keys.map(event => event.key)).to.deep.equal([
          'Home',
          ...Array(index).fill('ArrowDown')
        ]);
        expect(keys.every(event => event.isTrusted)).to.be.true;
        const combobox = screen.getByRole('combobox');
        expect(combobox).to.have.attribute('aria-expanded', 'true');
        const popupId = combobox.getAttribute('aria-controls');
        expect(popupId, 'expanded combobox controls its current tree popup').to.be.a('string').and
          .not.empty;
        const popup = document.getElementById(popupId!);
        expect(popup).to.have.attribute('role', 'tree');
        expect(popup!.contains(row), 'target belongs to the currently controlled popup').to.be.true;
        const rowBounds = row.getBoundingClientRect();
        const popupBounds = popup!.getBoundingClientRect();
        expect(rowBounds.height).to.be.greaterThan(0);
        expect(rowBounds.bottom).to.be.greaterThan(popupBounds.top);
        expect(rowBounds.top).to.be.lessThan(popupBounds.bottom);
        const activeId = combobox.getAttribute('aria-activedescendant');
        expect(
          activeId,
          'expanded combobox has a nonempty active descendant for the target'
        ).to.be.a('string').and.not.empty;
        expect(
          document.getElementById(activeId!),
          'active descendant resolves to the current target treeitem'
        ).to.equal(row);
        expect(
          popup!.contains(document.getElementById(activeId!)),
          'active descendant belongs to the controlled popup'
        ).to.be.true;
        expect(
          Array.from(document.querySelectorAll('[id]')).filter(element => element.id === activeId),
          'active descendant ID is unique'
        ).to.have.length(1);
        expect(row.isConnected).to.be.true;
        const physicalFocus = document.activeElement;
        if (physicalFocus?.getAttribute('role') === 'treeitem') expect(physicalFocus).to.equal(row);
        await nativeKey('Enter');
        expect(onChange).toHaveBeenCalledExactlyOnceWith(
          multiple ? [target.value] : target.value,
          expect.anything()
        );
        expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      } finally {
        document.removeEventListener('keydown', capture, true);
      }
    });
  });
});
