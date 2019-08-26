import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette,
  inChrome
} from '@test/testUtils';

import '../styles/index';

const { H700 } = getDefaultPalette();

describe('NavItem styles', () => {
  it('Default NavItem should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Nav>
        <Nav.Item ref={instanceRef}>Text</Nav.Item>
      </Nav>,
      createTestContainer()
    );
    const navItemContentDom = getDOMNode(instanceRef.current).querySelector('.rs-nav-item-content');
    inChrome && assert.equal(getStyle(navItemContentDom, 'padding'), '8px 12px', 'NavItem padding');
    assert.equal(getStyle(navItemContentDom, 'color'), toRGB('#8e8e93'), 'NavItem color');
  });

  it('Default NavItem should render the correct styles when active', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Nav>
        <Nav.Item ref={instanceRef} active>
          Active
        </Nav.Item>
      </Nav>,
      createTestContainer()
    );
    const navItemContentDom = getDOMNode(instanceRef.current).querySelector('.rs-nav-item-content');
    assert.equal(getStyle(navItemContentDom, 'color'), H700, 'NavItem color');
  });

  it('Default NavItem should render the correct styles when disabled', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(
      <Nav>
        <Nav.Item ref={instanceRef} disabled>
          Disabled
        </Nav.Item>
      </Nav>,
      createTestContainer()
    );
    const navItemContentDom = getDOMNode(instanceRef.current).querySelector('.rs-nav-item-content');
    assert.equal(getStyle(navItemContentDom, 'color'), toRGB('#c5c6c7'), 'NavItem color');
    assert.equal(getStyle(navItemContentDom, 'cursor'), 'not-allowed', 'NavItem cursor');
  });
});
