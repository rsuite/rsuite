import React from 'react';
import { innerText, getDOMNode } from '@test/testUtils';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  it('Should render a Sidebar', () => {
    const title = 'Test';
    const instance = getDOMNode(<Sidebar>{title}</Sidebar>);
    assert.equal(instance.className, 'rs-sidebar');
    assert.equal(innerText(instance), title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Sidebar className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Sidebar style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Sidebar classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
