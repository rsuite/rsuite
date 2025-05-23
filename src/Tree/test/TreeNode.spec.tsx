import React from 'react';
import TreeNode from '../TreeNode';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

describe('TreeNode', () => {
  it('Should render tree node', () => {
    const { container } = render(<TreeNode layer={0} visible nodeData={{}} />);

    expect(container.firstChild).to.have.class('rs-tree-node');
    expect(container.firstChild).to.have.attr('role', 'treeitem');
  });

  it('Should call `onDragStart` callback', () => {
    const onDragStart = vi.fn();
    const { container } = render(
      <TreeNode layer={0} onDragStart={onDragStart} nodeData={1} visible />
    );

    fireEvent.dragStart(container.firstChild as HTMLElement);

    expect(onDragStart.mock.calls[0][0]).toBe(1);
  });

  it('Should call `onDragEnter` callback', () => {
    const onDragEnter = vi.fn();
    const { container } = render(
      <TreeNode layer={0} onDragEnter={onDragEnter} nodeData={1} visible />
    );

    fireEvent.dragEnter(container.firstChild as HTMLElement);

    expect(onDragEnter.mock.calls[0][0]).toBe(1);
  });

  it('Should call `onDragOver` callback', () => {
    const onDragOver = vi.fn();
    const { container } = render(
      <TreeNode layer={0} onDragOver={onDragOver} nodeData={1} visible />
    );

    fireEvent.dragOver(container.firstChild as HTMLElement);

    expect(onDragOver.mock.calls[0][0]).toBe(1);
  });

  it('Should call `onDragEnd` callback', () => {
    const onDragEnd = vi.fn();
    const { container } = render(<TreeNode layer={0} onDragEnd={onDragEnd} nodeData={1} visible />);

    fireEvent.dragEnd(container.firstChild as HTMLElement);

    expect(onDragEnd.mock.calls[0][0]).toBe(1);
  });
});
