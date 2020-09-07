import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getInstance } from '@test/testUtils';

import Modal from '../Modal';

describe('Modal', () => {
  it('Should render the modal content', () => {
    const instance = getInstance(
      <Modal open>
        <p>message</p>
      </Modal>
    );

    assert.equal(instance.querySelectorAll('p').length, 1);
  });

  it('Should close the modal when the modal dialog is clicked', done => {
    const doneOp = () => {
      done();
    };

    const instance = getInstance(<Modal open onClose={doneOp} />);

    ReactTestUtils.Simulate.click(instance.querySelector('.rs-modal-backdrop'));
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onCloseSpy = sinon.spy();
    const instance = getInstance(<Modal open onClose={onCloseSpy} backdrop="static" />);
    ReactTestUtils.Simulate.click(instance);

    assert.ok(!onCloseSpy.calledOnce);
  });

  it('Should be automatic height', () => {
    const instance = getInstance(
      <Modal className="custom" overflow open>
        <Modal.Body style={{ height: 2000 }} />
      </Modal>
    );
    assert.ok(instance.querySelector('.rs-modal-body').style.overflow, 'auto');
  });

  it('Should call onClose callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getInstance(
      <Modal className="custom" open onClose={doneOp}>
        <Modal.Header />
      </Modal>
    );
    const closeButton = instance.querySelector('.rs-modal-header-close');
    ReactTestUtils.Simulate.click(closeButton);
  });

  it('Should call onExited callback', done => {
    const doneOp = () => {
      done();
    };

    const ref = React.createRef();

    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          open: true
        };
        this.handleClose = this.handleClose.bind(this);
      }
      handleClose() {
        this.setState({
          open: false
        });
      }
      render() {
        return (
          <Modal
            className="custom"
            ref={ref}
            open={this.state.open}
            onClose={this.handleClose}
            onExited={doneOp}
          >
            <Modal.Header />
          </Modal>
        );
      }
    }
    getInstance(<Demo />);
    const closeButton = ref.current.querySelector('.rs-modal-header-close');
    ReactTestUtils.Simulate.click(closeButton);
  });

  it('Should have a custom className', () => {
    const instance = getInstance(<Modal className="custom" open />);
    assert.ok(instance.querySelector('.custom'));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getInstance(<Modal style={{ fontSize }} open />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getInstance(<Modal classPrefix="custom-prefix" open />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
