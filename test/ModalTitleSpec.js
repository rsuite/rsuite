import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import ModalTitle from '../src/ModalTitle';

describe('ModalTitle', () => {

  it('Should render a modal title', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle>{title}</ModalTitle>
    );
    assert.equal(findDOMNode(instance).className, 'modal-title');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTitle style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
