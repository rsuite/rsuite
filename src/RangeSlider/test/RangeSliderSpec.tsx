import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import RangeSlider from '../RangeSlider';

import '../../Slider/styles/index.less';

describe('RangeSlider', () => {
  testStandardProps(<RangeSlider />);

  it('Should render a RangeSlider', () => {
    const instance = getDOMNode(<RangeSlider />);
    assert.equal(instance.className, 'rs-slider');
  });

  it('Should have a progress ', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-slider-progress-bar') as HTMLHtmlElement).style.width,
      '40%'
    );
    assert.equal(
      // eslint-disable-next-line testing-library/no-node-access
      (instance.querySelector('.rs-slider-progress-bar') as HTMLElement).style.left,
      '10%'
    );
  });

  it('Should render 2 handles ', () => {
    const instance = getDOMNode(<RangeSlider value={[10, 50]} />);
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.querySelectorAll('.rs-slider-handle').length, 2);
  });

  it('Should output the scale', () => {
    const instance = getDOMNode(<RangeSlider step={10} max={100} graduated />);
    const instance2 = getDOMNode(<RangeSlider min={10} step={10} max={100} graduated />);
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance.querySelectorAll('li').length, 10);
    // eslint-disable-next-line testing-library/no-node-access
    assert.equal(instance2.querySelectorAll('li').length, 9);
  });

  it('Should be displayed vertically', () => {
    const instance = getDOMNode(<RangeSlider vertical />);
    assert.include(instance.className, 'rs-slider-vertical');

    screen.getAllByRole('slider').forEach(slider => {
      expect(slider).to.have.attr('aria-orientation', 'vertical');
    });
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<RangeSlider disabled />);
    assert.include(instance.className, 'rs-slider-disabled');
  });

  it('Should call onChange callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} onChange={onChangeSpy} />);
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(instance.querySelector('.rs-slider-progress-bar') as HTMLElement);

    assert.equal(onChangeSpy.firstCall.firstArg[0], 0);
    assert.equal(onChangeSpy.firstCall.firstArg[1], 50);
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
    assert.equal((instance.querySelector('.rs-slider-handle') as HTMLElement).textContent, 'test');
  });

  it('Should handle keyboard operations', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);
    // eslint-disable-next-line testing-library/no-node-access
    const handle = instance.querySelector('.rs-slider-handle') as HTMLElement;
    const input = screen.getAllByRole('slider')[0] as HTMLInputElement;

    assert.equal(input.value, '10');

    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    assert.equal(input.value, '11');

    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    assert.equal(input.value, '12');

    fireEvent.keyDown(handle, { key: 'ArrowDown' });
    assert.equal(input.value, '11');

    fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    assert.equal(input.value, '10');

    fireEvent.keyDown(handle, { key: 'Home' });
    assert.equal(input.value, '0');

    fireEvent.keyDown(handle, { key: 'End' });
    assert.equal(input.value, '100');
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

    assert.include(handle.className, 'active');

    handle.dispatchEvent(mouseupEvent);
    expect(onChangeCommitted).to.have.been.calledOnce;
  });

  it('Should output an `input` stored value', () => {
    const instance = getDOMNode(<RangeSlider min={10} max={100} value={[20, 50]} />);

    // eslint-disable-next-line testing-library/no-node-access
    const input = instance.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;

    assert.equal(input[0].value, '20');
    assert.equal(input[0].getAttribute('aria-valuenow'), '20');
    assert.equal(input[0].getAttribute('aria-valuemax'), '100');
    assert.equal(input[0].getAttribute('aria-valuemin'), '10');
    assert.equal(input[0].getAttribute('aria-orientation'), 'horizontal');

    assert.equal(input[1].value, '50');
    assert.equal(input[1].getAttribute('aria-valuenow'), '50');
    assert.equal(input[1].getAttribute('aria-valuemax'), '100');
    assert.equal(input[1].getAttribute('aria-valuemin'), '10');
    assert.equal(input[1].getAttribute('aria-orientation'), 'horizontal');
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

    act(() => {
      Simulate.click(sliderBar, { pageX: 0, pageY: 80 });
    });

    act(() => {
      Simulate.click(sliderBar, { pageX: 0, pageY: 0 });
    });

    assert.deepEqual(onChangeSpy.firstCall.firstArg, [20, 50]);

    /**
     * fix: https://github.com/rsuite/rsuite/issues/2425
     * Error thrown before fix: expected [ 100, 20 ] to deeply equal [ 20, 100 ]
     */
    assert.deepEqual(onChangeSpy.secondCall.firstArg, [20, 100]);
  });
});
