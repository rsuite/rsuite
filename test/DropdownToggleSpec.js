import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import DropdownToggle from '../src/DropdownToggle';
import innerText from './innerText';
import { globalKey } from '../src/utils/prefix';

describe('DropdownToggle', () => {

  it('Should render a toggle', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle>{title}</DropdownToggle>
    );

    assert.ok(findDOMNode(instance).className.match(/\bdropdown-toggle\b/));
    assert.ok(findDOMNode(instance).querySelector(`.${globalKey}dropdown-toggle-caret`));
    assert.equal(innerText(findDOMNode(instance)), title);

  });

  it('Should have a title', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <DropdownToggle >{title}</DropdownToggle>
    );
    assert.equal(innerText(findDOMNode(instance)), title);
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
