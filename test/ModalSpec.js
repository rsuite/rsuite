import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Modal from '../src/Modal';

describe('Modal', () => {
  it('Should render the modal content', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal show>
        <p>message</p>
      </Modal>
    );
    assert.equal(instance.modal.getDialogElement().querySelectorAll('p').length, 1);
  });

  it('Should close the modal when the modal dialog is clicked', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(<Modal show onHide={doneOp} />);
    const dialog = instance.modal.getDialogElement();

    ReactTestUtils.Simulate.click(dialog);
  });


  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal show onHide={onHideSpy} backdrop="static" />
    );
    const dialog = instance.modal.getDialogElement();
    ReactTestUtils.Simulate.click(dialog);

    assert.ok(!onHideSpy.calledOnce);
  });

  it('Should be automatic height', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal className="custom" overflow show>
        <Modal.Body style={{ height: 2000 }} />
      </Modal>
    );
    assert.ok(findDOMNode(instance.dialog).querySelector('.rs-modal-body').style.overflow, 'auto');
  });

  it('Should call onHide callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal className="custom" show onHide={doneOp}>
        <Modal.Header />
      </Modal>
    );
    const closeButton = findDOMNode(instance.dialog).querySelector('.rs-modal-header-close');
    ReactTestUtils.Simulate.click(closeButton);
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<Modal className="custom" show />);
    assert.ok(findDOMNode(instance.dialog).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<Modal style={{ fontSize }} show />);
    assert.equal(findDOMNode(instance.dialog).style.fontSize, fontSize);
  });
});
