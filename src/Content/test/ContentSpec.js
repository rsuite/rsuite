import React from 'react';
import { getDOMNode } from '@test/testUtils';
import Content from '../Content';
import { innerText } from '@test/testUtils';

describe('Content', () => {
  it('Should render a Content', () => {
    const title = 'Test';
    const instance = getDOMNode(<Content>{title}</Content>);

    assert.equal(instance.className, 'rs-content');
    assert.equal(innerText(instance), title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Content className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Content style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Content classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
