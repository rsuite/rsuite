import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SidenavHeader from '../src/SidenavHeader';

describe('SidenavHeader', () => {
  it('Should render a header', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<SidenavHeader>{title}</SidenavHeader>);
    assert.equal(findDOMNode(instance).className, 'rs-sidenav-header');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SidenavHeader className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<SidenavHeader style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
