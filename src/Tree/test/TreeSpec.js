import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { render } from '@testing-library/react';
import Tree from '../Tree';

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

  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    const instance = getDOMNode(<Tree data={data} onDragStart={onDragStartSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragStart(treeNode);

    assert.isTrue(onDragStartSpy.calledOnce);
    assert.isNotNull(treeNode.querySelector('.rs-tree-node-dragging'));
    assert.equal(onDragStartSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    const instance = getDOMNode(<Tree data={data} onDragEnter={onDragEnterSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragEnter(treeNode);
    assert.isTrue(onDragEnterSpy.calledOnce);
    assert.equal(onDragEnterSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    const instance = getDOMNode(<Tree data={data} onDragOver={onDragOverSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragOver(treeNode);
    assert.isTrue(onDragOverSpy.calledOnce);
    assert.equal(onDragOverSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragLeave` callback', () => {
    const onDragLeaveSpy = sinon.spy();
    const instance = getDOMNode(<Tree data={data} onDragLeave={onDragLeaveSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragLeave(treeNode);
    assert.isTrue(onDragLeaveSpy.calledOnce);
    assert.equal(onDragLeaveSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEndSpy = sinon.spy();
    const instance = getDOMNode(<Tree data={data} onDragEnd={onDragEndSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragEnd(treeNode);
    assert.isTrue(onDragEndSpy.calledOnce);
    assert.equal(onDragEndSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should catch the not set virtualized exception', () => {
    expect(() => {
      const ref = React.createRef();
      render(<Tree data={data} ref={ref} />);
      ref.current.list;
    }).to.throw('The list is not found, please set `virtualized` for the component.');
  });

  it('Should scroll the list by `scrollToRow`', () => {
    const onScrollSpy = sinon.spy();
    const ref = React.createRef();
    render(
      <Tree
        data={data}
        ref={ref}
        virtualized
        style={{ height: 30 }}
        listProps={{
          onScroll: onScrollSpy
        }}
      />
    );
    ref.current.list.scrollToRow(2);
    assert.isTrue(onScrollSpy.calledOnce);
  });

  it('Should show indent line', () => {
    const instance = getDOMNode(<Tree data={data} showIndentLine />);

    const lines = instance.querySelectorAll('.rs-tree-indent-line');

    assert.isNotNull(instance.querySelector('.rs-tree-indent-line'));
    assert.equal(lines.length, 2);
    assert.equal(lines[0].style.left, '44px');
    assert.equal(lines[1].style.left, '28px');
  });
});
