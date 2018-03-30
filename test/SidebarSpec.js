import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Sidebar from '../src/Sidebar';
import innerText from './innerText';

describe('Sidebar', () => {
  it('Should render a Sidebar', () => {
    const title = 'Test';
    const instance = ReactTestUtils.renderIntoDocument(<Sidebar>{title}</Sidebar>);
    assert.equal(findDOMNode(instance).className, 'rs-sidebar');
    assert.equal(innerText(findDOMNode(instance)), title);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Sidebar className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Sidebar style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
