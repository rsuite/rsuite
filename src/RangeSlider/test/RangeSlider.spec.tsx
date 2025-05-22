import React from 'react';
import userEvent from '@testing-library/user-event';
import RangeSlider from '../RangeSlider';
import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { addStyle } from 'dom-lib';
import { testStandardProps } from '@test/cases';

import '../../Slider/styles/index.less';

describe('RangeSlider', () => {
  testStandardProps(<RangeSlider />);

  it('Should render a RangeSlider', () => {
    const { container } = render(<RangeSlider />);
    expect(container.firstChild).to.have.class('rs-slider');
  });

  it('Should have a progress ', () => {
    const { container } = render(<RangeSlider defaultValue={[10, 50]} />);

    expect(
      (container.querySelector('.rs-slider-progress-bar') as HTMLHtmlElement).style.width
    ).to.equal('40%');

    expect((container.querySelector('.rs-slider-progress-bar') as HTMLElement).style.left).to.equal(
      '10%'
    );
  });

  it('Should render 2 handles ', () => {
    render(<RangeSlider value={[10, 50]} />);
    expect(screen.getAllByRole('slider')).to.have.length(2);
  });

  it('Should output the scale', () => {
    const { rerender, container } = render(<RangeSlider step={10} max={100} graduated />);

    expect(container.querySelectorAll('li')).to.have.length(10);

    rerender(<RangeSlider min={10} step={10} max={100} graduated />);

    expect(container.querySelectorAll('li')).to.have.length(9);
  });

  it('Should be displayed vertically', () => {
    const { container } = render(<RangeSlider vertical />);

    expect(container.firstChild).to.have.class('rs-slider-vertical');

    screen.getAllByRole('slider').forEach(slider => {
      expect(slider).to.have.attr('aria-orientation', 'vertical');
    });
  });

  it('Should be disabled', () => {
    const onChange = vi.fn();
    const onChangeCommitted = vi.fn();

    const { container } = render(
      <RangeSlider disabled onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );
    expect(container.firstChild).to.have.class('rs-slider-disabled');
    expect(screen.queryAllByRole('slider')[0]).to.have.attr('aria-disabled', 'true');
    expect(screen.queryAllByRole('slider')[1]).to.have.attr('aria-disabled', 'true');

    fireEvent.click(container.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeCommitted).not.toHaveBeenCalled();
  });

  it('Should be readOnly', () => {
    const onChange = vi.fn();
    const onChangeCommitted = vi.fn();

    const { container } = render(
      <RangeSlider readOnly onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );
    expect(screen.queryAllByRole('slider')[0]).to.have.attr('readonly');
    expect(screen.queryAllByRole('slider')[1]).to.have.attr('readonly');

    fireEvent.click(container.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeCommitted).not.toHaveBeenCalled();
  });

  it('Should apply the specified size', () => {
    const { container, rerender } = render(<RangeSlider size="lg" />);

    expect(container.firstChild).to.have.attr('data-size', 'lg');

    rerender(<RangeSlider size="md" />);
    expect(container.firstChild).to.have.attr('data-size', 'md');

    rerender(<RangeSlider size="sm" />);
    expect(container.firstChild).to.have.attr('data-size', 'sm');

    rerender(<RangeSlider size="xs" />);
    expect(container.firstChild).to.have.attr('data-size', 'xs');
  });

  it('Should render custom marks', () => {
    const marks = [
      { value: 0, label: 'Start' },
      { value: 50, label: 'Middle' },
      { value: 100, label: 'End' }
    ];

    const { container } = render(<RangeSlider marks={marks} graduated />);

    const markElements = container.querySelectorAll('.rs-slider-mark-content');

    expect(markElements).to.have.length(3);
    expect(markElements[0]).to.have.text('Start');
    expect(markElements[1]).to.have.text('Middle');
    expect(markElements[2]).to.have.text('End');
  });

  it('Should call onChange callback', () => {
    const onChange = vi.fn();
    const { container } = render(<RangeSlider defaultValue={[10, 50]} onChange={onChange} />);

    fireEvent.click(container.querySelector('.rs-slider-progress-bar') as HTMLElement);
    expect(onChange).toHaveBeenCalledWith([0, 50], expect.any(Object));
  });

  it('Should respond to keyboard event', async () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[10, 50]} onChange={onChange} />);

    // FIXME Should dispatch event on [role=slider] directly
    fireEvent.keyDown(
      screen.getAllByRole('slider')[0].closest('.rs-slider-handle') as HTMLElement,
      {
        key: 'ArrowRight'
      }
    );
    expect(onChange).toHaveBeenCalledWith([11, 50], expect.any(Object));
  });

  it('Should not call onChange when next value does not match given constraint', async () => {
    const onChange = vi.fn();
    const { container } = render(
      <RangeSlider value={[10, 50]} onChange={onChange} constraint={() => false} />
    );

    fireEvent.click(container.querySelector('.rs-slider-progress-bar') as HTMLElement);
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.keyDown(
      screen.getAllByRole('slider')[0].closest('.rs-slider-handle') as HTMLElement,
      {
        key: 'ArrowRight'
      }
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Should render custom title', () => {
    const { container } = render(<RangeSlider tooltip={false} handleTitle={'test'} />);

    expect(container.querySelector('.rs-slider-handle')).to.have.text('test');
  });

  it('Should handle keyboard operations', () => {
    const { container } = render(<RangeSlider defaultValue={[10, 50]} />);

    const handle = container.querySelector('.rs-slider-handle') as HTMLElement;
    const input = screen.getAllByRole('slider')[0] as HTMLInputElement;

    expect(input).to.value('10');
    expect(input).to.have.attr('aria-valuenow', '10');

    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    expect(input).to.value('11');
    expect(input).to.have.attr('aria-valuenow', '11');

    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(input).to.value('12');
    expect(input).to.have.attr('aria-valuenow', '12');

    fireEvent.keyDown(handle, { key: 'ArrowDown' });
    expect(input).to.value('11');
    expect(input).to.have.attr('aria-valuenow', '11');

    fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    expect(input).to.value('10');
    expect(input).to.have.attr('aria-valuenow', '10');

    fireEvent.keyDown(handle, { key: 'Home' });
    expect(input).to.value('0');
    expect(input).to.have.attr('aria-valuenow', '0');

    fireEvent.keyDown(handle, { key: 'End' });
    expect(input).to.value('100');
    expect(input).to.have.attr('aria-valuenow', '100');
  });

  it('Should call `onChangeCommitted` callback', async () => {
    const onChangeCommitted = vi.fn();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    const { container } = render(<RangeSlider onChangeCommitted={onChangeCommitted} />);

    const handle = container.querySelector('.rs-slider-handle') as HTMLElement;
    fireEvent.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);

    expect(handle).to.have.class('active');

    handle.dispatchEvent(mouseupEvent);
    expect(onChangeCommitted).toHaveBeenCalledTimes(1);
  });

  it('Should call `onChangeCommitted` callback when click bar', () => {
    const onChangeCommitted = vi.fn();
    const { container } = render(
      <RangeSlider defaultValue={[10, 50]} onChangeCommitted={onChangeCommitted} />
    );

    fireEvent.click(container.querySelector('.rs-slider-bar') as HTMLElement);
    expect(onChangeCommitted).toHaveBeenCalledWith([0, 50], expect.any(Object));
  });

  it('Should output an `input` stored value', () => {
    const { container } = render(<RangeSlider min={10} max={100} value={[20, 50]} />);

    const input = container.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;

    expect(input[0]).to.value('20');
    expect(input[0]).to.have.attr('aria-valuenow', '20');
    expect(input[0]).to.have.attr('aria-valuemax', '100');
    expect(input[0]).to.have.attr('aria-valuemin', '10');
    expect(input[0]).to.have.attr('aria-orientation', 'horizontal');

    expect(input[1]).to.value('50');
    expect(input[1]).to.have.attr('aria-valuenow', '50');
    expect(input[1]).to.have.attr('aria-valuemax', '100');
    expect(input[1]).to.have.attr('aria-valuemin', '10');
    expect(input[1]).to.have.attr('aria-orientation', 'horizontal');
  });

  it('Should be reversed start and end values', () => {
    const onChange = vi.fn();
    const { container } = render(
      <RangeSlider style={{ height: 100 }} defaultValue={[10, 50]} onChange={onChange} vertical />
    );

    const sliderBar = container.querySelector('.rs-slider-bar') as HTMLElement;

    // `margin` will cause the values of `pageX` and `pageY` to be inaccurate in the test environment, so you need to set them manually here.
    addStyle(document.body, 'margin', '0');

    userEvent.click(sliderBar, { clientX: 0, clientY: 80 });
    expect(onChange).toHaveBeenCalledWith([20, 50], expect.any(Object));

    userEvent.click(sliderBar, { clientX: 0, clientY: 0 });

    /**
     * fix: https://github.com/rsuite/rsuite/issues/2425
     * Error thrown before fix: expected [ 100, 20 ] to deeply equal [ 20, 100 ]
     */
    expect(onChange).toHaveBeenCalledWith([20, 100], expect.any(Object));

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      const { rerender } = render(<RangeSlider value={[1, 2]} plaintext />);

      expect(screen.getByText('1~2')).to.have.class('rs-plaintext');

      rerender(<RangeSlider value={[0, 10]} plaintext />);

      expect(screen.getByText('0~10')).to.have.class('rs-plaintext');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(<RangeSlider plaintext />);

      expect(screen.getByText('Not selected')).to.have.class('rs-plaintext');
    });
  });
});
