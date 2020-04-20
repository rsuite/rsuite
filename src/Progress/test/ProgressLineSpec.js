import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import ProgressLine from '../ProgressLine';

describe('Progress - Line', () => {
  it('Should render a Line', () => {
    const instance = getDOMNode(<ProgressLine />);
    assert.ok(instance.className.match(/\brs-progress-line\b/));
  });

  it('Should have a percentage', () => {
    const instance = getDOMNode(<ProgressLine percent={10} />);

    assert.equal(instance.querySelector('.rs-progress-line-bg').style.width, '10%');
    assert.equal(innerText(instance), '10%');
  });

  it('Should have a height', () => {
    const instance = getDOMNode(<ProgressLine strokeWidth={10} />);
    assert.equal(instance.querySelector('.rs-progress-line-bg').style.height, '10px');
  });

  it('Should have a background color', () => {
    const instance = getDOMNode(<ProgressLine strokeColor={'#ff0000'} />);
    assert.equal(
      instance.querySelector('.rs-progress-line-bg').style.backgroundColor,
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

  it('Should have a custom className', () => {
    const instance = getDOMNode(<ProgressLine className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<ProgressLine style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<ProgressLine classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should be vertical', () => {
    const instance = getDOMNode(<ProgressLine vertical />);
    assert.ok(instance.className.match(/\brs-progress-line-vertical\b/));
  });
});
