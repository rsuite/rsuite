import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import RangeSlider from '../RangeSlider';

describe('RangeSlider controlled handle identity', () => {
  it('does not swap handles when the owner rejects a crossing and renders again', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <RangeSlider value={[20, 60]} min={10} max={80} step={5} onChange={onChange} />
    );
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0].parentElement!, { key: 'End' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith([60, 80], expect.anything());
    expect(inputs.map(input => input.value)).toEqual(['20', '60']);
    rerender(<RangeSlider value={[20, 60]} min={10} max={80} step={5} onChange={onChange} />);
    expect(inputs.map(input => input.value)).toEqual(['20', '60']);
    fireEvent.keyDown(inputs[0].parentElement!, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenLastCalledWith([25, 60], expect.anything());
  });
  it('applies an accepted crossing after an intervening unchanged render', () => {
    const { rerender } = render(<RangeSlider value={[20, 60]} min={10} max={80} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'End' });
    rerender(<RangeSlider value={[20, 60]} min={10} max={80} className="waiting" />);
    expect(inputs.map(input => input.value)).toEqual(['20', '60']);
    rerender(<RangeSlider value={[60, 80]} min={10} max={80} />);
    expect(inputs.map(input => input.value)).toEqual(['80', '60']);
  });

  it('follows a crossing that the owner normalizes before accepting', () => {
    const { rerender } = render(<RangeSlider value={[20, 60]} min={10} max={80} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'End' });
    rerender(<RangeSlider value={[60, 75]} min={10} max={80} />);
    expect(inputs.map(input => input.value)).toEqual(['75', '60']);
  });

  it('retains the original endpoint when the owner normalizes a crossing back below its peer', () => {
    const { rerender } = render(<RangeSlider value={[20, 60]} min={10} max={80} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'End' });
    rerender(<RangeSlider value={[55, 60]} min={10} max={80} />);
    expect(inputs.map(input => input.value)).toEqual(['55', '60']);
  });

  it('does not retain a stale crossing after an unrelated external value replaces it', () => {
    const { rerender } = render(<RangeSlider value={[20, 60]} min={10} max={80} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'End' });
    rerender(<RangeSlider value={[30, 70]} min={10} max={80} />);
    expect(inputs.map(input => input.value)).toEqual(['30', '70']);
    rerender(<RangeSlider value={[60, 80]} min={10} max={80} />);
    expect(inputs.map(input => input.value)).toEqual(['60', '80']);
  });

  it('retains an already crossed handle when the owner rejects a later reverse crossing', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <RangeSlider value={[20, 60]} min={10} max={80} onChange={onChange} />
    );
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'End' });
    rerender(<RangeSlider value={[60, 80]} min={10} max={80} onChange={onChange} />);
    expect(inputs.map(input => input.value)).toEqual(['80', '60']);
    fireEvent.keyDown(inputs[0], { key: 'Home' });
    rerender(<RangeSlider value={[60, 80]} min={10} max={80} onChange={onChange} />);
    expect(inputs.map(input => input.value)).toEqual(['80', '60']);
    fireEvent.keyDown(inputs[0], { key: 'ArrowDown' });
    expect(onChange).toHaveBeenLastCalledWith([60, 79], expect.anything());
  });

  it('uses the latest proposal when several crossings are rejected before acceptance', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <RangeSlider value={[20, 60]} min={10} max={80} onChange={onChange} />
    );
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'End' });
    fireEvent.keyDown(inputs[0], { key: 'End' });
    rerender(<RangeSlider value={[60, 80]} min={10} max={80} onChange={onChange} />);
    expect(inputs.map(input => input.value)).toEqual(['80', '60']);
  });

  it('preserves ownership through coincident endpoints without changing DOM order', () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <RangeSlider value={[20, 60]} min={10} max={80} onChange={onChange} />
    );
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '60' } });
    rerender(<RangeSlider value={[60, 60]} min={10} max={80} onChange={onChange} />);
    fireEvent.keyDown(inputs[0], { key: 'ArrowUp' });
    expect(onChange).toHaveBeenLastCalledWith([60, 61], expect.anything());
    rerender(<RangeSlider value={[60, 61]} min={10} max={80} onChange={onChange} />);
    expect(inputs.map(input => input.value)).toEqual(['61', '60']);
    expect(screen.getAllByRole('slider')).toEqual(inputs);
  });

  it('does not keep an unchanged key request as a pending crossing', () => {
    const { rerender } = render(<RangeSlider value={[10, 60]} min={10} max={80} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'Home' });
    rerender(<RangeSlider value={[60, 80]} min={10} max={80} />);
    expect(inputs.map(input => input.value)).toEqual(['60', '80']);
  });
});
