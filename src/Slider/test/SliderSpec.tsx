import React from 'react';
import sinon from 'sinon';
import Slider from '../Slider';
import { render, fireEvent, screen } from '@testing-library/react';
import { testStandardProps, getStyle } from '@test/utils';

describe('Slider', () => {
  testStandardProps(<Slider />);

  it('Should render a Slider', () => {
    const { container } = render(<Slider />);
    expect(container.firstChild).to.have.class('rs-slider');
  });

  it('Should have a progress ', () => {
    render(<Slider progress defaultValue={50} />);

    expect(getStyle(screen.getByTestId('slider-progress-bar'))).to.have.property('width', '50%');
  });

  it('Should output the scale', () => {
    const { rerender } = render(<Slider step={10} max={100} graduated />);

    expect(screen.getByTestId('slider-bar').querySelectorAll('li')).to.have.length(10);

    rerender(<Slider min={10} step={10} max={100} graduated />);

    expect(screen.getByTestId('slider-bar').querySelectorAll('li')).to.have.length(9);
  });

  it('Should be displayed vertically', () => {
    const { container } = render(<Slider vertical />);
    expect(container.firstChild).to.have.class('rs-slider-vertical');
    expect(screen.getByRole('slider')).to.have.attr('aria-orientation', 'vertical');
  });

  it('Should be disabled', () => {
    const onChange = sinon.spy();
    const onChangeCommitted = sinon.spy();
    const { container } = render(
      <Slider disabled onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );

    expect(container.firstChild).to.have.class('rs-slider-disabled');
    expect(screen.getByRole('slider')).to.have.attr('aria-disabled', 'true');

    fireEvent.click(screen.getByTestId('slider-bar'));

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should be readOnly', () => {
    const onChange = sinon.spy();
    const onChangeCommitted = sinon.spy();
    const { container } = render(
      <Slider readOnly onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );

    expect(container.firstChild).to.have.class('rs-slider-readonly');
    expect(screen.getByRole('slider')).to.have.attr('readonly');

    fireEvent.click(screen.getByTestId('slider-bar'));

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should custom render mark', () => {
    render(
      <Slider
        progress
        min={0}
        max={2}
        graduated
        renderMark={mark => {
          return mark == 0 ? 'Single' : mark;
        }}
      />
    );

    const marks = screen.getByTestId('slider-bar').querySelectorAll('.rs-slider-mark-content');

    expect(marks[0]).to.have.text('Single');
    expect(marks[1]).to.have.text('1');
    expect(marks[2]).to.have.text('2');
  });

  it('Should render custom title', () => {
    render(<Slider tooltip={false} handleTitle={'test'} />);

    expect(screen.getByText('test')).to.have.class('rs-slider-handle');
  });

  it('Should handle keyboard operations', () => {
    render(<Slider defaultValue={10} />);

    const handle = screen.getByTestId('slider-handle');
    const input = screen.getByRole('slider');

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

  it('Should call `onChangeCommitted` callback', () => {
    const onChangeCommitted = sinon.spy();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    render(<Slider onChangeCommitted={onChangeCommitted} />);

    const handle = screen.getByTestId('slider-handle');
    fireEvent.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);

    expect(handle).to.have.class('active');
    handle.dispatchEvent(mouseupEvent);

    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChangeCommitted` callback when click bar', () => {
    const onChangeCommitted = sinon.spy();
    render(<Slider onChangeCommitted={onChangeCommitted} />);

    fireEvent.click(screen.getByTestId('slider-bar'));

    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChange` callback', () => {
    const onChange = sinon.spy();
    render(<Slider onChange={onChange} />);

    fireEvent.click(screen.getByTestId('slider-bar'));

    expect(onChange).to.have.been.calledOnce;
  });

  it('Should output an `input` stored value', () => {
    render(<Slider min={10} max={100} value={20} />);

    const slider = screen.getByRole('slider');
    expect(slider).to.have.value('20');
    expect(slider).to.have.attr('aria-valuenow', '20');
    expect(slider).to.have.attr('aria-valuemax', '100');
    expect(slider).to.have.attr('aria-valuemin', '10');
    expect(slider).to.have.attr('aria-orientation', 'horizontal');
  });

  describe('Plain text', () => {
    it('Should render input value', () => {
      render(<Slider value={1} plaintext />);

      expect(screen.getByText('1')).to.have.class('rs-plaintext');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(<Slider value={null as any} plaintext />);

      expect(screen.getByText('Not selected')).to.have.class('rs-plaintext');
    });
  });
});
