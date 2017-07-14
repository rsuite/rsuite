import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Sidebar from '../src/Sidebar';

describe('Sidebar', () => {

  it('Should render a Sidebar', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Sidebar>{title}</Sidebar>
    );
    assert.equal(findDOMNode(instance).className, 'sidebar-wrapper');
    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Sidebar className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Sidebar style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
