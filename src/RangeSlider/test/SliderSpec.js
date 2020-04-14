import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import RangeSlider from '../RangeSlider';
import ReactTestUtils from 'react-dom/test-utils';

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
    assert.ok(instance.className.match(/\brs-slider-vertical\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<RangeSlider disabled />);
    assert.ok(instance.className.match(/\brs-slider-disabled\b/));
  });

  it('Should call onChange callback', done => {
    const instance = getDOMNode(
      <RangeSlider
        defaultValue={[10, 50]}
        onChange={value => {
          if (value[0] === 0 && value[1] === 50) {
            done();
          }
        }}
      />
    );
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-slider-progress-bar'));
  });

  it('Should render custom title', () => {
    const instance = getDOMNode(<RangeSlider tooltip={false} handleTitle={'test'} />);
    assert.equal(innerText(instance.querySelector('.rs-slider-handle')), 'test');
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
});
