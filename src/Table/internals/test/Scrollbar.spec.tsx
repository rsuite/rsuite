import React from 'react';
import Scrollbar from '../Scrollbar';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { testStandardProps } from '@test/cases';
import type { ScrollbarInstance } from '../Scrollbar';

describe('Scrollbar', () => {
  testStandardProps(<Scrollbar />);

  it('Should render a scrollbar', async () => {
    await act(async () => {
      render(<Scrollbar />);
    });

    expect(screen.getByRole('scrollbar')).to.have.class('rs-scrollbar');
  });

  it('Should render a vertical scrollbar', async () => {
    await act(async () => {
      render(<Scrollbar vertical />);
    });

    expect(screen.getByRole('scrollbar')).to.have.class('rs-scrollbar-vertical');
  });

  it('Should render a scroll handle with correct width', async () => {
    await act(async () => {
      render(<Scrollbar scrollLength={1000} length={100} />);
    });

    expect(screen.getByRole('button').style.width).to.equal('10%');
  });

  it('Should trigger onMouseDown callback', async () => {
    const onMouseDown = vi.fn();

    await act(async () => {
      render(<Scrollbar onMouseDown={onMouseDown} />);
    });

    fireEvent.mouseDown(screen.getByRole('button'));

    expect(onMouseDown).toHaveBeenCalledOnce();
  });

  it('Should apply custom styles', async () => {
    await act(async () => {
      render(<Scrollbar style={{ fontSize: 12 }} />);
    });

    expect(screen.getByRole('scrollbar')).to.have.style('font-size', '12px');
  });

  it('Should update scroll handle position without triggering onScroll', async () => {
    const ref = React.createRef<ScrollbarInstance>();

    await act(async () => {
      render(<Scrollbar length={100} scrollLength={1000} ref={ref} />);
    });

    await act(async () => {
      ref.current?.onWheelScroll(100);
    });

    expect(screen.getByRole('button').style.transform).to.equal('translate3d(10px, 0px, 0px)');
  });
});
