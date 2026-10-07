import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import Tree from '..';
import CheckTree from '../../CheckTree';
import TreePicker from '../../TreePicker';
import CheckTreePicker from '../../CheckTreePicker';
import '../styles/index.scss';
import '../../CheckTree/styles/index.scss';
import '../../TreePicker/styles/index.scss';
import '../../CheckTreePicker/styles/index.scss';

describe.each([
  { name: 'Tree', Component: Tree, multiple: false },
  { name: 'CheckTree', Component: CheckTree, multiple: true },
  { name: 'TreePicker', Component: TreePicker, multiple: false },
  { name: 'CheckTreePicker', Component: CheckTreePicker, multiple: true }
])('$name native falsy keyboard values', ({ Component, multiple }) => {
  it.each(
    [false, true].flatMap(virtualized => [0, '', 'normal'].map(value => ({ virtualized, value })))
  )(
    'selects $value after ArrowDown using native focus (virtualized: $virtualized)',
    async ({ virtualized, value }) => {
      const onChange = vi.fn();
      render(
        <Component
          data={[
            { label: 'Falsy node', value },
            { label: 'Other node', value: 'other' }
          ]}
          defaultOpen
          searchable={false}
          virtualized={virtualized}
          onChange={onChange}
        />
      );
      await act(async () => {
        screen.getByRole('treeitem', { name: 'Other node' }).focus();
        await userEvent.keyboard('{ArrowDown}');
      });
      expect(screen.getByRole('treeitem', { name: 'Falsy node' })).to.have.focus;
      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(
        multiple ? [value] : value,
        expect.anything()
      );
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
    }
  );
});

describe('Tree native keyboard focus after mouse selection', () => {
  it.each([false, true].flatMap(virtualized => [0, '', 2].map(value => ({ virtualized, value }))))(
    'selects the focused $value after ArrowUp (virtualized: $virtualized)',
    async ({ virtualized, value }) => {
      const onChange = vi.fn();
      render(
        <Tree
          data={[
            { label: 'Destination node', value },
            { label: 'Other node', value: 1 }
          ]}
          virtualized={virtualized}
          onChange={onChange}
        />
      );
      await act(async () => {
        await userEvent.click(screen.getByRole('treeitem', { name: 'Other node' }));
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(1, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      expect(screen.getByRole('treeitem', { name: 'Other node' })).to.have.focus;
      expect(screen.getByRole('treeitem', { name: 'Other node' })).to.have.attribute(
        'aria-selected',
        'true'
      );
      onChange.mockClear();

      await act(async () => {
        await userEvent.keyboard('{ArrowUp}');
      });
      const destination = screen.getByRole('treeitem', { name: 'Destination node' });
      expect(destination).to.have.focus;
      expect(destination).to.have.attribute('aria-selected', 'false');
      expect(onChange).not.toHaveBeenCalled();

      await act(async () => {
        await userEvent.keyboard('{Enter}');
      });
      expect(onChange).toHaveBeenCalledExactlyOnceWith(value, expect.anything());
      expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      expect(screen.getByRole('treeitem', { name: 'Destination node' })).to.have.attribute(
        'aria-selected',
        'true'
      );
    }
  );
});
