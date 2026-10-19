import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Slider from '../Slider';
import RangeSlider from '../../RangeSlider';

describe('Slider native input', () => {
  it('keeps the native range, step and value consistent with its accessible value', () => {
    render(<Slider min={100} max={201} step={0.5} defaultValue={150.5} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.min).toBe('100');
    expect(input.max).toBe('201');
    expect(input.step).toBe('0.5');
    expect(input.value).toBe(input.getAttribute('aria-valuenow'));
    expect(input.readOnly).toBe(false);
    expect(input.tabIndex).toBe(0);
    expect(input.parentElement?.hasAttribute('tabindex')).toBe(false);
  });

  it('applies native value changes to the slider and calls onChange once', () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={20} onChange={onChange} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '35' } });
    expect(input.value).toBe('35');
    expect(input.getAttribute('aria-valuenow')).toBe('35');
    expect(onChange).toHaveBeenCalledExactlyOnceWith(35, expect.anything());
  });

  it('preserves controlled ownership of native changes', () => {
    const onChange = vi.fn();
    render(<Slider value={20} onChange={onChange} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '35' } });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(35, expect.anything());
    expect(input.value).toBe('20');
    expect(input.getAttribute('aria-valuenow')).toBe('20');
  });

  it('exposes the disabled and read-only input states', () => {
    const { rerender } = render(<Slider disabled />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.tabIndex).toBe(-1);
    rerender(<Slider readOnly />);
    expect(input.disabled).toBe(false);
    expect(input.getAttribute('aria-readonly')).toBe('true');
    expect(input.tabIndex).toBe(-1);
  });

  it('changes the endpoint whose input receives the key', () => {
    render(<RangeSlider defaultValue={[20, 60]} step={5} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.keyDown(inputs[0], { key: 'ArrowUp' });
    expect(inputs.map(input => input.value)).toEqual(['25', '60']);
    fireEvent.keyDown(inputs[1], { key: 'ArrowDown' });
    expect(inputs.map(input => input.value)).toEqual(['25', '55']);
  });

  it('keeps the same native input attached to its endpoint after crossing', () => {
    const onChange = vi.fn();
    render(<RangeSlider defaultValue={[20, 60]} onChange={onChange} />);
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '80' } });
    expect(onChange).toHaveBeenCalledExactlyOnceWith([60, 80], expect.anything());
    expect(inputs.map(input => input.value)).toEqual(['80', '60']);
    fireEvent.keyDown(inputs[0], { key: 'ArrowDown' });
    expect(inputs.map(input => input.value)).toEqual(['79', '60']);
  });

  it('keeps endpoint ownership when a keyboard crossing is rejected', () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        defaultValue={[20, 60]}
        min={10}
        max={80}
        step={5}
        constraint={([start, end]) => end - start >= 30}
        onChange={onChange}
      />
    );
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    // Exercise the existing wrapper event path independently of native input targeting.
    fireEvent.keyDown(inputs[0].parentElement!, { key: 'End' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.keyDown(inputs[0].parentElement!, { key: 'ArrowUp' });
    expect(inputs.map(input => input.value)).toEqual(['25', '60']);
    expect(onChange).toHaveBeenCalledExactlyOnceWith([25, 60], expect.anything());
  });

  it('rejects native changes without changing endpoint ownership', () => {
    const onChange = vi.fn();
    render(
      <RangeSlider
        defaultValue={[20, 60]}
        min={10}
        max={80}
        step={5}
        constraint={([start, end]) => end - start >= 30}
        onChange={onChange}
      />
    );
    const inputs = screen.getAllByRole('slider') as HTMLInputElement[];
    fireEvent.change(inputs[0], { target: { value: '80' } });
    expect(onChange).not.toHaveBeenCalled();
    expect(inputs.map(input => input.value)).toEqual(['20', '60']);
    fireEvent.change(inputs[0], { target: { value: '25' } });
    expect(inputs.map(input => input.value)).toEqual(['25', '60']);
    expect(onChange).toHaveBeenCalledExactlyOnceWith([25, 60], expect.anything());
  });
});
