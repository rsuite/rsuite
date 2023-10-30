import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import sinon from 'sinon';
import TreeNode from '../TreeNode';
import { render } from '@testing-library/react';

describe('TreePicker - TreeNode', () => {
  it('Should render tree node', () => {
    const { container } = render(<TreeNode layer={0} visible nodeData={{}} />);

    expect(container.firstChild).to.have.class('rs-tree-node');
    expect(container.firstChild).to.have.attr('role', 'treeitem');
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragStart={onDragStartSpy} nodeData={1} visible />
    );

    const div = container.firstChild as HTMLElement;
    Simulate.dragStart(div);

    assert.isTrue(onDragStartSpy.calledOnce);
    assert.equal(onDragStartSpy.firstCall.firstArg, 1);
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnterSpy = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragEnter={onDragEnterSpy} nodeData={1} visible />
    );

    const div = container.firstChild as HTMLElement;
    Simulate.dragEnter(div);

    assert.isTrue(onDragEnterSpy.calledOnce);
    assert.equal(onDragEnterSpy.firstCall.firstArg, 1);
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOverSpy = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragOver={onDragOverSpy} nodeData={1} visible />
    );

    const div = container.firstChild as HTMLElement;
    Simulate.dragOver(div);

    assert.isTrue(onDragOverSpy.calledOnce);
    assert.equal(onDragOverSpy.firstCall.firstArg, 1);
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEndSpy = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragEnd={onDragEndSpy} nodeData={1} visible />
    );

    const div = container.firstChild as HTMLElement;
    Simulate.dragEnd(div);

    assert.isTrue(onDragEndSpy.calledOnce);
    assert.equal(onDragEndSpy.firstCall.firstArg, 1);
  });
});
