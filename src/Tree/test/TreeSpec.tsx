/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import Tree from '../Tree';
import { PickerHandle } from '../../internals/Picker';
import { ListHandle } from '../../internals/Windowing';
import userEvent from '@testing-library/user-event';
import { mockTreeData } from '@test/mocks/data-mock';
import { testStandardProps } from '@test/utils';

const data = mockTreeData([['Master', 'tester0', ['tester1', 'tester2']], 'disabled']);

describe('Tree', () => {
  testStandardProps(<Tree data={data} />);

  it('Should render a tree', () => {
    render(<Tree data={data} />);

    expect(screen.getByRole('tree')).to.have.class('rs-tree');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <Tree data={data} onSelectItem={onSelectItem} expandItemValues={['Master', 'tester1']} />
    );

    // TODO-Doma
    // Use `treeitem` role
    userEvent.click(screen.getByRole('button', { name: 'tester2' }));

    expect(onSelectItem).to.have.been.calledWithMatch({ value: 'tester2' }, [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStart = sinon.spy();
    render(<Tree data={data} onDragStart={onDragStart} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragStart(treeNode);

    expect(onDragStart).to.have.calledOnce;
    expect(onDragStart).to.have.calledWithMatch({ value: 'Master' });
    expect(treeNode.querySelector('.rs-tree-node-dragging')).to.exist;
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnter = sinon.spy();
    render(<Tree data={data} onDragEnter={onDragEnter} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragEnter(treeNode);
    assert.isTrue(onDragEnter.calledOnce);
    assert.equal(onDragEnter.firstCall.firstArg.value, 'Master');

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

    expect(document.querySelector('.rs-tree-drag-preview')).to.have.text('tester1');

    fireEvent.drop(treeNode);

    expect(document.querySelector('.rs-tree-drag-preview')).to.be.a('null');
  });

  it('Should call `onDrop` callback without exception', () => {
    expect(() => {
      const onDropSpy = sinon.spy();
      render(<Tree data={data} onDrop={onDropSpy} draggable defaultExpandAll />);
      const dragTreeNode = screen.getByRole('treeitem', { name: 'tester0' });
      const dropTreeNode = screen.getByRole('treeitem', { name: 'tester1' });

      fireEvent.dragStart(dragTreeNode);
      fireEvent.drop(dropTreeNode);
      assert.isTrue(onDropSpy.calledOnce);
      const { dragNode } = onDropSpy.firstCall.firstArg;
      // make sure dragNode hasn't cyclic object
      JSON.stringify(dragNode);
    }).to.not.throw();
  });

  it('Should catch the not set virtualized exception', () => {
    expect(() => {
      const ref = React.createRef<PickerHandle>();
      // FIXME `ref` should be type Ref<PickerHandle>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(<Tree data={data} ref={ref} />);
      (ref.current as PickerHandle).list;
    }).to.throw('The list is not found, please set `virtualized` for the component.');
  });

  it('Should scroll the list by `scrollToRow`', () => {
    const onScroll = sinon.spy();
    const ref = React.createRef<PickerHandle>();
    render(
      <Tree
        data={data}
        // FIXME `ref` should be type Ref<PickerHandle>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        virtualized
        style={{ height: 30 }}
        listProps={{ onScroll }}
      />
    );
    ((ref.current as PickerHandle).list as ListHandle).scrollToRow?.(2);

    expect(onScroll).to.have.calledOnce;
  });

  it('Should show indent line', () => {
    render(<Tree data={data} showIndentLine />);

    const lines = screen.getByRole('tree').querySelectorAll('.rs-tree-indent-line');

    expect(lines).to.have.length(2);
    expect(lines[0]).to.have.style('left', '44px');
    expect(lines[1]).to.have.style('left', '28px');
  });
});
