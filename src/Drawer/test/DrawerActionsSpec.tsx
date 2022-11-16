import React from 'react';
import { getDOMNode } from '@test/testUtils';

import Drawer from '../index';

describe('Drawer.Actions', () => {
  it('Should render a drawer actions', () => {
    const title = 'Test';
    const instance = getDOMNode(<Drawer.Actions>{title}</Drawer.Actions>);
    assert.equal(instance.className, 'rs-drawer-actions');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Drawer.Actions className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Drawer.Actions style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Drawer.Actions classPrefix="custom-prefix" />);
    assert.include(instance.className, 'custom-prefix');
  });
});
