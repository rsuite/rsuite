import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { getDOMNode, testStandardProps } from '@test/utils';
import Slider from '../Slider';
import Sinon from 'sinon';

describe('Slider', () => {
  testStandardProps(<Slider />);

  it('Should render a Slider', () => {
    const instance = getDOMNode(<Slider />);
    expect(instance).to.have.class('rs-slider');
  });

  it('Should have a progress ', () => {
    const instance = getDOMNode(<Slider progress defaultValue={50} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect((instance.querySelector('.rs-slider-progress-bar') as HTMLElement).style.width).to.equal(
      '50%'
    );
  });

  it('Should output the scale', () => {
    const instance = getDOMNode(<Slider step={10} max={100} graduated />);
    const instance2 = getDOMNode(<Slider min={10} step={10} max={100} graduated />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.querySelectorAll('li')).to.have.length(10);

    // eslint-disable-next-line testing-library/no-node-access
    expect(instance2.querySelectorAll('li')).to.have.length(9);
  });

  it('Should be displayed vertically', () => {
    const { container } = render(<Slider vertical />);
    expect(container.firstChild).to.have.class('rs-slider-vertical');
    expect(screen.getByRole('slider')).to.have.attr('aria-orientation', 'vertical');
  });

  it('Should be disabled', () => {
    const onChange = Sinon.spy();
    const onChangeCommitted = Sinon.spy();
    const instance = getDOMNode(
      <Slider disabled onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );

    expect(instance).to.have.class('rs-slider-disabled');
    expect(screen.getByRole('slider')).to.have.attr('aria-disabled', 'true');

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should be readOnly', () => {
    const onChange = Sinon.spy();
    const onChangeCommitted = Sinon.spy();
    const instance = getDOMNode(
      <Slider readOnly onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );

    expect(instance).to.have.class('rs-slider-readonly');
    expect(screen.getByRole('slider')).to.have.attr('readonly');

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should custom render mark', () => {
    const instance = getDOMNode(
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

    // eslint-disable-next-line testing-library/no-node-access
    const marks = instance.querySelectorAll('.rs-slider-mark-content');

    expect(marks[0]).to.have.text('Single');
    expect(marks[1]).to.have.text('1');
    expect(marks[2]).to.have.text('2');
  });

  it('Should render custom title', () => {
    const instance = getDOMNode(<Slider tooltip={false} handleTitle={'test'} />);
    expect(instance).to.have.text('test');
  });

  it('Should handle keyboard operations', () => {
    const instance = getDOMNode(<Slider defaultValue={10} />);
    // eslint-disable-next-line testing-library/no-node-access
    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.querySelector('input[type="range"]') as HTMLInputElement;

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
    const onChangeCommitted = Sinon.spy();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    const instance = getDOMNode(<Slider onChangeCommitted={onChangeCommitted} />);

    // eslint-disable-next-line testing-library/no-node-access
    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
    fireEvent.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);

    expect(handle).to.have.class('active');
    handle.dispatchEvent(mouseupEvent);

    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChangeCommitted` callback when click bar', () => {
    const onChangeCommitted = Sinon.spy();
    const instance = getDOMNode(<Slider onChangeCommitted={onChangeCommitted} />);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChange` callback', () => {
    const onChange = Sinon.spy();
    const instance = getDOMNode(<Slider onChange={onChange} />);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

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
      render(
        <div data-testid="content">
          <Slider value={1} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('1');
    });

    it('Should render "Not selected" if value is empty', () => {
      render(
        <div data-testid="content">
          {/* FIXME `value` prop does not accept null as value */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Slider value={null} plaintext />
        </div>
      );

      expect(screen.getByTestId('content')).to.have.text('Not selected');
    });
  });
});
