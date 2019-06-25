import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Grid from '../Grid';

describe('Grid', () => {
  it('Should render a container', () => {
    let title = 'Test';
    let instance = getDOMNode(<Grid>{title}</Grid>);
    assert.equal(instance.className, 'rs-grid-container');
    assert.equal(instance.innerHTML, title);
  });

  it('Should render a fluid container', () => {
    let title = 'Test';
    let instance = getDOMNode(<Grid fluid>{title}</Grid>);
    assert.equal(instance.className, 'rs-grid-container-fluid');
  });

  it('Should have a custom className', () => {
    let instance = getDOMNode(<Grid className="custom" />);
    assert.ok(instance.className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = getDOMNode(<Grid style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Grid classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
