import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import TreeNode from '../TreeNode';

describe('TreePicker - TreeNode', () => {
  it('Should render tree node', () => {
    const instance = getDOMNode(<TreeNode layer={0} />);

    assert.include(instance.className, 'rs-tree-node');
    assert.include(instance.getAttribute('role'), 'treeitem');
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    const instance = getDOMNode(<TreeNode layer={0} onDragStart={onDragStartSpy} nodeData={1} />);

    Simulate.dragStart(instance);

    assert.isTrue(onDragStartSpy.calledOnce);
    assert.equal(onDragStartSpy.firstCall.firstArg, 1);
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    const instance = getDOMNode(<TreeNode layer={0} onDragEnter={onDragEnterSpy} nodeData={1} />);

    Simulate.dragEnter(instance);

    assert.isTrue(onDragEnterSpy.calledOnce);
    assert.equal(onDragEnterSpy.firstCall.firstArg, 1);
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    const instance = getDOMNode(<TreeNode layer={0} onDragOver={onDragOverSpy} nodeData={1} />);

    Simulate.dragOver(instance);

    assert.isTrue(onDragOverSpy.calledOnce);
    assert.equal(onDragOverSpy.firstCall.firstArg, 1);
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEndSpy = sinon.spy();
    const instance = getDOMNode(<TreeNode layer={0} onDragEnd={onDragEndSpy} nodeData={1} />);

    Simulate.dragEnd(instance);

    assert.isTrue(onDragEndSpy.calledOnce);
    assert.equal(onDragEndSpy.firstCall.firstArg, 1);
  });
});
