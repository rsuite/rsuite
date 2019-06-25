import React from 'react';
import { getDOMNode } from '@test/testUtils';
import IconStack from '../IconStack';

describe('IconStack', () => {
  it('Should render a span', () => {
    const instance = getDOMNode(<IconStack />);
    assert.equal(instance.tagName, 'SPAN');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(
      <IconStack className="custom">
        <span />
      </IconStack>
    );
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(
      <IconStack style={{ fontSize }}>
        <span />
      </IconStack>
    );
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<IconStack classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
