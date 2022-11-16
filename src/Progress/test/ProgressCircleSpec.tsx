import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import ProgressCircle from '../ProgressCircle';

describe('Progress - Circle', () => {
  testStandardProps(<ProgressCircle />, {
    customClassName: false
  });

  it('Should render a Circle', () => {
    const instance = getDOMNode(<ProgressCircle />);
    assert.ok(instance.className.match(/\brs-progress-circle\b/));
  });

  it('Should have a percentage', () => {
    const instance = getDOMNode(<ProgressCircle percent={10} />);
    assert.equal(instance.textContent, '10%');
  });

  it('Should have a width', () => {
    const instance = getDOMNode(<ProgressCircle trailWidth={0} percent={1} strokeWidth={10} />);

    assert.equal(
      (instance.querySelector('.rs-progress-trail') as HTMLElement).getAttribute('stroke-width'),
      '10'
    );
    assert.equal(
      (instance.querySelector('.rs-progress-stroke') as HTMLElement).getAttribute('stroke-width'),
      '10'
    );
  });

  it('Should have a background color', () => {
    const instance = getDOMNode(<ProgressCircle strokeColor={'#ff0000'} />);

    assert.equal(
      (instance.querySelector('.rs-progress-stroke') as HTMLElement).style.stroke,
      'rgb(255, 0, 0)'
    );
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
      (instance.querySelector('.rs-progress-stroke') as HTMLElement).getAttribute('stroke-linecap'),
      'butt'
    );
  });

  it('Should render start position by `gapPosition`', () => {
    const instance1 = getDOMNode(<ProgressCircle gapPosition="top" />);
    const instance2 = getDOMNode(<ProgressCircle gapPosition="bottom" />);
    const instance3 = getDOMNode(<ProgressCircle gapPosition="left" />);
    const instance4 = getDOMNode(<ProgressCircle gapPosition="right" />);

    assert.equal(
      (instance1.querySelector('.rs-progress-trail') as HTMLElement).getAttribute('d'),
      'M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94'
    );

    assert.equal(
      (instance2.querySelector('.rs-progress-trail') as HTMLElement).getAttribute('d'),
      'M 50,50 m 0,47 a 47,47 0 1 1 0,-94 a 47,47 0 1 1 0,94'
    );

    assert.equal(
      (instance3.querySelector('.rs-progress-trail') as HTMLElement).getAttribute('d'),
      'M 50,50 m -47,0 a 47,47 0 1 1 94,0 a 47,47 0 1 1 -94,0'
    );

    assert.equal(
      (instance4.querySelector('.rs-progress-trail') as HTMLElement).getAttribute('d'),
      'M 50,50 m 47,0 a 47,47 0 1 1 -94,0 a 47,47 0 1 1 94,0'
    );
  });
});
