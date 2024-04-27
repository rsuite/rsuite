import React from 'react';
import sinon from 'sinon';
import TreeNode from '../TreeNode';
import { render, fireEvent } from '@testing-library/react';

describe('TreeNode', () => {
  it('Should render tree node', () => {
    const { container } = render(<TreeNode layer={0} visible nodeData={{}} />);

    expect(container.firstChild).to.have.class('rs-tree-node');
    expect(container.firstChild).to.have.attr('role', 'treeitem');
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStart = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragStart={onDragStart} nodeData={1} visible />
    );

    fireEvent.dragStart(container.firstChild as HTMLElement);

    expect(onDragStart).to.have.been.calledWith(1);
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnter = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragEnter={onDragEnter} nodeData={1} visible />
    );

    fireEvent.dragEnter(container.firstChild as HTMLElement);

    expect(onDragEnter).to.have.been.calledWith(1);
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOver = sinon.spy();
    const { container } = render(
      <TreeNode layer={0} onDragOver={onDragOver} nodeData={1} visible />
    );

    fireEvent.dragOver(container.firstChild as HTMLElement);

    expect(onDragOver).to.have.been.calledWith(1);
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEnd = sinon.spy();
    const { container } = render(<TreeNode layer={0} onDragEnd={onDragEnd} nodeData={1} visible />);

    fireEvent.dragEnd(container.firstChild as HTMLElement);

    expect(onDragEnd).to.have.been.calledWith(1);
  });
});
