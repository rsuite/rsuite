import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import Modal from '../Modal';
import SelectPicker from '../../SelectPicker';

describe('Modal', () => {
  it('Should render the modal content', () => {
    const instance = getDOMNode(
      <Modal open>
        <p>message</p>
      </Modal>
    );

    assert.equal(instance.querySelectorAll('p').length, 1);
  });

  it('Should close the modal when the modal dialog is clicked', () => {
    const onCloseSpy = sinon.spy();
    const { getByTestId } = render(<Modal data-testid="wrapper" open onClose={onCloseSpy} />);

    fireEvent.click(getByTestId('wrapper'));

    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onCloseSpy = sinon.spy();
    const { getByTestId } = render(
      <Modal data-testid="wrapper" open onClose={onCloseSpy} backdrop="static" />
    );

    fireEvent.click(getByTestId('wrapper'));

    assert.isFalse(onCloseSpy.calledOnce);
  });

  it('Should not close the modal when clicking inside the dialog', () => {
    const onCloseSpy = sinon.spy();
    const { getByRole } = render(<Modal open onClose={onCloseSpy} />);

    fireEvent.click(getByRole('dialog'));
    fireEvent.click(getByRole('document'));

    assert.isFalse(onCloseSpy.calledOnce);
  });

  it('Should be automatic height', () => {
    const instance = getDOMNode(
      <Modal overflow open>
        <Modal.Body style={{ height: 2000 }} />
      </Modal>
    );
    assert.equal(instance.querySelector('.rs-modal-body').style.overflow, 'auto');
  });

  it('Should call onClose callback', () => {
    const onCloseSpy = sinon.spy();
    const instance = getDOMNode(
      <Modal open onClose={onCloseSpy}>
        <Modal.Header />
      </Modal>
    );
    const closeButton = instance.querySelector('.rs-modal-header-close');
    ReactTestUtils.Simulate.click(closeButton);

    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should call onExited callback', async () => {
    const onExitedSpy = sinon.spy();
    const App = () => {
      const [open, setOpen] = React.useState(true);
      return (
        <Modal open={open} onClose={() => setOpen(false)} onExited={onExitedSpy}>
          <Modal.Header />
        </Modal>
      );
    };

    const { getByRole } = render(<App />);

    act(() => {
      fireEvent.click(getByRole('button', { name: 'Close' }));
    });

    await waitFor(() => {
      expect(onExitedSpy).to.have.been.calledOnce;
    });
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<Modal className="custom" open />);
    assert.isNotNull(instance.querySelector('.custom'));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<Modal style={{ fontSize }} open />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Modal classPrefix="custom-prefix" open />);
    assert.isNotNull(instance.className.match(/\bcustom-prefix\b/));
  });

  it('Should call onOpen callback', () => {
    const onOpenSpy = sinon.spy();
    const ref = React.createRef();
    const App = React.forwardRef((props, ref) => {
      const [open, setOpen] = React.useState(false);
      React.useImperativeHandle(ref, () => ({
        openModal: () => {
          setOpen(true);
        }
      }));

      return (
        <Modal {...props} onOpen={onOpenSpy} open={open}>
          <Modal.Header />
        </Modal>
      );
    });

    render(<App ref={ref} />);

    act(() => {
      ref.current.openModal();
    });

    expect(onOpenSpy).to.have.been.calledOnce;
  });

  it('Should call onClose callback by Esc', () => {
    const onCloseSpy = sinon.spy();
    render(
      <Modal open onClose={onCloseSpy}>
        <Modal.Header />
      </Modal>
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    assert.isTrue(onCloseSpy.calledOnce);
  });

  it('Should be rendered inside Modal', () => {
    const ref = React.createRef();

    const { getByRole } = render(
      <Modal open ref={ref}>
        <Modal.Body>
          <SelectPicker open data={[{ value: 1, label: 1 }]} />
        </Modal.Body>
      </Modal>
    );

    assert.isNotEmpty(getByRole('listbox'));
  });

  describe('Focused state', () => {
    let focusableContainer = null;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      focusableContainer.tabIndex = 0;
      document.body.appendChild(focusableContainer);
      focusableContainer.focus();
    });

    afterEach(() => {
      document.body.removeChild(focusableContainer);
    });

    it('Should focus on the Modal when it is opened', () => {
      const onOpenSpy = sinon.spy();

      const App = React.forwardRef((props, ref) => {
        const [open, setOpen] = React.useState(false);
        const modalRef = React.useRef();
        React.useImperativeHandle(ref, () => ({
          get dialog() {
            return modalRef.current;
          },
          openModal: () => {
            setOpen(true);
          }
        }));

        return (
          <Modal {...props} ref={modalRef} onOpen={onOpenSpy} open={open}>
            <Modal.Header />
          </Modal>
        );
      });

      const ref = React.createRef();

      render(<App ref={ref} />);

      assert.equal(document.activeElement, focusableContainer);

      act(() => {
        ref.current.openModal();
      });

      assert.isTrue(onOpenSpy.calledOnce);
      assert.equal(document.activeElement, ref.current.dialog);
    });

    it('Should be forced to focus on Modal', () => {
      const ref = React.createRef();
      render(
        <Modal ref={ref} open backdrop={false} enforceFocus>
          test
        </Modal>
      );
      focusableContainer.focus();
      focusableContainer.dispatchEvent(new FocusEvent('focus'));

      assert.equal(document.activeElement, ref.current);
    });

    it('Should be focused on container outside of Modal', () => {
      const ref = React.createRef();
      render(
        <Modal ref={ref} open backdrop={false} enforceFocus={false}>
          test
        </Modal>
      );
      focusableContainer.focus();
      focusableContainer.dispatchEvent(new FocusEvent('focus'));

      assert.equal(document.activeElement, focusableContainer);
    });

    it('Should only call onOpen once', () => {
      const onOpenSpy = sinon.spy();
      render(<Modal open onOpen={onOpenSpy}></Modal>);
      assert.equal(onOpenSpy.callCount, 1);
    });
  });

  describe('Size variants', () => {
    const sizes = ['lg', 'md', 'sm', 'xs', 'full'];

    sizes.forEach(size => {
      const expectedClassName = `rs-modal-${size}`;

      it(`Should have .${expectedClassName} class when size=${size}`, () => {
        render(<Modal open size={size}></Modal>);

        expect(screen.getByRole('dialog')).to.have.class(expectedClassName);
      });
    });

    // Remove this case when full prop is dropped
    it('[Deprecated] Should have .rs-modal-full class when full=true', () => {
      sinon.spy(console, 'warn');
      render(<Modal open full></Modal>);

      expect(screen.getByRole('dialog')).to.have.class('rs-modal-full');

      expect(console.warn).to.have.been.calledWith(
        '"full" property of "Modal" has been deprecated.\nUse size="full" instead.'
      );
    });
  });

  describe('a11y', () => {
    it('Should render an ARIA dialog with given title as its accessible name', () => {
      const title = 'Attention';

      render(
        <Modal open>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <p>Message</p>
        </Modal>
      );

      expect(screen.getByRole('dialog', { name: title })).to.be.visible;
    });

    it('Should accept custom ID on dialog', () => {
      const id = 'my-dialog';

      render(
        <Modal open id={id}>
          <p>Message</p>
        </Modal>
      );

      expect(screen.getByRole('dialog')).to.have.attr('id', id);
    });

    it('Should accept `aria-labelledby` and `aria-describedby` on dialog', () => {
      const labelId = 'modal-title';
      const labelText = 'My Title';
      const descriptionId = 'modal-description';

      render(
        <Modal open aria-labelledby={labelId} aria-describedby={descriptionId}>
          <Modal.Header>
            <Modal.Title id={labelId}>{labelText}</Modal.Title>
          </Modal.Header>
          <Modal.Body id={descriptionId}>My Description</Modal.Body>
        </Modal>
      );

      expect(screen.getByRole('dialog', { name: labelText })).to.have.attr(
        'aria-describedby',
        descriptionId
      );
    });

    it('Should allow overriding the dialog role', () => {
      const title = 'Attention';

      render(
        <Modal open role="alertdialog">
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <p>Message</p>
        </Modal>
      );

      expect(screen.getByRole('alertdialog', { name: title })).to.be.visible;
    });
  });
});
