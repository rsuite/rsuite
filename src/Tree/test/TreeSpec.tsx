import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import Tree from '../Tree';
import { PickerHandle } from '../../Picker';
import { ListHandle } from '../../Windowing';
import userEvent from '@testing-library/user-event';

const data = [
  {
    label: 'Master',
    value: 'Master',
    children: [
      {
        label: 'tester0',
        value: 'tester0'
      },
      {
        label: 'tester1',
        value: 'tester1',
        children: [
          {
            label: 'tester2',
            value: 'tester2'
          }
        ]
      }
    ]
  },
  {
    label: 'Disabled node',
    value: 'disabled'
  }
];

describe('Tree', () => {
  it('Should render a tree', () => {
    const instance = getDOMNode(<Tree data={data} />);

    assert.include(instance.className, 'rs-tree');
    assert.equal(instance.getAttribute('role'), 'tree');
  });

  it('Should call `onSelectItem` callback with the selected item and the full path', () => {
    const onSelectItem = sinon.spy();

    render(
      <Tree data={data} onSelectItem={onSelectItem} expandItemValues={['Master', 'tester1']} />
    );

    // TODO-Doma
    // Use `treeitem` role
    userEvent.click(screen.getByRole('button', { name: 'tester2' }));

    expect(onSelectItem).to.have.been.calledWith(sinon.match({ value: 'tester2' }), [
      sinon.match({ value: 'Master' }),
      sinon.match({ value: 'tester1' }),
      sinon.match({ value: 'tester2' })
    ]);
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    render(<Tree data={data} onDragStart={onDragStartSpy} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragStart(treeNode);

    assert.isTrue(onDragStartSpy.calledOnce);
    // eslint-disable-next-line testing-library/no-node-access
    assert.isNotNull(treeNode.querySelector('.rs-tree-node-dragging'));
    assert.equal(onDragStartSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    render(<Tree data={data} onDragEnter={onDragEnterSpy} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragEnter(treeNode);
    assert.isTrue(onDragEnterSpy.calledOnce);
    assert.equal(onDragEnterSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    render(<Tree data={data} onDragOver={onDragOverSpy} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragOver(treeNode);
    assert.isTrue(onDragOverSpy.calledOnce);
    assert.equal(onDragOverSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragLeave` callback', () => {
    const onDragLeaveSpy = sinon.spy();
    render(<Tree data={data} onDragLeave={onDragLeaveSpy} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragLeave(treeNode);
    assert.isTrue(onDragLeaveSpy.calledOnce);
    assert.equal(onDragLeaveSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEndSpy = sinon.spy();
    render(<Tree data={data} onDragEnd={onDragEndSpy} draggable />);
    const treeNode = screen.getAllByRole('treeitem')[0];

    fireEvent.dragEnd(treeNode);
    assert.isTrue(onDragEndSpy.calledOnce);
    assert.equal(onDragEndSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should display drag Preview when dragging, and remove after drop', () => {
    render(<Tree data={data} draggable />);
    const treeNode = screen.getByText('tester1') as HTMLElement;
    fireEvent.dragStart(treeNode);
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('.rs-tree-drag-preview')?.textContent).to.equal('tester1');
    fireEvent.drop(treeNode);
    // eslint-disable-next-line testing-library/no-node-access
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
    const onScrollSpy = sinon.spy();
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
        listProps={{
          onScroll: onScrollSpy
        }}
      />
    );
    ((ref.current as PickerHandle).list as ListHandle).scrollToRow?.(2);
    assert.isTrue(onScrollSpy.calledOnce);
  });

  it('Should show indent line', () => {
    const instance = getDOMNode(<Tree data={data} showIndentLine />);

    // eslint-disable-next-line testing-library/no-node-access
    const lines = instance.querySelectorAll('.rs-tree-indent-line');

    // eslint-disable-next-line testing-library/no-node-access
    assert.isNotNull(instance.querySelector('.rs-tree-indent-line'));
    assert.equal(lines.length, 2);
    assert.equal((lines[0] as HTMLElement).style.left, '44px');
    assert.equal((lines[1] as HTMLElement).style.left, '28px');
  });
});
