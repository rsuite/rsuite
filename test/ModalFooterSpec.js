import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ModalFooter from '../src/ModalFooter';

describe('ModalFooter', () => {
  it('Should render a modal footer', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(<ModalFooter>{title}</ModalFooter>);
    assert.equal(findDOMNode(instance).className, 'rs-modal-footer');
    assert.equal(findDOMNode(instance).innerHTML, title);
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(<ModalFooter className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(<ModalFooter style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });
});
