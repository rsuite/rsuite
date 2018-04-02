import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import NavbarBody from '../src/NavbarBody';

describe('NavbarBody', () => {
  it('Should render a body', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<NavbarBody>{title}</NavbarBody>);
    assert.equal(findDOMNode(instance).className, 'rs-navbar-body');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<NavbarBody className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<NavbarBody style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
