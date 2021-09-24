import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Slider from '../Slider';

describe('Slider', () => {
  it('Should render a Slider', () => {
    const instance = getDOMNode(<Slider />);
    assert.equal(instance.className, 'rs-slider');
  });

  it('Should have a progress ', () => {
    const instance = getDOMNode(<Slider progress defaultValue={50} />);
    assert.equal(instance.querySelector('.rs-slider-progress-bar').style.width, '50%');
  });

  it('Should output the scale', () => {
    const instance = getDOMNode(<Slider step={10} max={100} graduated />);
    const instance2 = getDOMNode(<Slider min={10} step={10} max={100} graduated />);
    assert.equal(instance.querySelectorAll('li').length, 10);
    assert.equal(instance2.querySelectorAll('li').length, 9);
  });

  it('Should be displayed vertically', () => {
    const instance = getDOMNode(<Slider vertical />);
    assert.include(instance.className, 'rs-slider-vertical');
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Slider disabled />);
    assert.include(instance.className, 'rs-slider-disabled');
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

    const marks = instance.querySelectorAll('.rs-slider-mark-content');
    assert.equal(marks[0].innerText, 'Single');
    assert.equal(marks[1].innerText, 1);
    assert.equal(marks[2].innerText, 2);
  });

  it('Should render custom title', () => {
    const instance = getDOMNode(<Slider tooltip={false} handleTitle={'test'} />);
    assert.equal(instance.innerText, 'test');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Slider className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Slider style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Slider classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });

  it('Should handle keyboard operations', () => {
    const instance = getDOMNode(<Slider defaultValue={10} />);
    const handle = instance.querySelector('[role="slider"]');
    assert.equal(handle.getAttribute('aria-valuenow'), '10');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowUp' });
    assert.equal(handle.getAttribute('aria-valuenow'), '11');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowRight' });
    assert.equal(handle.getAttribute('aria-valuenow'), '12');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowDown' });
    assert.equal(handle.getAttribute('aria-valuenow'), '11');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'ArrowLeft' });
    assert.equal(handle.getAttribute('aria-valuenow'), '10');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'Home' });
    assert.equal(handle.getAttribute('aria-valuenow'), '0');

    ReactTestUtils.Simulate.keyDown(handle, { key: 'End' });
    assert.equal(handle.getAttribute('aria-valuenow'), '100');
  });

  it('Should call `onChangeCommitted` callback', done => {
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    const instance = getDOMNode(<Slider onChangeCommitted={() => done()} />);

    const handle = instance.querySelector('.rs-slider-handle');
    ReactTestUtils.Simulate.mouseDown(handle);
    handle.dispatchEvent(mousemoveEvent);
    handle.dispatchEvent(mouseupEvent);

    assert.include(handle.className, 'active');
  });

  it('Should be plaintext', () => {
    const instance = getDOMNode(<Slider plaintext />);

    assert.include(instance.className, 'rs-plaintext');
    assert.equal(instance.innerText, 'Not selected');
    assert.notInclude(instance.className, 'rs-slider');
  });

  it('Should call `onChange` callback', done => {
    const instance = getDOMNode(<Slider onChange={() => done()} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-slider-bar'));
  });
});
