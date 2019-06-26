import React from 'react';
import { getDOMNode } from '@test/testUtils';

import SidenavHeader from '../SidenavHeader';

describe('SidenavHeader', () => {
  it('Should render a header', () => {
    const title = 'Test';
    const instance = getDOMNode(<SidenavHeader>{title}</SidenavHeader>);
    assert.equal(instance.className, 'rs-sidenav-header');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<SidenavHeader className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<SidenavHeader style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<SidenavHeader classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
