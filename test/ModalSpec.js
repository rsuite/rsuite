import React from 'react';
import ReactDOM, { findDOMNode, render } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';


import Modal from '../src/Modal';

describe('Modal', () => {
  let mountPoint;
  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(mountPoint);
    document.body.removeChild(mountPoint);
  });

  it('Should render the modal content', () => {
    let instance = render(<Modal show ><p>message</p></Modal>, mountPoint);
    assert.equal(instance.modal.getDialogElement().querySelectorAll('p').length, 1);
  });

  it('Should close the modal when the modal dialog is clicked', (done) => {
    const doneOp = () => {
      done();
    };

    const instance = render(<Modal show onHide={doneOp} />, mountPoint);
    const dialog = instance.modal.getDialogElement();

    ReactTestUtils.Simulate.click(dialog);
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onHideSpy = sinon.spy();

    const instance = render(
      <Modal
        show
        onHide={onHideSpy}
        backdrop="static"
      />, mountPoint);
    const dialog = instance.modal.getDialogElement();

    ReactTestUtils.Simulate.click(dialog);

    assert.ok(!onHideSpy.calledOnce);

  });

  it('Should be automatic height', () => {
    const instance = render(
      <Modal className="custom" autoResizeHeight show >
        <Modal.Body style={{ height: 2000 }}></Modal.Body>
      </Modal>
      , mountPoint);
    assert.ok(findDOMNode(instance.dialog).querySelector('.modal-body').style.overflow, 'auto');
  });

  it('Should call onHide callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = render(
      <Modal className="custom" show onHide={doneOp} >
        <Modal.Header />
      </Modal>
      , mountPoint);
    const closeButton = findDOMNode(instance.dialog).querySelector('.close');
    ReactTestUtils.Simulate.click(closeButton);
  });

  it('Should have a custom className', () => {
    const instance = render(
      <Modal className="custom" show />
      , mountPoint);

    assert.ok(findDOMNode(instance.dialog).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = render(
      <Modal style={{ fontSize }} show />
      , mountPoint);
    assert.equal(findDOMNode(instance.dialog).style.fontSize, fontSize);
  });

});
