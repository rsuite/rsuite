import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Carousel from '../Carousel';

describe('Carousel', () => {
  it('Should have a custom className', () => {
    const instance = getDOMNode(<Carousel className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Carousel style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Carousel classPrefix="custom-prefix" md={1} />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
