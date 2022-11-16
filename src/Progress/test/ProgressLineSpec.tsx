import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import ProgressLine from '../ProgressLine';

describe('Progress - Line', () => {
  testStandardProps(<ProgressLine />);

  it('Should render a Line', () => {
    const instance = getDOMNode(<ProgressLine />);
    assert.ok(instance.className.match(/\brs-progress-line\b/));
  });

  it('Should have a percentage', () => {
    const instance = getDOMNode(<ProgressLine percent={10} />);

    assert.equal(
      (instance.querySelector('.rs-progress-line-bg') as HTMLElement).style.width,
      '10%'
    );
    assert.equal(instance.textContent, '10%');
  });

  it('Should have a height', () => {
    const instance = getDOMNode(<ProgressLine strokeWidth={10} />);
    assert.equal(
      (instance.querySelector('.rs-progress-line-bg') as HTMLElement).style.height,
      '10px'
    );
  });

  it('Should have a background color', () => {
    const instance = getDOMNode(<ProgressLine strokeColor={'#ff0000'} />);
    assert.equal(
      (instance.querySelector('.rs-progress-line-bg') as HTMLElement).style.backgroundColor,
      'rgb(255, 0, 0)'
    );
  });

  it('Should render info', () => {
    const instance = getDOMNode(<ProgressLine />);
    const instance2 = getDOMNode(<ProgressLine showInfo={false} />);

    assert.ok(instance.querySelector('.rs-progress-info'));
    assert.ok(!instance2.querySelector('.rs-progress-info'));
  });

  it('Should render a status', () => {
    const instance = getDOMNode(<ProgressLine status="success" />);
    assert.ok(instance.className.match(/\brs-progress-line-success\b/));
  });

  it('Should be vertical', () => {
    const instance = getDOMNode(<ProgressLine vertical />);
    assert.ok(instance.className.match(/\brs-progress-line-vertical\b/));
  });
});
