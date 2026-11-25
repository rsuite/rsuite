import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tree from '../Tree';
import CheckTree from '../../CheckTree';

const data = [
  { label: 'Alpha', value: 'alpha', category: 'first' },
  { label: 'Beta', value: 'beta', category: 'second' }
];

describe.each([
  ['Tree', Tree],
  ['CheckTree', CheckTree]
] as const)('%s search predicate updates', (_name, Component) => {
  it.each([false, true])(
    'refreshes matching nodes when only searchBy changes (virtualized=%s)',
    async virtualized => {
      const onSearch = vi.fn();
      const { rerender } = render(
        <Component
          data={data}
          searchKeyword="needle"
          searchBy={(_keyword, _label, item) => item.category === 'first'}
          virtualized={virtualized}
          onSearch={onSearch}
        />
      );

      const tree = within(screen.getByRole('tree'));
      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Alpha' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Beta' })).not.to.exist;
      });

      rerender(
        <Component
          data={data}
          searchKeyword="needle"
          searchBy={(_keyword, _label, item) => item.category === 'second'}
          virtualized={virtualized}
          onSearch={onSearch}
        />
      );

      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Beta' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Alpha' })).not.to.exist;
      });
      expect(onSearch).not.toHaveBeenCalled();
    }
  );

  it.each([false, true])(
    'updates visible ancestors with custom field names (virtualized=%s)',
    async virtualized => {
      const nested = [
        {
          id: 'group-a',
          title: 'Group A',
          nodes: [{ id: 'a', title: 'Alpha', category: 'first' }]
        },
        { id: 'group-b', title: 'Group B', nodes: [{ id: 'b', title: 'Beta', category: 'second' }] }
      ];
      const props = {
        data: nested,
        labelKey: 'title',
        valueKey: 'id',
        childrenKey: 'nodes',
        searchKeyword: 'needle',
        virtualized
      };
      const { rerender } = render(
        <Component {...props} searchBy={(_keyword, _label, item) => item.category === 'first'} />
      );
      const tree = within(screen.getByRole('tree'));
      await waitFor(() => expect(tree.getByRole('treeitem', { name: 'Alpha' })).to.exist);

      rerender(
        <Component {...props} searchBy={(_keyword, _label, item) => item.category === 'second'} />
      );

      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Group B' })).to.exist;
        expect(tree.getByRole('treeitem', { name: 'Beta' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Group A' })).not.to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Alpha' })).not.to.exist;
      });
    }
  );

  it.each([false, true])(
    'restores label matching when searchBy is removed (virtualized=%s)',
    async virtualized => {
      const props = { data, searchKeyword: 'Beta', virtualized };
      const { rerender } = render(
        <Component {...props} searchBy={(_keyword, _label, item) => item.category === 'first'} />
      );
      const tree = within(screen.getByRole('tree'));
      await waitFor(() => expect(tree.getByRole('treeitem', { name: 'Alpha' })).to.exist);

      rerender(<Component {...props} />);

      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Beta' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Alpha' })).not.to.exist;
      });
    }
  );

  it.each([false, true])(
    'keeps the entered keyword when searchBy changes (virtualized=%s)',
    async virtualized => {
      const onSearch = vi.fn();
      const props = { data, searchable: true, virtualized, onSearch };
      const { rerender } = render(
        <Component {...props} searchBy={(_keyword, _label, item) => item.category === 'first'} />
      );
      const tree = within(screen.getByRole('tree'));
      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'needle' } });
      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Alpha' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Beta' })).not.to.exist;
      });
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('needle', expect.anything());

      rerender(
        <Component {...props} searchBy={(_keyword, _label, item) => item.category === 'second'} />
      );

      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Beta' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Alpha' })).not.to.exist;
      });
      expect(input).to.have.value('needle');
      expect(onSearch).toHaveBeenCalledTimes(1);
    }
  );

  it.each([false, true])(
    'updates controlled keywords with a stable predicate (virtualized=%s)',
    async virtualized => {
      const searchBy = (keyword: string, label: React.ReactNode) => String(label).includes(keyword);
      const props = { data, searchBy, virtualized };
      const { rerender } = render(<Component {...props} searchKeyword="Alpha" />);
      const tree = within(screen.getByRole('tree'));
      await waitFor(() => expect(tree.getByRole('treeitem', { name: 'Alpha' })).to.exist);

      rerender(<Component {...props} searchKeyword="Beta" />);

      await waitFor(() => {
        expect(tree.getByRole('treeitem', { name: 'Beta' })).to.exist;
        expect(tree.queryByRole('treeitem', { name: 'Alpha' })).not.to.exist;
      });
    }
  );
});
