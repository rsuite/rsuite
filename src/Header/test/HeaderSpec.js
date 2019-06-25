import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import Header from '../Header';

describe('Header', () => {
  it('Should render a Header', () => {
    const title = 'Test';
    const instance = getDOMNode(<Header>{title}</Header>);
    assert.include(instance.className, 'rs-header');
    assert.equal(innerText(instance), title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Header className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Header style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Header classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
