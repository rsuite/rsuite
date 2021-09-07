import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { getInstance } from '@test/testUtils';
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
    const instance = getInstance(<Tree data={data} />);

    assert.include(instance.className, 'rs-tree');
    assert.equal(instance.getAttribute('role'), 'tree');
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    const instance = getInstance(<Tree data={data} onDragStart={onDragStartSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragStart(treeNode);

    assert.isTrue(onDragStartSpy.calledOnce);
    assert.isNotNull(treeNode.querySelector('.rs-tree-node-dragging'));
    assert.equal(onDragStartSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    const instance = getInstance(<Tree data={data} onDragEnter={onDragEnterSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragEnter(treeNode);
    assert.isTrue(onDragEnterSpy.calledOnce);
    assert.equal(onDragEnterSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    const instance = getInstance(<Tree data={data} onDragOver={onDragOverSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragOver(treeNode);
    assert.isTrue(onDragOverSpy.calledOnce);
    assert.equal(onDragOverSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragLeave` callback', () => {
    const onDragLeaveSpy = sinon.spy();
    const instance = getInstance(<Tree data={data} onDragLeave={onDragLeaveSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragLeave(treeNode);
    assert.isTrue(onDragLeaveSpy.calledOnce);
    assert.equal(onDragLeaveSpy.firstCall.firstArg.value, 'Master');
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEndSpy = sinon.spy();
    const instance = getInstance(<Tree data={data} onDragEnd={onDragEndSpy} draggable />);
    const treeNode = instance.querySelector('.rs-tree-node');

    Simulate.dragEnd(treeNode);
    assert.isTrue(onDragEndSpy.calledOnce);
    assert.equal(onDragEndSpy.firstCall.firstArg.value, 'Master');
  });
});
