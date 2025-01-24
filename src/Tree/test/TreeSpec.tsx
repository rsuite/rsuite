import React from 'react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockTreeData } from '@test/mocks/data-mock';
import Tree from '../Tree';
import { ListHandle } from '@/internals/Windowing';
import { testStandardProps } from '@test/utils';

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

    expect(screen.getByRole('tree')).to.have.style('height', '360px');

    rerender(<Tree data={data} height={100} />);

    expect(screen.getByRole('tree')).to.have.style('height', '100px');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <Tree data={data} onSelectItem={onSelectItem} expandItemValues={['Master', 'tester1']} />
    );

    userEvent.click(screen.getByRole('treeitem', { name: 'tester2' }));

    expect(onSelectItem).to.have.been.calledWithMatch({ value: 'tester2' }, [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  it('Should call `onSelect` callback', () => {
    const onSelect = sinon.spy();

    render(<Tree data={data} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));

    expect(onSelect).to.have.been.calledWith(sinon.match({ value: 'Master' }));
  });

  it('Should not call `onSelect` callback when the item is disabled', () => {
    const onSelect = sinon.spy();

    render(<Tree data={data} onSelect={onSelect} disabledItemValues={['Master']} />);

    fireEvent.click(screen.getByRole('treeitem', { name: 'Master' }));

    expect(onSelect).to.not.have.been.called;
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
    it('Should call `onSearch` callback', () => {
      const onSearch = sinon.spy();
      render(<Tree data={data} onSearch={onSearch} searchable />);
      const input = screen.getByRole('searchbox');

      userEvent.type(input, 'tester');

      expect(onSearch).to.have.been.calledWith('tester');
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
      const onDragStart = sinon.spy();
      render(<Tree data={data} onDragStart={onDragStart} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragStart(treeNode);

      expect(onDragStart).to.have.calledOnce;
      expect(onDragStart).to.have.calledWithMatch({ value: 'Master' });

      expect(treeNode).to.have.contain('.rs-tree-node-dragging');
    });

    it('Should call `onDragEnter` callback', () => {
      const onDragEnter = sinon.spy();
      render(<Tree data={data} onDragEnter={onDragEnter} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragEnter(treeNode);

      expect(onDragEnter).to.have.calledOnce;
      expect(onDragEnter).to.have.calledWithMatch({ value: 'Master' });
    });

    it('Should call `onDragOver` callback', () => {
      const onDragOver = sinon.spy();
      render(<Tree data={data} onDragOver={onDragOver} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragOver(treeNode);

      expect(onDragOver).to.have.calledOnce;
      expect(onDragOver).to.have.calledWithMatch({ value: 'Master' });
    });

    it('Should call `onDragLeave` callback', () => {
      const onDragLeave = sinon.spy();
      render(<Tree data={data} onDragLeave={onDragLeave} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragLeave(treeNode);

      expect(onDragLeave).to.have.calledOnce;
      expect(onDragLeave).to.have.calledWithMatch({ value: 'Master' });
    });

    it('Should call `onDragEnd` callback', () => {
      const onDragEnd = sinon.spy();
      render(<Tree data={data} onDragEnd={onDragEnd} draggable />);
      const treeNode = screen.getAllByRole('treeitem')[0];

      fireEvent.dragEnd(treeNode);

      expect(onDragEnd).to.have.calledOnce;
      expect(onDragEnd).to.have.calledWithMatch({ value: 'Master' });
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
        const onDrop = sinon.spy();
        render(<Tree data={data} onDrop={onDrop} draggable defaultExpandAll />);
        const dragTreeNode = screen.getByRole('treeitem', { name: 'tester0' });
        const dropTreeNode = screen.getByRole('treeitem', { name: 'tester1' });

        fireEvent.dragStart(dragTreeNode);
        fireEvent.drop(dropTreeNode);

        expect(onDrop).to.have.calledOnce;

        const { dragNode } = onDrop.firstCall.firstArg;

        // make sure dragNode hasn't cyclic object
        JSON.stringify(dragNode);
      }).to.not.throw();
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
      const onScroll = sinon.spy();
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
      expect(onScroll).to.have.calledOnce;
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
