import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import DropdownToggle from '../src/DropdownToggle';

describe('DropdownToggle', () => {

  it('Should render a button', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle>{title}</DropdownToggle>
    );

    assert.ok(findDOMNode(instance).className.match(/\bdropdown-toggle\b/));
    assert.ok(findDOMNode(instance).querySelector('.caret'));
    assert.equal(findDOMNode(instance).tagName, 'BUTTON');
    assert.equal(findDOMNode(instance).innerText, title);


  });

  it('Should have a title', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle title={title} />
    );

    assert.equal(findDOMNode(instance).innerText, title);
  });

  it('Should not render caret', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle noCaret />
    );

    assert.ok(!findDOMNode(instance).querySelector('.caret'));
  });

  it('Should render an Anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle useAnchor />
    );

    assert.equal(findDOMNode(instance).tagName, 'A');
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
