import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SidenavBody from '../src/SidenavBody';

describe('SidenavBody', () => {
  it('Should render a body', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<SidenavBody>{title}</SidenavBody>);
    assert.equal(findDOMNode(instance).className, 'rs-sidenav-body');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SidenavBody className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<SidenavBody style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SidenavBody classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
