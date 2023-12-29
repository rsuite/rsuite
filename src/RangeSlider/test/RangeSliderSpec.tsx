import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import sinon from 'sinon';
import { getDOMNode, testStandardProps } from '@test/utils';
import RangeSlider from '../RangeSlider';
import { addStyle } from 'dom-lib';

import '../../Slider/styles/index.less';

describe('RangeSlider', () => {
  testStandardProps(<RangeSlider />);

  it('Should render a RangeSlider', () => {
    const instance = getDOMNode(<RangeSlider />);
    expect(instance).to.have.class('rs-slider');
  });

  it('Should have a progress ', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-slider-progress-bar') as HTMLHtmlElement).style.width
    ).to.equal('40%');

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-slider-progress-bar') as HTMLElement).style.left
    ).to.equal('10%');
  });

  it('Should render 2 handles ', () => {
    render(<RangeSlider value={[10, 50]} />);
    expect(screen.getAllByRole('slider')).to.have.length(2);
  });

  it('Should output the scale', () => {
    const instance = getDOMNode(<RangeSlider step={10} max={100} graduated />);
    const instance2 = getDOMNode(<RangeSlider min={10} step={10} max={100} graduated />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.querySelectorAll('li')).to.have.length(10);
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance2.querySelectorAll('li')).to.have.length(9);
  });

  it('Should be displayed vertically', () => {
    const instance = getDOMNode(<RangeSlider vertical />);

    expect(instance).to.have.class('rs-slider-vertical');

    screen.getAllByRole('slider').forEach(slider => {
      expect(slider).to.have.attr('aria-orientation', 'vertical');
    });
  });

  it('Should be disabled', () => {
    const onChange = sinon.spy();
    const onChangeCommitted = sinon.spy();

    const instance = getDOMNode(
      <RangeSlider disabled onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );
    expect(instance).to.have.class('rs-slider-disabled');
    expect(screen.queryAllByRole('slider')[0]).to.have.attr('aria-disabled', 'true');
    expect(screen.queryAllByRole('slider')[1]).to.have.attr('aria-disabled', 'true');

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should be readOnly', () => {
    const onChange = sinon.spy();
    const onChangeCommitted = sinon.spy();

    const instance = getDOMNode(
      <RangeSlider readOnly onChange={onChange} onChangeCommitted={onChangeCommitted} />
    );
    expect(screen.queryAllByRole('slider')[0]).to.have.attr('readonly');
    expect(screen.queryAllByRole('slider')[1]).to.have.attr('readonly');

    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChange).to.have.not.been.called;
    expect(onChangeCommitted).to.have.not.been.called;
  });

  it('Should call onChange callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} onChange={onChangeSpy} />);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-progress-bar') as HTMLElement);

    expect(onChangeSpy).to.have.been.calledWith([0, 50]);
  });

  it('Should respond to keyboard event', async () => {
    const onChange = sinon.spy();
    render(<RangeSlider value={[10, 50]} onChange={onChange} />);

    // FIXME Should dispatch event on [role=slider] directly
    fireEvent.keyDown(
      // eslint-disable-next-line testing-library/no-node-access
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

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    fireEvent.click(container.querySelector('.rs-slider-progress-bar') as HTMLElement);
    expect(onChange).not.to.have.been.called;

    fireEvent.keyDown(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getAllByRole('slider')[0].closest('.rs-slider-handle') as HTMLElement,
      {
        key: 'ArrowRight'
      }
    );
    expect(onChange).not.to.have.been.called;
  });

  it('Should render custom title', () => {
    const instance = getDOMNode(<RangeSlider tooltip={false} handleTitle={'test'} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(instance.querySelector('.rs-slider-handle')).to.have.text('test');
  });

  it('Should handle keyboard operations', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);
    // eslint-disable-next-line testing-library/no-node-access
    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
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
    const instance = getDOMNode(<RangeSlider onChangeCommitted={onChangeCommitted} />);

    // eslint-disable-next-line testing-library/no-node-access
    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
    fireEvent.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);

    expect(handle).to.have.class('active');

    handle.dispatchEvent(mouseupEvent);
    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should call `onChangeCommitted` callback when click bar', () => {
    const onChangeCommitted = sinon.spy();
    const instance = getDOMNode(
      <RangeSlider defaultValue={[10, 50]} onChangeCommitted={onChangeCommitted} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-bar') as HTMLElement);

    expect(onChangeCommitted).to.have.been.calledWith([0, 50]);
  });

  it('Should output an `input` stored value', () => {
    const instance = getDOMNode(<RangeSlider min={10} max={100} value={[20, 50]} />);

    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;

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
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(
      <RangeSlider
        style={{ height: 100 }}
        defaultValue={[10, 50]}
        onChange={onChangeSpy}
        vertical
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    const sliderBar = instance.querySelector('.rs-slider-bar') as HTMLElement;

    // `margin` will cause the values of `pageX` and `pageY` to be inaccurate in the test environment, so you need to set them manually here.
    addStyle(document.body, 'margin', '0');

    act(() => {
      Simulate.click(sliderBar, { pageX: 0, pageY: 80 });
    });

    expect(onChangeSpy).to.have.been.calledWith([20, 50]);

    act(() => {
      Simulate.click(sliderBar, { pageX: 0, pageY: 0 });
    });

    /**
     * fix: https://github.com/rsuite/rsuite/issues/2425
     * Error thrown before fix: expected [ 100, 20 ] to deeply equal [ 20, 100 ]
     */
    expect(onChangeSpy).to.have.been.calledWith([20, 100]);

    expect(onChangeSpy).to.have.been.calledTwice;
  });
});
