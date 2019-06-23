import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import ModalHeader from '../ModalHeader';
import { innerText } from '@test/testUtils';

describe('ModalHeader', () => {
  it('Should render a modal header', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(<ModalHeader>{title}</ModalHeader>);
    assert.equal(findDOMNode(instance).className, 'rs-modal-header');
    assert.equal(innerText(findDOMNode(instance)), '×Test');
  });

  it('Should hide close button', () => {
    let title = 'Test';
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalHeader closeButton={false}>{title}</ModalHeader>
    );
    assert.ok(!findDOMNode(instance).querySelector('button'));
  });

  it('Should call onHide callback', done => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(<ModalHeader onHide={doneOp} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-modal-header-close'));
  });

  it('Should have a custom className', () => {
    let instance = ReactTestUtils.renderIntoDocument(<ModalHeader className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    let instance = ReactTestUtils.renderIntoDocument(<ModalHeader style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<ModalHeader classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });
});
