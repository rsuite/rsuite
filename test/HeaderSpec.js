import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Header from '../src/Header';
import innerText from './innerText';

describe('Header', () => {

  it('Should render a Header', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <Header>{title}</Header>
    );
    assert.ok(findDOMNode(instance).className.match(/\bheader\b/));
    assert.equal(innerText(findDOMNode(instance)), title);
  });


  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Header className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <Header style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
