import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../index';

describe('Drawer.Title', () => {
  it('Should render a drawer title', () => {
    const title = 'Test';
    const instance = getDOMNode(<Drawer.Title>{title}</Drawer.Title>);
    assert.equal(instance.className, 'rs-drawer-title');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer.Title className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer.Title style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer.Title classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });
});
