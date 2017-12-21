import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import ModalBody from '../src/ModalBody';
import { globalKey } from '../src/utils/prefix';

describe('ModalBody', () => {

  it('Should render a modal body', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalBody>{title}</ModalBody>
    );
    assert.equal(findDOMNode(instance).className, `${globalKey}modal-body`);
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalBody className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalBody style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
