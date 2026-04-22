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

  it('Should render a horizontal scrollbar', async () => {
    await act(async () => {
      render(<Scrollbar />);
    });

    expect(screen.getByRole('scrollbar')).to.have.class('rs-scrollbar-horizontal');
  });

  it('Should render a scroll handle with correct width', async () => {
    await act(async () => {
      render(<Scrollbar scrollLength={1000} length={100} />);
    });

    expect(screen.getByRole('button').style.width).to.equal('10%');
  });

  it('Should render vertical handle with correct height', async () => {
    await act(async () => {
      render(<Scrollbar vertical scrollLength={1000} length={100} />);
    });

    expect(screen.getByRole('button').style.height).to.equal('10%');
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

  it('Should reset scroll bar position to zero', async () => {
    const ref = React.createRef<ScrollbarInstance>();

    await act(async () => {
      render(<Scrollbar length={100} scrollLength={1000} ref={ref} />);
    });

    await act(async () => {
      ref.current?.onWheelScroll(500);
    });

    await act(async () => {
      ref.current?.resetScrollBarPosition();
    });

    expect(screen.getByRole('button').style.transform).to.equal('translate3d(0px, 0px, 0px)');
  });

  it('Should trigger onScroll when scrollbar is clicked', async () => {
    const onScroll = vi.fn();
    const ref = React.createRef<ScrollbarInstance>();

    await act(async () => {
      render(<Scrollbar length={100} scrollLength={1000} onScroll={onScroll} ref={ref} />);
    });

    // Click on the scrollbar track (not the handle) to trigger handleClick → handleScroll → onScroll
    await act(async () => {
      fireEvent.click(screen.getByRole('scrollbar'), { pageX: 50 });
    });

    expect(onScroll).toHaveBeenCalled();
  });

  it('Should expose root and handle DOM elements via ref', async () => {
    const ref = React.createRef<ScrollbarInstance>();

    await act(async () => {
      render(<Scrollbar ref={ref} />);
    });

    expect(ref.current?.root).to.be.instanceOf(HTMLDivElement);
    expect(ref.current?.handle).to.be.instanceOf(HTMLDivElement);
  });

  it('Should add pressed class when handle is pressed', async () => {
    await act(async () => {
      render(<Scrollbar />);
    });

    await act(async () => {
      fireEvent.mouseDown(screen.getByRole('button'));
    });

    expect(screen.getByRole('scrollbar')).to.have.class('rs-scrollbar-pressed');
  });

  it('Should set aria-orientation to vertical when vertical prop is set', async () => {
    await act(async () => {
      render(<Scrollbar vertical />);
    });

    expect(screen.getByRole('scrollbar').getAttribute('aria-orientation')).to.equal('vertical');
  });

  it('Should set aria-orientation to horizontal by default', async () => {
    await act(async () => {
      render(<Scrollbar />);
    });

    expect(screen.getByRole('scrollbar').getAttribute('aria-orientation')).to.equal('horizontal');
  });

  it('Should not scroll past minimum position', async () => {
    const ref = React.createRef<ScrollbarInstance>();

    await act(async () => {
      render(<Scrollbar length={100} scrollLength={1000} ref={ref} />);
    });

    // Try to scroll backward past zero
    await act(async () => {
      ref.current?.onWheelScroll(-500);
    });

    // Should be clamped to 0
    expect(screen.getByRole('button').style.transform).to.equal('translate3d(0px, 0px, 0px)');
  });
});

