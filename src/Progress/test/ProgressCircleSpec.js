import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import ProgressCircle from '../ProgressCircle';

describe('Progress - Circle', () => {
  it('Should render a Circle', () => {
    const instance = getDOMNode(<ProgressCircle />);
    assert.ok(instance.className.match(/\brs-progress-circle\b/));
  });

  it('Should have a percentage', () => {
    const instance = getDOMNode(<ProgressCircle percent={10} />);
    assert.equal(innerText(instance), '10%');
  });

  it('Should have a width', () => {
    const instance = getDOMNode(<ProgressCircle trailWidth={0} percent={1} strokeWidth={10} />);

    assert.equal(instance.querySelector('.rs-progress-trail').getAttribute('stroke-width'), '10');
    assert.equal(instance.querySelector('.rs-progress-stroke').getAttribute('stroke-width'), '10');
  });

  it('Should have a background color', () => {
    const instance = getDOMNode(<ProgressCircle strokeColor={'#ff0000'} />);

    assert.equal(instance.querySelector('.rs-progress-stroke').style.stroke, 'rgb(255, 0, 0)');
  });

  it('Should render info', () => {
    const instance = getDOMNode(<ProgressCircle />);
    const instance2 = getDOMNode(<ProgressCircle showInfo={false} />);

    assert.ok(instance.querySelector('.rs-progress-circle-info'));
    assert.ok(!instance2.querySelector('.rs-progress-circle-info'));
  });

  it('Should render a status', () => {
    const instance = getDOMNode(<ProgressCircle status="success" />);
    assert.ok(instance.className.match(/\brs-progress-circle-success\b/));
  });

  it('Should be able to customize the Path type', () => {
    const instance = getDOMNode(<ProgressCircle strokeLinecap="butt" />);

    assert.equal(
      instance.querySelector('.rs-progress-stroke').getAttribute('stroke-linecap'),
      'butt'
    );
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ProgressCircle className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ProgressCircle style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ProgressCircle classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
