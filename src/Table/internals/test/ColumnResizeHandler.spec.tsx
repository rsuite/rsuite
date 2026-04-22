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
});
