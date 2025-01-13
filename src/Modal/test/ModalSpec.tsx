import React from 'react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Modal from '../Modal';
import SelectPicker from '../../SelectPicker';

describe('Modal', () => {
  testStandardProps(<Modal open></Modal>, {
    getRootElement: () => screen.getByRole('dialog')
  });

  it('Should render the modal content', () => {
    render(
      <Modal open>
        <p data-testid="content">message</p>
      </Modal>
    );

    expect(screen.getByTestId('content')).to.exist;
  });

  it('Should close the modal when the modal dialog is clicked', () => {
    const onClose = sinon.spy();
    render(<Modal open onClose={onClose} />);

    userEvent.click(screen.getByTestId('modal-wrapper'));

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should not close the modal when the "static" dialog is clicked', () => {
    const onClose = sinon.spy();
    render(<Modal open onClose={onClose} backdrop="static" />);

    userEvent.click(screen.getByTestId('modal-wrapper'));

    expect(onClose).to.not.have.been.calledOnce;
  });

  it('Should not close the modal when clicking inside the dialog', () => {
    const onClose = sinon.spy();
    render(<Modal open onClose={onClose} />);

    fireEvent.click(screen.getByRole('dialog'));
    fireEvent.click(screen.getByRole('document'));

    expect(onClose).to.be.not.called;
  });

  it('Should be automatic height', () => {
    render(
      <Modal overflow open>
        <Modal.Body style={{ height: 2000 }}>body</Modal.Body>
      </Modal>
    );

    expect(screen.getByText('body')).to.have.style('overflow', 'auto');
  });

  it('Should call onClose callback', () => {
    const onClose = sinon.spy();
    render(
      <Modal open onClose={onClose}>
        <Modal.Header />
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).to.have.been.calledOnce;
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

    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(onExitedSpy).to.have.been.calledOnce;
    });
  });

  it('Should call onOpen callback', () => {
    const onOpenSpy = sinon.spy();
    type AppInstance = {
      openModal: () => void;
    };
    const ref = React.createRef<AppInstance>();
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
      (ref.current as AppInstance).openModal();
    });

    expect(onOpenSpy).to.have.been.calledOnce;
  });

  it('Should call onClose callback by Esc', () => {
    const onClose = sinon.spy();
    render(
      <Modal open onClose={onClose}>
        <Modal.Header />
      </Modal>
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(onClose).to.have.been.calledOnce;
  });

  it('Should be rendered inside Modal', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <Modal open ref={ref}>
        <Modal.Body>
          <SelectPicker open data={[{ value: 1, label: 1 }]} />
        </Modal.Body>
      </Modal>
    );

    expect(screen.getByRole('listbox')).to.be.exist;
  });

  describe('Focused state', () => {
    let focusableContainer: HTMLElement | null = null;

    beforeEach(() => {
      focusableContainer = document.createElement('div');
      focusableContainer.tabIndex = 0;
      document.body.appendChild(focusableContainer);
      focusableContainer.focus();
    });

    afterEach(() => {
      document.body.removeChild(focusableContainer as HTMLElement);
    });

    it('Should focus on the Modal when it is opened', () => {
      const onOpen = sinon.spy();

      const { rerender } = render(
        <Modal onOpen={onOpen} open={false}>
          <Modal.Header />
        </Modal>
      );

      expect(focusableContainer).to.have.focus;

      rerender(
        <Modal onOpen={onOpen} open={true}>
          <Modal.Header />
        </Modal>
      );

      expect(onOpen).to.have.been.calledOnce;
      expect(screen.getByTestId('modal-wrapper')).to.have.focus;
    });

    it('Should be forced to focus on Modal', () => {
      render(
        <Modal open backdrop={false} enforceFocus>
          test
        </Modal>
      );
      (focusableContainer as HTMLElement).focus();
      (focusableContainer as HTMLElement).dispatchEvent(new FocusEvent('focus'));

      expect(screen.getByTestId('modal-wrapper')).to.have.focus;
    });

    it('Should be focused on container outside of Modal', () => {
      render(
        <Modal open backdrop={false} enforceFocus={false}>
          test
        </Modal>
      );
      (focusableContainer as HTMLElement).focus();
      (focusableContainer as HTMLElement).dispatchEvent(new FocusEvent('focus'));

      expect(focusableContainer).to.have.focus;
    });

    it('Should only call onOpen once', () => {
      const onOpen = sinon.spy();

      render(<Modal open onOpen={onOpen}></Modal>);

      expect(onOpen).to.be.calledOnce;
    });
  });

  describe('Size variants', () => {
    const sizes = ['lg', 'md', 'sm', 'xs', 'full'] as const;

    sizes.forEach(size => {
      const expectedClassName = `rs-modal-${size}`;

      it(`Should have .${expectedClassName} class when size=${size}`, () => {
        render(<Modal open size={size}></Modal>);

        expect(screen.getByRole('dialog')).to.have.class(expectedClassName);
      });
    });

    // Remove this case when full prop is dropped
    it('[Deprecated] Should have .rs-modal-full class when full=true', () => {
      render(<Modal open full></Modal>);

      expect(screen.getByRole('dialog')).to.have.class('rs-modal-full');
    });

    it('Should not have a style attribute on body when size="full" ', () => {
      render(
        <Modal size="full" open>
          <Modal.Body />
        </Modal>
      );

      expect(screen.getByRole('dialog').querySelector('.rs-modal-body')).to.not.have.attribute(
        'style'
      );
    });

    it('Should set a fixed width for the dialog', () => {
      render(
        <Modal size={200} open>
          <Modal.Body />
        </Modal>
      );
      expect(screen.getByRole('dialog')).to.have.style('width', '200px');
    });

    it('Should set a dynamic width for the dialog', () => {
      render(
        <Modal size="100%" open>
          <Modal.Body />
        </Modal>
      );
      expect(screen.getByRole('dialog').style.width).to.equal('100%');
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
