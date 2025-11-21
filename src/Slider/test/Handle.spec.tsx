import React from 'react';
import Handle from '../Handle';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, act, waitFor, render, screen } from '@testing-library/react';
import { getCssVarValue } from '@test/utils';

describe('Slider - Handle', () => {
  it('Should call `onDragStart` callback', () => {
    const onDragStart = vi.fn();

    render(<Handle onDragStart={onDragStart} />);

    fireEvent.mouseDown(screen.getByTestId('slider-handle'));

    expect(screen.getByTestId('slider-handle')).to.have.class('active');
    expect(onDragStart).toHaveBeenCalledTimes(1);
  });

  it('Should call `onDragMove` callback', async () => {
    const onDragMove = vi.fn();

    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });

    render(<Handle onDragMove={onDragMove} />);

    fireEvent.mouseDown(screen.getByTestId('slider-handle'));

    act(() => {
      screen.getByTestId('slider-handle').dispatchEvent(mousemoveEvent);
    });

    await waitFor(() => {
      expect(screen.getByTestId('slider-handle')).to.have.class('active');
      expect(onDragMove).toHaveBeenCalledTimes(1);
    });
  });

  it('Should show tooltip', () => {
    render(<Handle tooltip value={10} />);

    const tooltip = screen.getByRole('tooltip', { hidden: true });

    expect(getCssVarValue(tooltip, '--rs-tooltip-offset')).to.empty;

    fireEvent.mouseEnter(screen.getByTestId('slider-handle'));

    expect(getCssVarValue(tooltip, '--rs-tooltip-offset')).to.not.empty;
  });

  it('Should show tooltip by default when keepTooltipOpen is true', () => {
    render(<Handle tooltip value={10} keepTooltipOpen />);

    const tooltip = screen.getByRole('tooltip', { hidden: true });

    expect(getCssVarValue(tooltip, '--rs-tooltip-offset')).to.not.empty;
  });

  it('Should show tooltip when keepTooltipOpen is true but tooltip is false', () => {
    render(<Handle tooltip={false} value={10} keepTooltipOpen />);

    const tooltip = screen.getByRole('tooltip', { hidden: true });

    expect(getCssVarValue(tooltip, '--rs-tooltip-offset')).to.not.empty;
  });

  it('Should NOT show tooltip when keepTooltipOpen is false and tooltip is also false', () => {
    render(<Handle tooltip={false} value={10} keepTooltipOpen={false} />);

    expect(screen.queryByRole('tooltip')).to.null;
  });
});
