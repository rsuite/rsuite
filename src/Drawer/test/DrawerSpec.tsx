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
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole('dialog')?.querySelector('.rs-drawer-body-close')).to.exist;
  });

  it('Should not render the close button', () => {
    render(
      <Drawer closeButton={false} open>
        <Drawer.Body />
      </Drawer>
    );
    // eslint-disable-next-line testing-library/no-node-access
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
    const onCloseSpy = sinon.spy();

    render(<Drawer data-testid="wrapper" open onClose={onCloseSpy} />);

    userEvent.click(screen.getByTestId('wrapper'));

    expect(onCloseSpy).to.have.been.calledOnce;
  });

  it('Should not close the drawer when the "static" drawer is clicked', () => {
    const onCloseSpy = sinon.spy();
    render(<Drawer data-testid="wrapper" open onClose={onCloseSpy} backdrop="static" />);

    userEvent.click(screen.getByTestId('wrapper'));

    expect(onCloseSpy).to.not.have.been.calledOnce;
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
      sinon.spy(console, 'warn');
      render(<Drawer open full></Drawer>);

      expect(screen.getByRole('dialog')).to.have.class('rs-drawer-full');

      expect(console.warn).to.have.been.calledWith(
        '"full" property of "Modal" has been deprecated.\nUse size="full" instead.'
      );
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
