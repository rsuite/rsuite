import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Divider from '../Divider';

describe('Divider', () => {
  it('Should render a Divider', () => {
    const instance = getDOMNode(<Divider />);
    const classes = instance.className;

    assert.include(classes, 'rs-divider');
    assert.include(classes, 'rs-divider-horizontal');
  });

  it('Should be vertical', () => {
    const instance = getDOMNode(<Divider vertical />);
    const classes = instance.className;
    assert.include(classes, 'rs-divider-vertical');
  });

  it('Should hava a children', () => {
    const instance = getDOMNode(<Divider>abc</Divider>);
    const classes = instance.className;
    assert.include(classes, 'rs-divider-with-text');
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Divider className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Divider style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Divider classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
