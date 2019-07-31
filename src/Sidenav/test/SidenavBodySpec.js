import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import SidenavBody from '../SidenavBody';

describe('SidenavBody', () => {
  it('Should render a body', () => {
    const title = 'Test';
    const instance = getDOMNode(<SidenavBody>{title}</SidenavBody>);
    assert.equal(instance.className, 'rs-sidenav-body');
    assert.equal(instance.innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<SidenavBody className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<SidenavBody style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<SidenavBody classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
