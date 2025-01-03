import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import Drawer from '../Drawer';

describe('Drawer', () => {
  it('Should render a drawer', () => {
    render(
      <Drawer open>
        <p>message</p>
      </Drawer>
    );

    expect(screen.getByRole('dialog')).to.have.text('message');
  });

  it('Should have a `top` className for placement', () => {
    render(
      <Drawer open placement="top">
        <p>message</p>
      </Drawer>
    );

    expect(screen.getByRole('dialog')).to.have.class('rs-drawer-top');
  });

  it('Should have a custom className', () => {
    render(<Drawer className="custom" open />);
    expect(screen.getByRole('dialog')).to.have.class('custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    render(<Drawer style={{ fontSize }} open />);
    expect(screen.getByRole('dialog')).to.have.style('font-size', fontSize);
  });

  it('Should have a custom className prefix', () => {
    render(<Drawer classPrefix="custom-prefix" open />);
    expect(screen.getByRole('dialog')).to.have.class('rs-custom-prefix');
  });

  it('Should render a default close button', () => {
    render(
      <Drawer open>
        <Drawer.Body />
      </Drawer>
    );

    expect(screen.getByRole('dialog')?.querySelector('.rs-drawer-body-close')).to.exist;
  });

  it('Should not render the close button', () => {
    render(
      <Drawer closeButton={false} open>
        <Drawer.Body />
      </Drawer>
    );

    expect(screen.getByRole('dialog')?.querySelector('.rs-drawer-body-close')).to.not.exist;
  });

  it('Should render a custom close button', () => {
    render(
      <Drawer closeButton={<button>custom close button</button>} open>
        <Drawer.Body />
      </Drawer>
    );
    expect(screen.getByText('custom close button')).to.exist;
  });

  it('Should close the drawer when the backdrop is clicked', () => {
    const onClose = sinon.spy();

    render(<Drawer open onClose={onClose} />);

    userEvent.click(screen.getByTestId('drawer-wrapper'));

    expect(onClose).to.have.been.calledOnce;
  });

  it('Should not close the drawer when the "static" drawer is clicked', () => {
    const onClose = sinon.spy();
    render(<Drawer open onClose={onClose} backdrop="static" />);

    userEvent.click(screen.getByTestId('drawer-wrapper'));

    expect(onClose).to.not.have.been.calledOnce;
  });

  it('Should render backdrop', () => {
    render(<Drawer open backdrop />);

    expect(screen.queryByTestId('backdrop')).to.exist;
    expect(screen.getByTestId('drawer-wrapper')).to.not.have.class('rs-drawer-no-backdrop');
  });

  it('Should not render backdrop', () => {
    render(<Drawer open backdrop={false} />);

    expect(screen.queryByTestId('backdrop')).to.not.exist;
    expect(screen.getByTestId('drawer-wrapper')).to.have.class('rs-drawer-no-backdrop');
  });

  it('Should not have max-height in the body', () => {
    render(
      <Drawer open>
        <Drawer.Header />
        <Drawer.Body>Body</Drawer.Body>
      </Drawer>
    );

    expect(screen.getByText('Body').style.maxHeight).to.equal('');
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

    it('Should focus on the Drawer when it is opened', () => {
      const onOpen = sinon.spy();

      const { rerender } = render(
        <Drawer onOpen={onOpen} open={false}>
          <Drawer.Header />
        </Drawer>
      );

      expect(focusableContainer).to.have.focus;

      rerender(
        <Drawer onOpen={onOpen} open={true}>
          <Drawer.Header />
        </Drawer>
      );

      expect(onOpen).to.have.been.calledOnce;
      expect(screen.getByTestId('drawer-wrapper')).to.have.focus;
    });

    it('Should be forced to focus on Drawer', () => {
      render(
        <Drawer open backdrop={false} enforceFocus>
          test
        </Drawer>
      );
      (focusableContainer as HTMLElement).focus();
      (focusableContainer as HTMLElement).dispatchEvent(new FocusEvent('focus'));

      expect(screen.getByTestId('drawer-wrapper')).to.have.focus;
    });

    it('Should be focused on container outside of Drawer', () => {
      render(
        <Drawer open backdrop={false} enforceFocus={false}>
          test
        </Drawer>
      );
      (focusableContainer as HTMLElement).focus();
      (focusableContainer as HTMLElement).dispatchEvent(new FocusEvent('focus'));

      expect(focusableContainer).to.have.focus;
    });

    it('Should be focused on container outside of Drawer when  backdrop is not displayed', () => {
      render(
        <Drawer open backdrop={false}>
          test
        </Drawer>
      );
      (focusableContainer as HTMLElement).focus();
      (focusableContainer as HTMLElement).dispatchEvent(new FocusEvent('focus'));

      expect(focusableContainer).to.have.focus;
    });

    it('Should only call onOpen once', () => {
      const onOpen = sinon.spy();
      render(<Drawer open onOpen={onOpen}></Drawer>);

      expect(onOpen).to.be.calledOnce;
    });
  });

  describe('Size variants', () => {
    const sizes = ['lg', 'md', 'sm', 'xs', 'full'] as const;

    sizes.forEach(size => {
      const expectedClassName = `rs-drawer-${size}`;

      it(`Should have .${expectedClassName} class when size=${size}`, () => {
        render(<Drawer open size={size}></Drawer>);

        expect(screen.getByRole('dialog')).to.have.class(expectedClassName);
      });
    });

    // Remove this case when full prop is dropped
    it('[Deprecated] Should have .rs-drawer-full class when full=true', () => {
      render(<Drawer open full></Drawer>);

      expect(screen.getByRole('dialog')).to.have.class('rs-drawer-full');
    });

    it('Should set a fixed width for the dialog', () => {
      render(<Drawer size={200} open></Drawer>);
      expect(screen.getByRole('dialog')).to.have.style('width', '200px');
    });

    it('Should set a dynamic width for the dialog', () => {
      render(<Drawer size="100%" open></Drawer>);
      expect(screen.getByRole('dialog').style.width).to.equal('100%');
    });

    it('Should set a fixed height for the dialog', () => {
      render(<Drawer size={200} open placement="top"></Drawer>);
      expect(screen.getByRole('dialog')).to.have.style('height', '200px');
    });

    it('Should set a dynamic height for the dialog', () => {
      render(<Drawer size="100%" open placement="bottom"></Drawer>);
      expect(screen.getByRole('dialog').style.height).to.equal('100%');
    });
  });
});
