import React from 'react';
import { fireEvent, act, waitFor, render, screen } from '@testing-library/react';
import sinon from 'sinon';
import Handle from '../Handle';

describe('Slider - Handle', () => {
  it('Should call `onDragStart` callback', () => {
    const onDragStart = sinon.spy();

    render(<Handle onDragStart={onDragStart} />);

    fireEvent.mouseDown(screen.getByTestId('slider-handle'));

    expect(screen.getByTestId('slider-handle')).to.have.class('active');
    expect(onDragStart).to.have.been.calledOnce;
  });

  it('Should call `onDragMove` callback', async () => {
    const onDragMove = sinon.spy();

    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });

    render(<Handle onDragMove={onDragMove} />);

    fireEvent.mouseDown(screen.getByTestId('slider-handle'));

    act(() => {
      screen.getByTestId('slider-handle').dispatchEvent(mousemoveEvent);
    });

    await waitFor(() => {
      expect(screen.getByTestId('slider-handle')).to.have.class('active');
      expect(onDragMove).to.have.been.calledOnce;
    });
  });

  it('Should show tooltip', () => {
    render(<Handle tooltip value={10} />);

    expect(screen.getByRole('tooltip', { hidden: true }).style.left).to.empty;

    fireEvent.mouseEnter(screen.getByTestId('slider-handle'));

    expect(screen.getByRole('tooltip', { hidden: true }).style.left).to.not.empty;
  });
});
