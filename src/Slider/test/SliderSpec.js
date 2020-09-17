import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
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
    assert.ok(instance.className.match(/\brs-slider-vertical\b/));
  });

  it('Should be disabled', () => {
    const instance = getDOMNode(<Slider disabled />);
    assert.ok(instance.className.match(/\brs-slider-disabled\b/));
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
    assert.equal(innerText(instance), 'test');
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
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
