import React from 'react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { render, fireEvent, screen } from '@testing-library/react';
import { addStyle } from 'dom-lib';
import { testStandardProps } from '@test/utils';
import RangeSlider from '../RangeSlider';

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
    const onChange = sinon.spy();
    const onChangeCommitted = sinon.spy();

    const { container } = render(
      <RangeSlider disabled onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );
    expect(container.firstChild).to.have.class('rs-slider-disabled');
    expect(screen.queryAllByRole('slider')[0]).to.have.attr('aria-disabled', 'true');
    expect(screen.queryAllByRole('slider')[1]).to.have.attr('aria-disabled', 'true');

    fireEvent.click(container.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should be readOnly', () => {
    const onChange = sinon.spy();
    const onChangeCommitted = sinon.spy();

    const { container } = render(
      <RangeSlider readOnly onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );
    expect(screen.queryAllByRole('slider')[0]).to.have.attr('readonly');
    expect(screen.queryAllByRole('slider')[1]).to.have.attr('readonly');

    fireEvent.click(container.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should call onChange callback', () => {
    const onChange = sinon.spy();
    const { container } = render(<RangeSlider defaultValue={[10, 50]} onChange={onChange} />);

    fireEvent.click(container.querySelector('.rs-slider-progress-bar') as HTMLElement);

    expect(onChange).to.have.been.calledWith([0, 50]);
  });

  it('Should respond to keyboard event', async () => {
    const onChange = sinon.spy();
    render(<RangeSlider value={[10, 50]} onChange={onChange} />);

    // FIXME Should dispatch event on [role=slider] directly
    fireEvent.keyDown(
      screen.getAllByRole('slider')[0].closest('.rs-slider-handle') as HTMLElement,
      {
        key: 'ArrowRight'
      }
    );
    expect(onChange).to.have.been.calledWith([11, 50]);
  });

  it('Should not call onChange when next value does not match given constraint', async () => {
    const onChange = sinon.spy();
    const { container } = render(
      <RangeSlider value={[10, 50]} onChange={onChange} constraint={() => false} />
    );

    fireEvent.click(container.querySelector('.rs-slider-progress-bar') as HTMLElement);
    expect(onChange).not.to.have.been.called;

    fireEvent.keyDown(
      screen.getAllByRole('slider')[0].closest('.rs-slider-handle') as HTMLElement,
      {
        key: 'ArrowRight'
      }
    );
    expect(onChange).not.to.have.been.called;
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
    const onChangeCommitted = sinon.spy();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    const { container } = render(<RangeSlider onChangeCommitted={onChangeCommitted} />);

    const handle = container.querySelector('.rs-slider-handle') as HTMLElement;
    fireEvent.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);

    expect(handle).to.have.class('active');

    handle.dispatchEvent(mouseupEvent);
    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChangeCommitted` callback when click bar', () => {
    const onChangeCommitted = sinon.spy();
    const { container } = render(
      <RangeSlider defaultValue={[10, 50]} onChangeCommitted={onChangeCommitted} />
    );

    fireEvent.click(container.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChangeCommitted).to.have.been.calledWith([0, 50]);
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
    const onChange = sinon.spy();
    const { container } = render(
      <RangeSlider style={{ height: 100 }} defaultValue={[10, 50]} onChange={onChange} vertical />
    );

    const sliderBar = container.querySelector('.rs-slider-bar') as HTMLElement;

    // `margin` will cause the values of `pageX` and `pageY` to be inaccurate in the test environment, so you need to set them manually here.
    addStyle(document.body, 'margin', '0');

    userEvent.click(sliderBar, { clientX: 0, clientY: 80 });

    expect(onChange).to.have.been.calledWith([20, 50]);

    userEvent.click(sliderBar, { clientX: 0, clientY: 0 });

    /**
     * fix: https://github.com/rsuite/rsuite/issues/2425
     * Error thrown before fix: expected [ 100, 20 ] to deeply equal [ 20, 100 ]
     */
    expect(onChange).to.have.been.calledWith([20, 100]);

    expect(onChange).to.have.been.calledTwice;
  });
});
