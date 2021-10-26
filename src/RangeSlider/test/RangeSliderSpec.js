import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import RangeSlider from '../RangeSlider';

describe('RangeSlider', () => {
  it('Should render a RangeSlider', () => {
    const instance = getDOMNode(<RangeSlider />);
    assert.equal(instance.className, 'rs-slider');
  });

  it('Should have a progress ', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);
    assert.equal(instance.querySelector('.rs-slider-progress-bar').style.width, '40%');
    assert.equal(instance.querySelector('.rs-slider-progress-bar').style.left, '10%');
  });

  it('Should render 2 handles ', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);
    assert.equal(instance.querySelectorAll('.rs-slider-handle').length, 2);
  });

  it('Should output the scale', () => {
    const instance = getDOMNode(<RangeSlider step={10} max={100} graduated />);
    const instance2 = getDOMNode(<RangeSlider min={10} step={10} max={100} graduated />);
    assert.equal(instance.querySelectorAll('li').length, 10);
    assert.equal(instance2.querySelectorAll('li').length, 9);
  });

  it('Should be displayed vertically', () => {
    const instance = getDOMNode(<RangeSlider vertical />);
    assert.include(instance.className, 'rs-slider-vertical');
    assert.equal(instance.querySelector('input').getAttribute('aria-orientation'), 'vertical');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<RangeSlider disabled />);
    assert.include(instance.className, 'rs-slider-disabled');
  });

  it('Should call onChange callback', () => {
    const onChangeSpy = sinon.spy();
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} onChange={onChangeSpy} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-slider-progress-bar'));

    assert.equal(onChangeSpy.firstCall.firstArg[0], 0);
    assert.equal(onChangeSpy.firstCall.firstArg[1], 50);
  });

  it('Should render custom title', () => {
    const instance = getDOMNode(<RangeSlider tooltip={false} handleTitle={'test'} />);
    assert.equal(instance.querySelector('.rs-slider-handle').textContent, 'test');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<RangeSlider className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<RangeSlider style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<RangeSlider classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should handle keyboard operations', () => {
    const instance = getDOMNode(<RangeSlider defaultValue={[10, 50]} />);
    const handle = instance.querySelector('.rs-slider-handle');
    const input = instance.querySelector('input[type="range"]');

    assert.equal(input.value, '10');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowUp' });
    assert.equal(input.value, '11');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowRight' });
    assert.equal(input.value, '12');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowDown' });
    assert.equal(input.value, '11');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowLeft' });
    assert.equal(input.value, '10');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'Home' });
    assert.equal(input.value, '0');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'End' });
    assert.equal(input.value, '100');
  });

  it('Should call `onChangeCommitted` callback', done => {
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    const instance = getDOMNode(<RangeSlider onChangeCommitted={() => done()} />);

    const handle = instance.querySelector('.rs-slider-handle');
    ReactTestUtils.Simulate.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);
    handle.dispatchEvent(mouseupEvent);

    assert.include(handle.className, 'active');
  });

  it('Should call `onChange` callback', done => {
    const instance = getDOMNode(<RangeSlider onChange={() => done()} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-slider-bar'));
  });

  it('Should output an `input` stored value', () => {
    const instance = getDOMNode(<RangeSlider min={10} max={100} value={[20, 50]} />);

    const input = instance.querySelectorAll('input[type="range"]');

    assert.equal(input[0].value, 20);
    assert.equal(input[0].getAttribute('aria-valuenow'), 20);
    assert.equal(input[0].getAttribute('aria-valuemax'), 100);
    assert.equal(input[0].getAttribute('aria-valuemin'), 10);
    assert.equal(input[0].getAttribute('aria-orientation'), 'horizontal');

    assert.equal(input[1].value, 50);
    assert.equal(input[1].getAttribute('aria-valuenow'), 50);
    assert.equal(input[1].getAttribute('aria-valuemax'), 100);
    assert.equal(input[1].getAttribute('aria-valuemin'), 10);
    assert.equal(input[1].getAttribute('aria-orientation'), 'horizontal');
  });
});
