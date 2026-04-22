import React from 'react';
import ColumnResizeHandler from '../ColumnResizeHandler';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { testStandardProps } from '@test/cases';

const handlerLeft = -2;

describe('ColumnResizeHandler', () => {
  testStandardProps(<ColumnResizeHandler />);

  it('Should output a handler', () => {
    render(<ColumnResizeHandler />);
    expect(screen.getByRole('button')).to.have.class('rs-column-resize-spanner');
  });

  it('Should be 100 the `height` ', () => {
    render(<ColumnResizeHandler height={100} />);

    expect(screen.getByRole('button')).to.style('height', '100px');
  });

  it('Should have a `left` style', () => {
    const columnWidth = 100;
    const columnLeft = 100;
    render(<ColumnResizeHandler defaultColumnWidth={columnWidth} columnLeft={columnLeft} />);

    expect(screen.getByRole('button')).to.style(
      'left',
      `${columnWidth + columnLeft + handlerLeft}px`
    );
  });

  it('Should call `onColumnResizeStart` callback ', () => {
    const onColumnResizeStart = vi.fn();

    render(<ColumnResizeHandler onColumnResizeStart={onColumnResizeStart} />);

    fireEvent.mouseDown(screen.getByRole('button'));

    expect(onColumnResizeStart).toHaveBeenCalledOnce();
  });

  it('Should return null when columnFixed is right', () => {
    const { container } = render(<ColumnResizeHandler columnFixed="right" />);
    expect(container.firstChild).to.be.null;
  });

  it('Should call `onColumnResizeEnd` when mouse is released', () => {
    const onColumnResizeEnd = vi.fn();

    render(<ColumnResizeHandler onColumnResizeEnd={onColumnResizeEnd} defaultColumnWidth={100} />);

    const btn = screen.getByRole('button');
    fireEvent.mouseDown(btn);

    // Simulate mouse up to trigger end
    fireEvent.mouseUp(document.body);

    expect(onColumnResizeEnd).toHaveBeenCalledOnce();
  });

  it('Should accept minWidth prop', () => {
    render(<ColumnResizeHandler minWidth={50} defaultColumnWidth={100} />);
    expect(screen.getByRole('button')).to.exist;
  });

  it('Should render with columnLeft positioning', () => {
    render(<ColumnResizeHandler defaultColumnWidth={120} columnLeft={30} />);
    // left = defaultColumnWidth + columnLeft - 2 = 148
    expect(screen.getByRole('button')).to.style('left', '148px');
  });

  it('Should call `onColumnResizeMove` callback when dragging', async () => {
    const onColumnResizeMove = vi.fn();

    render(
      <ColumnResizeHandler
        onColumnResizeMove={onColumnResizeMove}
        defaultColumnWidth={100}
        columnLeft={0}
      />
    );

    const btn = screen.getByRole('button');
    fireEvent.mouseDown(btn, { clientX: 0, clientY: 0 });

    // DOMMouseMoveTracker listens on document.body for mousemove
    fireEvent.mouseMove(document.body, { clientX: 20, clientY: 0, buttons: 1 });

    await new Promise(resolve => requestAnimationFrame(resolve));

    expect(onColumnResizeMove).toHaveBeenCalled();
  });
});
