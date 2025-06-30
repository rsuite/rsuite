import React from 'react';
import userEvent from '@testing-library/user-event';
import Tree from '../Tree';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import { ListHandle } from '@/internals/Windowing';
import { testStandardProps } from '@test/cases';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('Tree', () => {
  testStandardProps(<Tree data={data} />);

  it('Should render a tree', () => {
    const { container } = render(<Tree data={data} />);

    expect(container.firstChild).to.have.class('rs-tree');
    expect(screen.getByRole('tree')).to.exist;
  });

  it('Should set a height for the Tree', () => {
    const { rerender } = render(<Tree data={data} />);

    expect(screen.getByRole('tree')).to.have.attr('style', '--rs-tree-view-height: 360px;');

    rerender(<Tree data={data} height={100} />);

    expect(screen.getByRole('tree')).to.have.attr('style', '--rs-tree-view-height: 100px;');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = vi.fn();

    render(
      <Tree data={data} onSelectItem={onSelectItem} expandItemValues={['Master', 'tester1']} />
    );

    userEvent.click(screen.getByRole('treeitem', { name: 'tester2' }));

    expect(onSelectItem).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'tester2' }),
      expect.arrayContaining([
        expect.objectContaining({ value: 'Master' }),
        expect.objectContaining({ value: 'tester1' }),
        expect.objectContaining({ value: 'tester2' })
      ])
    );
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = vi.fn();
    render(<Tree data={data} onSelect={onSelect} />);

    userEvent.click(screen.getByRole('treeitem', { name: 'Master' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    // Check the first argument of the first call
    expect(onSelect.mock.calls[0][0]).toMatchObject({ value: 'Master' });
  });

  it('Should not call `onSelect` callback when the item is disabled', () => {
    const onSelect = vi.fn();

    render(<Tree data={data} onSelect={onSelect} disabledItemValues={['Master']} />);

    fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Should show indent line', () => {
    render(<Tree data={data} showIndentLine />);

    expect(screen.queryAllByTestId('indent-line')).to.have.length(2);
  });

  it('Should async load children nodes', async () => {
    const data = [
      {
        label: 'Master',
        value: 'Master'
      },
      {
        label: 'async',
        value: 'async',
        children: []
      }
    ];

    const fetchNodes = () => {
      return new Promise<any>(resolve => {
        setTimeout(() => resolve([{ label: 'children1', value: 'children1' }]), 500);
      });
    };

    render(<Tree data={data} defaultExpandAll getChildren={fetchNodes} />);

    fireEvent.click(screen.getByRole('button', { name: 'Expand async' }));

    expect(screen.getByRole('button', { name: 'Collapse async' })).to.have.attribute('aria-busy');

    await waitFor(() => {
      expect(screen.getByRole('treeitem', { name: 'children1' })).to.exist;
      expect(screen.getByRole('button', { name: 'Collapse async' })).to.not.have.attribute(
        'aria-busy'
      );
    });
  });

  describe('Searchable', () => {
    it('Should call `onSearch` callback', async () => {
      const onSearch = vi.fn();
      render(<Tree data={data} onSearch={onSearch} searchable />);
      const input = screen.getByRole('searchbox');

      // Use await with userEvent.type
      await userEvent.type(input, 'tester');

      // The callback is called with the value and event
      expect(onSearch).toHaveBeenCalled();
      // Check the first argument of the last call
      expect(onSearch.mock.calls[onSearch.mock.calls.length - 1][0]).toBe('tester');
    });

    it('Should filter the tree when searching', () => {
      render(<Tree data={data} searchable />);
      const input = screen.getByRole('searchbox');

      userEvent.type(input, 'tester0');

      expect(screen.queryByRole('treeitem', { name: 'tester0' })).to.exist;
      expect(screen.queryByRole('treeitem', { name: 'tester1' })).to.not.exist;
      expect(screen.queryByRole('treeitem', { name: 'tester2' })).to.not.exist;
    });

    it('Should show the empty message when no search results are found', () => {
      render(<Tree data={data} searchable />);
      const input = screen.getByRole('searchbox');

      userEvent.type(input, 'No');

      expect(screen.getByText('No results found')).to.exist;
    });
  });

  describe('Draggable', () => {
    it('Should render draggable tree nodes', () => {
      render(<Tree data={data} draggable />);

      screen.getAllByRole('treeitem').forEach(treeNode => {
        expect(treeNode).to.have.attribute('draggable', 'true');
      });
    });

    it('Should call `onDragStart` callback', () => {
      const onDragStart = vi.fn();
      render(<Tree data={data} onDragStart={onDragStart} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragStart(treeNode);

      expect(onDragStart).toHaveBeenCalledTimes(1);
      // The first argument is the node, second is the event
      expect(onDragStart.mock.calls[0][0]).toMatchObject({ value: 'Master' });

      expect(treeNode).to.have.contain('.rs-tree-node-dragging');
    });

    it('Should call `onDragEnter` callback', () => {
      const onDragEnter = vi.fn();
      render(<Tree data={data} onDragEnter={onDragEnter} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragEnter(treeNode);

      expect(onDragEnter).toHaveBeenCalledTimes(1);
      // The first argument is the node, second is the event
      expect(onDragEnter.mock.calls[0][0]).toMatchObject({ value: 'Master' });
    });

    it('Should call `onDragOver` callback', () => {
      const onDragOver = vi.fn();
      render(<Tree data={data} onDragOver={onDragOver} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragOver(treeNode);

      expect(onDragOver).toHaveBeenCalledTimes(1);
      // The first argument is the node, second is the event
      expect(onDragOver.mock.calls[0][0]).toMatchObject({ value: 'Master' });
    });

    it('Should call `onDragLeave` callback', () => {
      const onDragLeave = vi.fn();
      render(<Tree data={data} onDragLeave={onDragLeave} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragLeave(treeNode);

      expect(onDragLeave).toHaveBeenCalledTimes(1);
      // The first argument is the node, second is the event
      expect(onDragLeave.mock.calls[0][0]).toMatchObject({ value: 'Master' });
    });

    it('Should call `onDragEnd` callback', () => {
      const onDragEnd = vi.fn();
      render(<Tree data={data} onDragEnd={onDragEnd} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragEnd(treeNode);

      expect(onDragEnd).toHaveBeenCalledTimes(1);
      // The first argument is the node, second is the event
      expect(onDragEnd.mock.calls[0][0]).toMatchObject({ value: 'Master' });
    });

    it('Should display drag Preview when dragging, and remove after drop', () => {
      render(<Tree data={data} draggable />);
      const treeNode = screen.getByText('tester1') as HTMLElement;
      fireEvent.dragStart(treeNode);

      expect(screen.getByTestId('drag-preview')).to.have.text('tester1');

      fireEvent.drop(treeNode);

      expect(screen.queryByTestId('drag-preview')).to.not.exist;
    });

    it('Should call `onDrop` callback without exception', () => {
      expect(() => {
        const onDrop = vi.fn();
        render(<Tree data={data} onDrop={onDrop} draggable defaultExpandAll />);
        const dragTreeNode = screen.getByRole('treeitem', { name: 'tester0' });
        const dropTreeNode = screen.getByRole('treeitem', { name: 'tester1' });

        fireEvent.dragStart(dragTreeNode);
        fireEvent.drop(dropTreeNode);

        expect(onDrop).toHaveBeenCalledTimes(1);

        // Get the first argument passed to onDrop
        const dropArgs = onDrop.mock.calls[0][0];
        const { dragNode } = dropArgs;

        // make sure dragNode hasn't cyclic object
        JSON.stringify(dragNode);
      }).not.toThrow();
    });
  });

  describe('Accessibility - Keyboard interactions', () => {
    it('Should focus the next item when pressing the down arrow key', () => {
      render(<Tree data={data} />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowDown' });

      expect(treeItems[0]).to.have.focus;
    });

    it('Should focus the previous item when pressing the up arrow key', () => {
      render(<Tree data={data} defaultExpandAll />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowUp' });
      fireEvent.keyDown(tree, { key: 'ArrowUp' });

      expect(treeItems[treeItems.length - 1]).to.have.focus;
    });

    it('Should expand the item when pressing the right arrow key', () => {
      render(<Tree data={data} />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(treeItems[0]);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowRight' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'true');
    });

    it('Should collapse the item when pressing the left arrow key', () => {
      render(<Tree data={data} defaultExpandAll />);

      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.click(treeItems[0]);
      fireEvent.keyDown(treeItems[0], { key: 'ArrowLeft' });

      expect(treeItems[0]).to.have.attribute('aria-expanded', 'false');
    });

    it('Should select the item when pressing the enter key', () => {
      render(<Tree data={data} defaultExpandAll />);
      const tree = screen.getByRole('tree');
      const treeItems = screen.getAllByRole('treeitem');

      fireEvent.keyDown(tree, { key: 'ArrowDown' });
      fireEvent.keyDown(tree, { key: 'Enter' });

      expect(treeItems[0]).to.have.attribute('aria-selected', 'true');
    });

    describe('With virtualized', () => {
      it('Should focus the next item when pressing the down arrow key ', () => {
        render(<Tree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.class('rs-tree-node-focus');
      });

      it('Should focus the previous item when pressing the up arrow key ', () => {
        render(<Tree data={data} defaultExpandAll virtualized />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowUp' });
        fireEvent.keyDown(tree, { key: 'ArrowUp' });

        const treeItems = screen.getAllByRole('treeitem');

        expect(treeItems[treeItems.length - 1]).to.have.focus;
      });

      it('Should expand the item when pressing the right arrow key', () => {
        render(<Tree data={data} virtualized defaultExpandAll />);

        fireEvent.click(screen.getAllByRole('treeitem')[0]);
        fireEvent.keyDown(screen.getAllByRole('treeitem')[0], { key: 'ArrowRight' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-expanded', 'true');
      });

      it('Should collapse the item when pressing the left arrow key', () => {
        render(<Tree data={data} virtualized defaultExpandAll />);

        fireEvent.click(screen.getAllByRole('treeitem')[0]);
        fireEvent.keyDown(screen.getAllByRole('treeitem')[0], { key: 'ArrowLeft' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-expanded', 'false');
      });

      it('Should select the item when pressing the enter key', () => {
        render(<Tree data={data} virtualized defaultExpandAll />);
        const tree = screen.getByRole('tree');

        fireEvent.keyDown(tree, { key: 'ArrowDown' });
        fireEvent.keyDown(tree, { key: 'Enter' });

        expect(screen.getAllByRole('treeitem')[0]).to.have.attribute('aria-selected', 'true');
      });
    });
  });

  describe('Virtualized', () => {
    it('Should set a height for the Tree with virtualized', () => {
      render(<Tree data={data} virtualized height={100} />);

      expect(screen.getByRole('tree').querySelector('.rs-tree-virt-list')).to.have.style(
        'height',
        '100px'
      );
    });

    it('Should scroll the list by `scrollToRow`', () => {
      const onScroll = vi.fn();
      const ref = React.createRef<ListHandle>();
      render(
        <Tree
          data={data}
          listRef={ref}
          virtualized
          style={{ height: 30 }}
          listProps={{ onScroll }}
        />
      );
      ref.current?.scrollToItem?.(2);
      expect(onScroll).toHaveBeenCalledTimes(1);
    });
  });

  describe('Scroll Shadows', () => {
    it('Should hava a scroll shadow', () => {
      render(<Tree data={data} scrollShadow height={100} />);

      expect(screen.getByRole('tree')).to.have.class('rs-scroll-view-shadow');
    });

    it('Should hava a scroll shadow with virtualized', () => {
      render(<Tree data={data} scrollShadow height={100} virtualized />);

      expect(screen.getByRole('tree')).to.not.have.class('rs-scroll-view-shadow');
      expect(screen.getByTestId('scroll-view')).to.have.class('rs-scroll-view-shadow');
    });
  });
});
