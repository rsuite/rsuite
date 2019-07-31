import React from 'react';
import { getDOMNode } from '@test/testUtils';
import PlaceholderGraph from '../PlaceholderGraph';

describe('PlaceholderGraph', () => {
  it('Should render a PlaceholderGraph', () => {
    const instance = getDOMNode(<PlaceholderGraph />);

    assert.equal(instance.tagName, 'DIV');
    assert.equal(instance.className, 'rs-placeholder rs-placeholder-graph');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<PlaceholderGraph style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<PlaceholderGraph classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Height should be 100px', () => {
    const instance = getDOMNode(<PlaceholderGraph height={100} />);

    assert.equal(instance.style.height, '100px');
  });

  it('Width should be 100px', () => {
    const instance = getDOMNode(<PlaceholderGraph width={100} />);

    assert.equal(instance.style.width, '100px');
  });

  it('Should has animation', () => {
    const instance = getDOMNode(<PlaceholderGraph active />);

    assert.include(Array.from(instance.classList), 'rs-placeholder-active');
  });
});
