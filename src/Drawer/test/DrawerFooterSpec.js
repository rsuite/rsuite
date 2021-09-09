import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../index';

describe('Drawer.Footer', () => {
  it('Should render a drawer footer', () => {
    const title = 'Test';
    const instance = getDOMNode(<Drawer.Footer>{title}</Drawer.Footer>);
    assert.equal(instance.className, 'rs-drawer-footer');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer.Footer className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer.Footer style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer.Footer classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });
});
