import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import Cascader from '../../../Cascader';
import '../../../Cascader/styles/index.scss';

describe('Cascader keyboard layer compatibility', () => {
  it.each([42, 'child-key'])('returns from child value %s to its parent', async value => {
    const keys: KeyboardEvent[] = [];
    const listener = (event: KeyboardEvent) => keys.push(event);
    document.addEventListener('keydown', listener, true);

    try {
      render(
        <Cascader
          defaultOpen
          data={[
            { label: 'Parent', value: 'parent', children: [{ label: 'Child', value }] },
            { label: 'Last', value: 'last' }
          ]}
        />
      );
      const combobox = screen.getByRole('combobox');
      await act(async () => {
        combobox.focus();
        await userEvent.keyboard('{ArrowDown}');
      });
      await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Parent' })).to.have.focus);
      await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Child' })).to.be.visible);
      await act(async () => userEvent.keyboard('{ArrowRight}'));
      await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Child' })).to.have.focus);
      await act(async () => userEvent.keyboard('{ArrowLeft}'));
      await waitFor(() => expect(screen.getByRole('treeitem', { name: 'Parent' })).to.have.focus);
      expect(keys.every(event => event.isTrusted)).to.be.true;
      expect(keys.filter(event => event.key.startsWith('Arrow')).length).to.equal(3);
    } finally {
      document.removeEventListener('keydown', listener, true);
    }
  });
});
